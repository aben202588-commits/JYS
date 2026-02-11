'use client';

import { Home, Activity, ArrowLeftRight, Coins, Wallet } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter, usePathname } from 'next/navigation';

export default function BottomNav() {
  const { t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  const handleNavClick = (path: string) => {
    router.push(path);
  };

  const navItems = [
    { name: 'Home', label: t.nav.home, icon: Home, path: '/' },
    { name: 'Markets', label: t.nav.markets, icon: Activity, path: '/markets' },
    { name: 'Trade', label: t.nav.trade, icon: ArrowLeftRight, path: '/trade/BTC-USDT' },
    { name: 'Earn', label: t.nav.earn, icon: Coins, path: '/earn' },
    { name: 'Assets', label: t.nav.assets, icon: Wallet, path: '/assets' },
  ];

  const getActiveItem = () => {
    if (pathname === '/') return 'Home';
    if (pathname.startsWith('/markets')) return 'Markets';
    if (pathname.startsWith('/trade')) return 'Trade';
    if (pathname.startsWith('/earn')) return 'Earn';
    if (pathname.startsWith('/assets')) return 'Assets';
    return '';
  };

  const active = getActiveItem();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#121212] border-t border-white/5 md:hidden z-50 safe-area-bottom">
      <div className="flex justify-between items-center px-2 py-2">
        {navItems.map((item) => {
          const isActive = active === item.name;
          return (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.path)}
              className="flex flex-col items-center justify-center w-full py-1 gap-1"
            >
              <item.icon 
                className={`w-6 h-6 transition-colors ${isActive ? 'text-brand-cyan' : 'text-gray-500'}`} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`text-[10px] ${isActive ? 'text-brand-cyan font-medium' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
