'use client';

import { ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

// Mock data generator for different timeframes
const generateData = (points: number, trend: 'up' | 'down' | 'flat') => {
  const data = [];
  let current = 43000;
  for (let i = 0; i < points; i++) {
    const change = (Math.random() - 0.5) * 500;
    current += change;
    if (trend === 'down') current -= 50; // Bias down
    data.push({
      name: i.toString(),
      price: Math.max(0, current),
    });
  }
  return data;
};

const TIMEFRAMES = {
  '1H': generateData(60, 'flat'),
  '1D': generateData(24, 'down'),
  '1W': generateData(7, 'up'),
  '1M': generateData(30, 'down'),
  '1Y': generateData(12, 'up'),
};

export default function TrendAnalysis() {
  const [activeTab, setActiveTab] = useState<'1H' | '1D' | '1W' | '1M' | '1Y'>('1D');
  const [chartData, setChartData] = useState(TIMEFRAMES['1D']);
  const [hoveredPrice, setHoveredPrice] = useState<number | null>(null);
  const { t } = useLanguage();
  
  // Mock price for UI kit version
  const livePrice = 43250.50;

  useEffect(() => {
    setChartData(TIMEFRAMES[activeTab]);
  }, [activeTab]);

  return (
    <section className="container mx-auto px-6 py-12">
      <div className="bg-[#111] rounded-3xl border border-white/5 p-8 backdrop-blur-sm relative overflow-hidden">
         {/* Background Glow */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-cyan/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6 relative z-10">
          <div>
            <h2 className="text-xl font-bold mb-4">{t.trend.title}</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-xs font-bold text-white">₿</div>
                <span className="font-bold">BTC/USDT</span>
                <span className="text-xs text-gray-500">{t.trend.bitcoin}</span>
              </div>
              <div className="text-3xl font-bold tabular-nums">
                ${(hoveredPrice ?? (livePrice || chartData[chartData.length - 1].price)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="flex items-center text-danger text-sm font-medium bg-danger/10 px-2 py-0.5 rounded">
                <ArrowDownRight className="w-4 h-4 mr-1" />
                -2.35%
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 bg-black/20 p-1 rounded-lg border border-white/5 overflow-x-auto max-w-full">
            {(Object.keys(TIMEFRAMES) as Array<keyof typeof TIMEFRAMES>).map((time) => (
              <button 
                key={time}
                onClick={() => setActiveTab(time)}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === time 
                    ? 'bg-brand-cyan text-black shadow-lg shadow-brand-cyan/20' 
                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Chart Area */}
        <div className="h-[350px] w-full -ml-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart 
              data={chartData}
              onMouseMove={(e: any) => {
                if (e.activePayload) {
                  setHoveredPrice(e.activePayload[0].payload.price);
                }
              }}
              onMouseLeave={() => setHoveredPrice(null)}
            >
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#00E5FF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
              <XAxis dataKey="name" hide />
              <YAxis 
                domain={['auto', 'auto']} 
                orientation="right" 
                tick={{ fill: '#52525B', fontSize: 12 }} 
                axisLine={false}
                tickLine={false}
                tickFormatter={(val) => `$${val.toLocaleString()}`}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#000', borderColor: '#333', borderRadius: '8px' }}
                itemStyle={{ color: '#00E5FF' }}
                formatter={(value: any) => [`$${Number(value).toFixed(2)}`, t.trend.price]}
                labelStyle={{ display: 'none' }}
                cursor={{ stroke: '#00E5FF', strokeWidth: 1, strokeDasharray: '4 4' }}
              />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke="#00E5FF" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorPrice)" 
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
