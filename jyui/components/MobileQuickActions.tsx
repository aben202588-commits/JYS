'use client';

import { ArrowUpFromLine, ArrowDownToLine, ShieldCheck, BookUser, Wallet } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function MobileQuickActions() {
  const { t } = useLanguage();

  const quickActions = [
    { name: t.hero.quick_withdraw, icon: ArrowUpFromLine },
    { name: t.hero.quick_deposit, icon: ArrowDownToLine },
    { name: t.hero.quick_security, icon: ShieldCheck },
    { name: t.hero.quick_address, icon: BookUser },
    { name: t.hero.quick_portfolio, icon: Wallet },
  ];

  return (
      <div className="md:hidden w-full px-4 mt-4 relative z-20">
        <div className="grid grid-cols-5 gap-2">
          {quickActions.map((action) => (
            <div key={action.name} className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all active:bg-white/10 active:backdrop-blur-md">
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] text-gray-400">{action.name}</span>
            </div>
          ))}
        </div>
      </div>
  );
}
