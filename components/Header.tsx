'use client';

import { useState, useEffect } from 'react';
import { Menu, Search, Globe, User, Bell, Headphones, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { t, language, setLanguage, images } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = (lang: 'en' | 'zh') => {
    setLanguage(lang);
    setLangMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Left Section: Logo + Mode Switcher */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              {images?.logo ? (
                <img 
                  src={images.logo} 
                  alt="Logo" 
                  className="h-8 md:h-10 w-auto object-contain transform group-hover:rotate-12 transition-transform" 
                />
              ) : (
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-tr from-brand-cyan to-brand-purple rounded-lg flex items-center justify-center font-black text-black text-lg md:text-xl transform group-hover:rotate-12 transition-transform">
                  S
                </div>
              )}
              <span className="text-xl md:text-2xl font-black tracking-tighter text-white">
                SRX
              </span>
            </Link>

            {/* Mode Switcher */}
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center bg-[#111] border border-white/10 rounded-lg p-1">
                <button className="px-6 py-1.5 text-sm font-bold text-white bg-white/10 rounded-md shadow-sm transition-all">
                  {t.header.mode_trade}
                </button>
                <button className="px-6 py-1.5 text-sm font-medium text-gray-500 hover:text-white transition-colors">
                  {t.header.mode_nft}
                </button>
              </div>
              <div className="w-px h-5 bg-white/20" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { key: 'exchange', label: t.header.exchange, href: '/' },
              { key: 'markets', label: t.header.markets, href: '/markets' },
              { key: 'trade', label: t.header.trade, href: '/trade/BTC-USDT' },
              { key: 'derivatives', label: t.header.derivatives, href: '#' },
              { key: 'earn', label: t.header.earn, href: '/earn' },
              { key: 'finance', label: t.header.finance, href: '#' },
            ].map((item) => (
              <Link 
                key={item.key} 
                href={item.href} 
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group py-2"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-cyan transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 border-r border-white/10 pr-4 relative">
              <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <Search className="w-5 h-5 text-gray-400" />
              </button>
              
              <div className="relative">
                <button 
                  className="p-2 hover:bg-white/5 rounded-full transition-colors flex items-center gap-1"
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                >
                  <Globe className="w-5 h-5 text-gray-400" />
                  <span className="text-xs text-gray-400 font-medium uppercase">{language}</span>
                </button>

                {/* Language Dropdown */}
                {langMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-32 bg-[#111] border border-white/10 rounded-lg shadow-xl py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <button 
                      onClick={() => toggleLanguage('zh')}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-white/5 transition-colors ${language === 'zh' ? 'text-brand-cyan font-bold' : 'text-gray-400'}`}
                    >
                      中文 (ZH)
                    </button>
                    <button 
                      onClick={() => toggleLanguage('en')}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-white/5 transition-colors ${language === 'en' ? 'text-brand-cyan font-bold' : 'text-gray-400'}`}
                    >
                      English (EN)
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-sm font-bold hover:text-brand-cyan transition-colors">{t.header.login}</button>
              <button className="px-4 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-brand-cyan transition-colors">
                {t.header.signup}
              </button>
            </div>
          </div>

          {/* Mobile Right Actions */}
          <div className="flex md:hidden items-center gap-3">
            <button 
              className="p-2 hover:bg-white/10 rounded-full"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
            >
              <Globe className="w-5 h-5 text-white" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full relative">
              <Bell className="w-5 h-5 text-white" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pink-500 rounded-full border border-black"></span>
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full">
              <Headphones className="w-5 h-5 text-white" />
            </button>
            <button 
              className="p-2 hover:bg-white/10 rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0a0a0a] border-b border-white/10 p-4 shadow-2xl animate-in slide-in-from-top-5 h-[calc(100vh-80px)] overflow-y-auto">
          <nav className="flex flex-col gap-4">
            {[
              t.header.exchange, 
              t.header.markets, 
              t.header.trade, 
              t.header.derivatives, 
              t.header.earn, 
              t.header.finance
            ].map((item) => (
              <Link 
                key={item} 
                href="#" 
                className="text-lg font-medium text-gray-300 hover:text-brand-cyan py-2 border-b border-white/5"
              >
                {item}
              </Link>
            ))}
            <div className="flex gap-4 mt-4">
              <button className="flex-1 py-3 border border-white/20 rounded-full font-bold">{t.header.login}</button>
              <button className="flex-1 py-3 bg-brand-cyan text-black rounded-full font-bold">{t.header.signup}</button>
            </div>
            
            {/* Mobile Language Switcher */}
            <div className="mt-8 border-t border-white/10 pt-6">
              <div className="text-xs text-gray-500 uppercase font-bold mb-4">Language / 语言</div>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => { toggleLanguage('zh'); setMobileMenuOpen(false); }}
                  className={`py-3 rounded-xl border ${language === 'zh' ? 'border-brand-cyan text-brand-cyan bg-brand-cyan/10' : 'border-white/10 text-gray-400'}`}
                >
                  中文
                </button>
                <button 
                  onClick={() => { toggleLanguage('en'); setMobileMenuOpen(false); }}
                  className={`py-3 rounded-xl border ${language === 'en' ? 'border-brand-cyan text-brand-cyan bg-brand-cyan/10' : 'border-white/10 text-gray-400'}`}
                >
                  English
                </button>
              </div>
            </div>
          </nav>
        </div>
      )}
      
      {/* Mobile Header Language Modal (if clicked from top bar) */}
      {langMenuOpen && !mobileMenuOpen && (
         <div className="md:hidden absolute top-full right-4 mt-2 w-40 bg-[#111] border border-white/10 rounded-lg shadow-xl py-2 overflow-hidden z-50">
            <button 
              onClick={() => toggleLanguage('zh')}
              className={`w-full px-4 py-3 text-left text-sm border-b border-white/5 ${language === 'zh' ? 'text-brand-cyan font-bold' : 'text-gray-400'}`}
            >
              中文 (ZH)
            </button>
            <button 
              onClick={() => toggleLanguage('en')}
              className={`w-full px-4 py-3 text-left text-sm ${language === 'en' ? 'text-brand-cyan font-bold' : 'text-gray-400'}`}
            >
              English (EN)
            </button>
          </div>
      )}
    </header>
  );
}
