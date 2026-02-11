'use client';

import Hero from '@/components/Hero';
// import MarketList from '@/components/MarketList';
// import TradingChart from '@/components/TradingChart';
import BannerCards from '@/components/BannerCards';
import PlatformStats from '@/components/PlatformStats';
import StrategySection from '@/components/StrategySection';
import PortfolioSection from '@/components/PortfolioSection';
import NFTSection from '@/components/NFTSection';

export default function DesktopHome() {
  return (
    <div className="bg-[#050505] text-white selection:bg-brand-cyan/30 selection:text-brand-cyan">
      <Hero />
      {/* Desktop specific spacing: -mt-20, space-y-32, pb-32 */}
      <div className="relative z-20 -mt-20 space-y-32 pb-32">
        <BannerCards />
        <div className="container mx-auto px-6 space-y-32">
          {/* <MarketList /> */}
          {/* <TradingChart /> */}
          <StrategySection />
          <PlatformStats />
          <PortfolioSection />
          <NFTSection />
        </div>
      </div>
    </div>
  );
}
