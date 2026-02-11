'use client';

import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function BannerCards() {
  const { t } = useLanguage();

  const BANNERS = [
    {
      title: t.banners.bonus_title,
      subtitle: t.banners.bonus_sub,
      amount: "25,000 USDT",
      color: "from-blue-500/20 to-cyan-500/20",
      border: "group-hover:border-cyan-500/50",
      text: "text-brand-cyan"
    },
    {
      title: t.banners.listing_title,
      subtitle: t.banners.listing_sub,
      amount: "50,000 USDT",
      color: "from-green-500/20 to-emerald-500/20",
      border: "group-hover:border-green-500/50",
      text: "text-green-400"
    },
    {
      title: t.banners.futures_title,
      subtitle: t.banners.futures_sub,
      amount: "10,000 USDT",
      color: "from-purple-500/20 to-pink-500/20",
      border: "group-hover:border-purple-500/50",
      text: "text-purple-400"
    }
  ];

  return (
    <section className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {BANNERS.map((banner, index) => (
          <div 
            key={index}
            className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br ${banner.color} p-6 transition-all duration-300 ${banner.border}`}
          >
            {/* Hover Glow */}
            <div className="absolute -right-12 -top-12 w-32 h-32 bg-white/10 blur-[50px] rounded-full group-hover:bg-white/20 transition-all" />
            
            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-300 mb-1">{banner.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{banner.subtitle}</p>
                </div>
                <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              
              <div className={`text-2xl font-bold ${banner.text} mt-4`}>
                {banner.amount}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
