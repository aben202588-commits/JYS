'use client';

import { Users, Globe2, BarChart3 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function PlatformStats() {
  const { t } = useLanguage();

  return (
    <section className="container mx-auto px-6 py-20 border-b border-white/5">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="max-w-lg">
          <h2 className="text-4xl font-bold mb-6">
            {t.stats.title_line1} <br />
            <span className="text-brand-cyan">{t.stats.title_line2}</span>
          </h2>
          <p className="text-gray-400 leading-relaxed">
            {t.stats.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
              <Users className="w-6 h-6 text-brand-purple" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">9M+</div>
            <div className="text-xs text-gray-500 uppercase">{t.stats.clients}</div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
              <Globe2 className="w-6 h-6 text-brand-cyan" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">190+</div>
            <div className="text-xs text-gray-500 uppercase">{t.stats.countries}</div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">$207B+</div>
            <div className="text-xs text-gray-500 uppercase">{t.stats.volume}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
