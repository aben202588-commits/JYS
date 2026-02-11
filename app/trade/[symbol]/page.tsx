'use client';

import { useEffect } from 'react';
import { useMarketStore, AssetData } from '@/store/marketStore';
import { useMarketStore as useRealtimeMarketStore } from '@/lib/store/useMarketStore';
import { useParams } from 'next/navigation';
import ChartContainer from '@/app/components/ChartContainer';
import { useLanguage } from '@/context/LanguageContext';

export default function TradePage() {
  const { t } = useLanguage();
  const params = useParams();
  const symbolId = params.symbol as string;
  
  const { assets, fetchAssets } = useMarketStore();
  const { markets: realtimeMarkets, initializeRealtime } = useRealtimeMarketStore();

  useEffect(() => {
    fetchAssets();
    initializeRealtime();
  }, [fetchAssets, initializeRealtime]);

  // Find asset in static list
  const asset = assets.find(a => a.id === symbolId);

  // Get realtime data
  const getRealtimeKey = (id: string) => {
    const a = assets.find(x => x.id === id);
    if (!a) return null;
    return `${a.type.toLowerCase()}:${a.symbol.replace('/', '-')}`;
  };

  const realtimeKey = asset ? getRealtimeKey(asset.id) : null;
  const realtimeData = realtimeKey ? realtimeMarkets[realtimeKey] : null;

  const price = realtimeData ? realtimeData.last_price : asset?.price;
  const changeRate = realtimeData ? realtimeData.change_24h : asset?.changeRate;
  const flash = realtimeData?.flash || null;
  const isUp = (changeRate || 0) >= 0;

  if (!asset) {
    return <div className="p-8 text-center text-gray-500">{t.trade_page.asset_not_found}: {symbolId}</div>;
  }

  return (
    <div className="flex flex-col md:grid md:grid-cols-12 md:grid-rows-[auto_1fr] h-screen bg-[#121212] pt-16 md:pt-20 md:px-4 md:pb-4 gap-0 md:gap-4">
      {/* Header Info - Mobile Optimized */}
      <div className="md:col-span-12 flex items-center justify-between p-4 border-b border-white/5 md:border md:border-white/5 md:rounded-lg bg-[#121212]">
        <div className="flex items-center gap-3">
          {asset.iconUrl && (
            <img src={asset.iconUrl} alt={asset.symbol} className="w-8 h-8 rounded-full" />
          )}
          <div>
            <h1 className="text-lg font-bold text-white leading-none">{asset.displayName}</h1>
            <div className="text-xs text-gray-400 mt-1">{asset.symbol}</div>
          </div>
        </div>
        
        <div className="text-right">
          <div className={`text-xl font-mono font-bold transition-colors duration-300 ${
            flash === 'up' ? 'text-green-400' : flash === 'down' ? 'text-red-400' : 'text-white'
          }`}>
            {price?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className={`text-xs font-medium ${isUp ? 'text-green-500' : 'text-red-500'}`}>
            {isUp ? '+' : ''}{changeRate?.toFixed(2)}%
          </div>
        </div>
      </div>

      {/* Chart Area - Takes remaining space (Upper half on mobile split view context) */}
      <div className="flex-1 md:flex-none md:col-span-8 relative w-full min-h-[300px] bg-[#121212] md:border md:border-white/5 md:rounded-lg overflow-hidden">
        <ChartContainer 
          symbol={asset.symbol} 
          currentPrice={price} 
          priceChangePercent={changeRate} 
        />
      </div>
      
      {/* Placeholder for Order Book / Trade Form (Lower half) */}
      <div className="h-[40vh] md:h-auto md:col-span-4 border-t border-white/5 md:border md:border-white/5 md:rounded-lg p-4 bg-[#121212]">
        <div className="w-full h-full rounded-lg border border-dashed border-white/10 flex items-center justify-center text-gray-600 text-sm">
          {t.trade_page.order_book_placeholder}
        </div>
      </div>
    </div>
  );
}
