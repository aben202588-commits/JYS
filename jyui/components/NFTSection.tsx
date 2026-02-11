'use client';

import { ArrowRight, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function NFTSection() {
  const [hovered, setHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const { t } = useLanguage();

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setRotation(prev => ({
          x: Math.sin(Date.now() / 1000) * 5,
          y: Math.cos(Date.now() / 1000) * 5
        }));
      }, 50);
      return () => clearInterval(interval);
    } else {
      setRotation({ x: 0, y: 0 });
    }
  }, [hovered]);

  return (
    <section className="container mx-auto px-6 py-20">
      <div 
        className="relative rounded-3xl overflow-hidden min-h-[450px] flex items-center bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-white/10 group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-30 mix-blend-overlay" />
          <div className="absolute right-0 top-0 w-2/3 h-full bg-gradient-to-l from-brand-cyan/10 to-transparent" />
          <div className="absolute -bottom-1/2 -right-1/4 w-[600px] h-[600px] bg-brand-purple/20 blur-[120px] rounded-full" />
        </div>
        
        <div className="relative z-10 p-6 md:p-12 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-brand-cyan/10 text-brand-cyan text-xs font-bold border border-brand-cyan/20 backdrop-blur-sm">
            <Sparkles className="w-3 h-3" />
            {t.nft.new}
          </div>
          
          <h2 className="text-3xl md:text-6xl font-black mb-8 leading-tight">
            {t.nft.title_line1} <br />
            {t.nft.title_line2} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple animate-pulse">{t.nft.title_line3}</span>
          </h2>
          
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-brand-cyan text-black font-bold rounded-full hover:bg-white transition-all transform hover:scale-105 flex items-center gap-2 shadow-[0_0_20px_rgba(0,255,204,0.3)]">
              {t.nft.explore}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-8 py-4 border border-white/20 hover:bg-white/10 rounded-full font-bold transition-all hover:border-white/40 backdrop-blur-sm">
              {t.nft.create}
            </button>
          </div>
        </div>

        {/* 3D Character Placeholders with simulated parallax/rotation */}
        <div className="hidden md:flex absolute right-10 bottom-0 gap-6 transform translate-y-10 perspective-1000">
          {/* Card 1 */}
          <div 
            className="w-48 h-64 bg-gradient-to-b from-gray-800 to-black rounded-t-2xl border-t border-l border-r border-white/20 transform transition-transform duration-500 shadow-2xl relative overflow-hidden"
            style={{ 
              transform: `rotate(${ -6 + rotation.x }deg) translateY(${rotation.y}px)`,
              zIndex: 1 
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-cyan/20 to-transparent opacity-50" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="h-2 w-1/2 bg-white/20 rounded mb-2" />
              <div className="h-2 w-3/4 bg-white/10 rounded" />
            </div>
          </div>

          {/* Card 2 (Center) */}
          <div 
            className="w-52 h-72 bg-gradient-to-b from-gray-700 to-black rounded-t-2xl border-t border-l border-r border-white/20 z-10 transform transition-transform duration-500 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
            style={{ 
              transform: `translateY(${ -16 + rotation.y * -1 }px) scale(1.05)`,
              zIndex: 10
            }}
          >
             <div className="absolute inset-0 bg-gradient-to-tr from-brand-purple/30 to-transparent opacity-60" />
             <div className="absolute top-4 right-4 px-2 py-1 bg-black/50 rounded text-xs font-mono text-brand-cyan border border-brand-cyan/30">
               12.5 ETH
             </div>
             <div className="absolute bottom-6 left-6 right-6">
              <div className="h-4 w-2/3 bg-white/20 rounded mb-3" />
              <div className="flex justify-between items-end">
                <div className="h-3 w-1/3 bg-white/10 rounded" />
                <div className="h-8 w-8 rounded-full bg-brand-cyan/20" />
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div 
            className="w-48 h-64 bg-gradient-to-b from-gray-800 to-black rounded-t-2xl border-t border-l border-r border-white/20 transform transition-transform duration-500 shadow-2xl relative overflow-hidden"
            style={{ 
              transform: `rotate(${ 6 + rotation.x }deg) translateY(${rotation.y}px)`,
              zIndex: 1
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent opacity-50" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="h-2 w-1/2 bg-white/20 rounded mb-2" />
              <div className="h-2 w-3/4 bg-white/10 rounded" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
