import { create } from 'zustand';
import { createClient } from '@supabase/supabase-js';

// Define the shape of market data
export interface MarketData {
  id: string; // format: module:symbol
  module_type: string;
  symbol: string;
  display_name: string;
  last_price: number;
  change_24h: number;
  updated_at: string;
  flash?: 'up' | 'down' | null;
}

interface MarketStore {
  markets: Record<string, MarketData>;
  isSubscribed: boolean;
  setMarketData: (data: MarketData) => void;
  initializeRealtime: () => void;
  unsubscribeRealtime: () => void;
}

// Initialize Supabase client safely
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;

export const useMarketStore = create<MarketStore>((set, get) => ({
  markets: {},
  isSubscribed: false,
  setMarketData: (newData) => {
    set((state) => {
      const oldData = state.markets[newData.id];
      let flash: 'up' | 'down' | null = null;
      
      if (oldData) {
        if (newData.last_price > oldData.last_price) flash = 'up';
        else if (newData.last_price < oldData.last_price) flash = 'down';
      }

      return {
        markets: { 
          ...state.markets, 
          [newData.id]: { ...newData, flash } 
        }
      };
    });

    // Auto-clear flash after 500ms
    setTimeout(() => {
      set((state) => {
        if (!state.markets[newData.id]) return state;
        return {
          markets: {
            ...state.markets,
            [newData.id]: { ...state.markets[newData.id], flash: null }
          }
        };
      });
    }, 500);
  },

  initializeRealtime: async () => {
    if (get().isSubscribed) return;

    console.log('Initializing Market Realtime Subscription...');

    // Fetch initial snapshot from database to ensure immediate data availability
    try {
      const { data, error } = await supabase.from('market_cache').select('*');
      if (data && !error) {
        console.log(`Loaded ${data.length} market records from cache`);
        // Batch update to avoid too many renders? 
        // setMarketData triggers set() individually. 
        // For < 20 items it's fine.
        data.forEach(item => {
           get().setMarketData(item as MarketData);
        });
      }
    } catch (e) {
      console.error('Failed to fetch initial market data:', e);
    }

    supabase
      .channel('market_updates')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to INSERT and UPDATE
          schema: 'public',
          table: 'market_cache',
        },
        (payload) => {
          console.log('Realtime update received:', payload);
          if (payload.new) {
            get().setMarketData(payload.new as MarketData);
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('Market Realtime Connected');
          set({ isSubscribed: true });
        }
      });
  },
  unsubscribeRealtime: () => {
    if (supabase) {
      supabase.removeAllChannels();
    }
    set({ isSubscribed: false });
  }
}));
