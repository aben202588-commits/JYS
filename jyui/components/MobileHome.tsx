'use client';

import Hero from '@/components/Hero';
import MobileQuickActions from '@/components/MobileQuickActions';
import MarketList from '@/components/MarketList';
import TradingChart from '@/components/TradingChart';
import BannerCards from '@/components/BannerCards';
import PlatformStats from '@/components/PlatformStats';
import StrategySection from '@/components/StrategySection';
import PortfolioSection from '@/components/PortfolioSection';
import NFTSection from '@/components/NFTSection';

export default function MobileHome() {
  return (
    <>
      <Hero />
      {/* Mobile specific spacing: -mt-10, space-y-20, pb-20 */}
      <div className="relative z-20 -mt-10 space-y-20 pb-20">
        <MobileQuickActions />
        <BannerCards />
        <div className="container mx-auto px-4 space-y-20">
          {/* <MarketList /> */}
          {/* <TradingChart /> */}
          <StrategySection />
          <PlatformStats />
          <PortfolioSection />
          <NFTSection />
        </div>
      </div>
    </>
  );
}
