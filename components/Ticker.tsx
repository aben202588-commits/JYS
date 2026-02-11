'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';

const MOCK_DATA = [
  { symbol: 'BTC/USDT', price: 68500.25, change: 2.5 },
  { symbol: 'ETH/USDT', price: 3850.10, change: -1.2 },
  { symbol: 'SOL/USDT', price: 145.80, change: 5.4 },
  { symbol: 'BNB/USDT', price: 580.50, change: 0.8 },
  { symbol: 'XRP/USDT', price: 0.62, change: -0.5 },
  { symbol: 'ADA/USDT', price: 0.45, change: 1.2 },
  { symbol: 'DOGE/USDT', price: 0.16, change: 8.5 },
  { symbol: 'DOT/USDT', price: 7.20, change: -2.1 },
  { symbol: 'AVAX/USDT', price: 35.40, change: 4.2 },
  { symbol: 'LINK/USDT', price: 14.20, change: 1.5 },
  { symbol: 'SHIB/USDT', price: 0.000025, change: 3.1 },
  { symbol: 'LTC/USDT', price: 85.20, change: -0.8 },
];

export default function Ticker() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-10 bg-[#0A0A0A] border-b border-white/5 flex items-center overflow-hidden">
      <div className="flex animate-ticker whitespace-nowrap">
        {/* Duplicate data 3 times to ensure seamless scrolling */}
        {[...MOCK_DATA, ...MOCK_DATA, ...MOCK_DATA].map((item, i) => (
          <div key={i} className="flex items-center gap-2 mx-6 text-xs font-mono font-medium cursor-pointer hover:bg-white/5 px-2 py-1 rounded transition-colors">
            <span className="text-gray-400">{item.symbol}</span>
            <span className={item.change >= 0 ? 'text-[#00C087]' : 'text-[#FF3B30]'}>
              {item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
            <span className={`flex items-center ${item.change >= 0 ? 'text-[#00C087]' : 'text-[#FF3B30]'}`}>
              {item.change >= 0 ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
              {Math.abs(item.change)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
