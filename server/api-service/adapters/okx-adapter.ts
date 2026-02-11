import WebSocket from 'ws';
import { createClient } from '@supabase/supabase-js';
import { HttpsProxyAgent } from 'https-proxy-agent';

// Configuration
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Check key role for debugging
try {
  const payload = JSON.parse(Buffer.from(SUPABASE_KEY.split('.')[1], 'base64').toString());
  console.log('Supabase Key Role:', payload.role);
  if (payload.role === 'anon') {
    console.warn('WARNING: You are using an ANON key as the Service Role Key. This may cause permission issues unless RLS is very permissive.');
  }
} catch (e) {
  console.warn('Could not decode Supabase Key to check role');
}

const OKX_WS_URL = 'wss://ws.okx.com:8443/ws/v5/public'; // Changed to standard URL

const SYMBOLS = [
  'BTC-USDT', 'ETH-USDT', 'LTC-USDT', 'DOT-USDT', 'FIL-USDT', 'VET-USDT', // SPOT
  'BTC-USDT-SWAP', 'ETH-USDT-SWAP', 'SOL-USDT-SWAP',          // SWAP (Perpetual)
  'BTC-261231-65000-C', 'BTC-261231-60000-P', 'ETH-261231-3000-C' // OPTION
];

class OkxAdapter {
  private ws: WebSocket | null = null;
  private pingInterval: NodeJS.Timeout | null = null;

  constructor() {}

  public start() {
    this.connect();
  }

  private connect() {
    console.log('Connecting to OKX WebSocket...');
    
    const options: WebSocket.ClientOptions = {};
    const proxyUrl = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;
    
    if (proxyUrl) {
      console.log(`Using proxy: ${proxyUrl}`);
      options.agent = new HttpsProxyAgent(proxyUrl);
    }

    this.ws = new WebSocket(OKX_WS_URL, options);

    this.ws.on('open', () => {
      console.log('Connected to OKX WebSocket');
      this.subscribe();
      this.startPing();
    });

    this.ws.on('message', (data: WebSocket.Data) => {
      try {
        const message = JSON.parse(data.toString());
        this.handleMessage(message);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    });

    this.ws.on('close', () => {
      console.log('Disconnected from OKX WebSocket');
      this.stopPing();
      // Reconnect or switch to Mock mode after 5 seconds
      setTimeout(() => {
        console.log('Attempting to reconnect...');
        this.connect();
      }, 5000);
    });

    this.ws.on('error', (error) => {
      console.error('WebSocket error:', error.message);
      // Fallback to Mock Data if connection fails (likely blocked)
      if (error.message.includes('ECONNREFUSED') || error.message.includes('127.0.0.1')) {
        console.log('Network blocked. Switching to MOCK DATA MODE for testing purposes.');
        this.startMockGenerator();
      }
    });
  }

  private mockInterval: NodeJS.Timeout | null = null;

  private startMockGenerator() {
    if (this.mockInterval) return;
    
    console.log('Starting Mock Data Generator...');
    this.mockInterval = setInterval(async () => {
      const mockData = SYMBOLS.map(symbol => {
        let basePrice = 100;
        if (symbol.includes('BTC')) basePrice = 60000;
        else if (symbol.includes('ETH')) basePrice = 3000;
        else if (symbol.includes('SOL')) basePrice = 150;
        else if (symbol.includes('LTC')) basePrice = 85;
        else if (symbol.includes('DOT')) basePrice = 7;
        else if (symbol.includes('FIL')) basePrice = 5;
        else if (symbol.includes('VET')) basePrice = 0.03;

        // Override for Options
        if (symbol.includes('-C-') || symbol.includes('-P-')) {
          basePrice = 1000;
          if (symbol.includes('ETH')) basePrice = 150;
        }
        
        const randomChange = (Math.random() - 0.5) * (basePrice * 0.005);
        const price = basePrice + randomChange;
        
        return {
          instId: symbol,
          last: price.toFixed(2),
          open24h: basePrice.toString()
        };
      });

      for (const data of mockData) {
        // Simulate message structure
        await this.handleMessage({
          arg: { channel: 'tickers' },
          data: [data]
        });
      }
    }, 2000); // Update every 2 seconds
  }


  private subscribe() {
    const args = SYMBOLS.map(symbol => ({
      channel: 'tickers',
      instId: symbol
    }));

    const msg = {
      op: 'subscribe',
      args: args
    };

    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(msg));
      console.log('Subscribed to tickers:', SYMBOLS);
    }
  }

  private startPing() {
    // OKX recommends ping every 20-30s. "ping" string.
    this.pingInterval = setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send('ping');
      }
    }, 25000);
  }

  private stopPing() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }

  private async handleMessage(message: any) {
    // Handle pong
    if (message === 'pong') return;

    // Handle ticker updates
    if (message.arg && message.arg.channel === 'tickers' && message.data && message.data.length > 0) {
      const data = message.data[0];
      const instId = data.instId; // e.g., BTC-USDT or BTC-USDT-SWAP
      const lastPrice = parseFloat(data.last);
      const open24h = parseFloat(data.open24h);
      
      let change24h = 0;
      if (open24h > 0) {
        change24h = ((lastPrice - open24h) / open24h) * 100;
      }

      // Determine module type and formatted ID
      let moduleType = 'spot';
      let formattedId = `spot:${instId}`; // Default for spot
      let displayName = instId.replace('-', '/');

      if (instId.endsWith('-SWAP')) {
        moduleType = 'swap';
        // Convert BTC-USDT-SWAP -> swap:BTC-USDT.P
        const baseSymbol = instId.replace('-SWAP', '.P'); // BTC-USDT.P
        formattedId = `swap:${baseSymbol}`;
        displayName = baseSymbol.replace('-', '/'); // BTC/USDT.P
      } else if (instId.includes('-C-') || instId.includes('-P-')) {
        moduleType = 'option';
        formattedId = `option:${instId}`;
      }

      const record = {
        id: formattedId,
        module_type: moduleType,
        symbol: displayName, // e.g., BTC/USDT or BTC/USDT.P
        display_name: displayName,
        last_price: lastPrice,
        change_24h: change24h,
        updated_at: new Date().toISOString()
      };

      try {
        const { error } = await supabase
          .from('market_cache')
          .upsert(record);

        if (error) {
          console.error('Supabase upsert error:', error);
        } else {
          console.log(`Updated ${moduleType.toUpperCase()} ${instId} -> ${formattedId}: ${lastPrice}`);
        }
      } catch (err) {
        console.error('Error updating Supabase:', err);
      }
    }
  }
}

// Start the adapter if run directly
// Check if the current file is the entry point
const isMainModule = import.meta.url === `file://${process.argv[1].replace(/\\/g, '/')}`;

if (process.argv[1].includes('okx-adapter.ts')) {
  const adapter = new OkxAdapter();
  adapter.start();
}

export default OkxAdapter;
