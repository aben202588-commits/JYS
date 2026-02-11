'use client';

import { ArrowUpRight, TrendingUp } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

// Mock data for sparklines
const generateSparkData = (points: number, trend: 'up' | 'down') => {
  const data = [];
  let val = 50;
  for (let i = 0; i < points; i++) {
    val += (Math.random() - 0.5) * 10;
    if (trend === 'up') val += 2;
    if (trend === 'down') val -= 2;
    data.push({ v: Math.max(10, val) });
  }
  return data;
};

export default function StrategySection() {
  // Client-side hydration check to prevent mismatch
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => setMounted(true), []);

  const STRATEGIES = [
    {
      id: 1,
      name: t.strategy.items.spot,
      roi: '+128.5%',
      desc: t.strategy.items.spot_desc,
      trend: 'up' as const,
      data: generateSparkData(20, 'up'),
      color: '#00E5FF'
    },
    {
      id: 2,
      name: t.strategy.items.futures,
      roi: '+342.1%',
      desc: t.strategy.items.futures_desc,
      trend: 'up' as const,
      data: generateSparkData(20, 'up'),
      color: '#A855F7'
    },
    {
      id: 3,
      name: t.strategy.items.rebalance,
      roi: '-2.4%',
      desc: t.strategy.items.rebalance_desc,
      trend: 'down' as const,
      data: generateSparkData(20, 'down'),
      color: '#EF4444'
    }
  ];

  if (!mounted) return null;

  return (
    <section className="container mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            {t.strategy.title}
          </h2>
          <p className="text-gray-400 max-w-xl text-lg text-sm md:text-lg">
            {t.strategy.subtitle}
          </p>
        </div>
        <button className="flex items-center gap-2 text-brand-cyan font-bold hover:text-white transition-colors">
          {t.strategy.view_all} <ArrowUpRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {STRATEGIES.map((strategy) => (
          <div key={strategy.id} className="group relative p-1 rounded-3xl bg-gradient-to-b from-white/10 to-transparent hover:from-brand-cyan/20 transition-all duration-300">
            <div className="bg-[#0A0A0A] rounded-[22px] p-6 h-full border border-white/5 relative overflow-hidden group-hover:translate-y-[-2px] transition-transform">
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-xl font-bold mb-1">{strategy.name}</div>
                  <div className="text-sm text-gray-500">{strategy.desc}</div>
                </div>
                <div className={`p-2 rounded-full ${strategy.trend === 'up' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>

              <div className="flex justify-between items-end mb-6">
                <div>
                  <div className="text-sm text-gray-500 mb-1">{t.strategy.roi}</div>
                  <div className={`text-3xl font-black ${strategy.trend === 'up' ? 'text-success' : 'text-danger'}`}>
                    {strategy.roi}
                  </div>
                </div>
                <div className="h-[60px] w-[120px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={strategy.data}>
                      <Line 
                        type="monotone" 
                        dataKey="v" 
                        stroke={strategy.color} 
                        strokeWidth={3} 
                        dot={false} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-brand-cyan hover:text-black font-bold transition-all border border-white/10">
                {t.strategy.copy}
              </button>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
