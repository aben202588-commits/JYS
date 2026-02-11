'use client';

import { ArrowRight, Wallet, PieChart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const INITIAL_ITEMS = [
  { id: 1, name: 'Coinbase', symbol: 'BTC', amount: 0.4568, value: 19870, change: 2.4, logo: 'bg-blue-600' },
  { id: 2, name: 'Binance', symbol: 'BNB', amount: 125.50, value: 38900, change: 5.6, logo: 'bg-yellow-500' },
  { id: 3, name: 'Bitfinex', symbol: 'USDT', amount: 15000, value: 15002, change: 0.01, logo: 'bg-green-600' },
  { id: 4, name: 'Kraken', symbol: 'ETH', amount: 12.50, value: 28450, change: -1.2, logo: 'bg-purple-600' },
  { id: 5, name: 'Coinbase', symbol: 'SOL', amount: 450.00, value: 44100, change: 8.4, logo: 'bg-blue-600' },
  { id: 6, name: 'Mastercard', symbol: 'USD', amount: 2500, value: 2500, change: 0.0, logo: 'bg-red-500' },
];

export default function PortfolioSection() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [flashStates, setFlashStates] = useState<Record<number, 'up' | 'down' | null>>({});
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prevItems => {
        const newFlashStates: Record<number, 'up' | 'down' | null> = {};
        const newItems = prevItems.map(item => {
          // 30% chance to update
          if (Math.random() > 0.3) return item;

          const changePercent = (Math.random() - 0.5) * 0.5;
          const newValue = Math.max(0, item.value * (1 + changePercent / 100));
          const newChange = item.change + changePercent;
          
          newFlashStates[item.id] = newValue > item.value ? 'up' : 'down';
          
          return {
            ...item,
            value: newValue,
            change: newChange
          };
        });

        setFlashStates(newFlashStates);
        // Clear flash states after animation
        setTimeout(() => setFlashStates({}), 1000);

        return newItems;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  const formatNumber = (val: number) => {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 4 }).format(val);
  };

  return (
    <section className="container mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-3">
          <PieChart className="w-8 h-8 text-brand-cyan" />
          {t.portfolio.title}
        </h2>
        <p className="text-gray-500 text-sm">{t.portfolio.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div 
            key={item.id} 
            className={`
              flex items-center justify-between p-6 bg-[#111] rounded-2xl border border-white/5 
              hover:border-brand-cyan/20 transition-all duration-300 group
              ${flashStates[item.id] === 'up' ? 'bg-green-500/10 border-green-500/30' : ''}
              ${flashStates[item.id] === 'down' ? 'bg-red-500/10 border-red-500/30' : ''}
            `}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full ${item.logo} flex items-center justify-center text-white font-bold shadow-lg`}>
                {item.name[0]}
              </div>
              <div>
                <div className="font-bold flex items-center gap-2">
                  {item.name}
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-gray-300 font-mono border border-white/5">{item.symbol}</span>
                </div>
                <div className="text-sm text-gray-500 font-mono">{formatNumber(item.amount)} {item.symbol}</div>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`font-bold font-mono transition-colors duration-300 ${flashStates[item.id] === 'up' ? 'text-green-400' : flashStates[item.id] === 'down' ? 'text-red-400' : 'text-white'}`}>
                {formatCurrency(item.value)}
              </div>
              <div className={`text-xs font-mono flex items-center justify-end gap-1 ${item.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors border-b border-transparent hover:border-brand-cyan pb-1">
          <Wallet className="w-4 h-4" />
          {t.portfolio.view_all} <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
