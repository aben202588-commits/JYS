'use client';

import React from 'react';
import { Lock } from 'lucide-react';
import { useUserStore } from '@/store/userStore';

interface VipUpgradeOverlayProps {
  children: React.ReactNode;
}

export default function VipUpgradeOverlay({ children }: VipUpgradeOverlayProps) {
  const { isVip } = useUserStore();

  if (isVip) {
    return <>{children}</>;
  }

  return (
    <div className="relative w-full h-full">
      {/* Background content (blurred) */}
      <div className="filter blur-sm pointer-events-none select-none opacity-50">
        {children}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm rounded-lg border border-white/10 p-6 text-center">
        <div className="w-12 h-12 bg-brand-gradient rounded-full flex items-center justify-center mb-4">
          <Lock className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">VIP 会员专享</h3>
        <p className="text-text-secondary mb-6 max-w-xs">
          此资产交易仅限 VIP 会员，请点击升级以获取实时深度与下单权限
        </p>
        <button 
          onClick={() => alert('Upgrade functionality to be implemented')}
          className="px-6 py-2 bg-brand-gradient text-white font-medium rounded-full hover:opacity-90 transition-opacity"
        >
          立即升级
        </button>
      </div>
    </div>
  );
}
