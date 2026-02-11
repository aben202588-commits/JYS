'use client';

import { useEffect, useState } from 'react';
import { useMarketStore, AssetData } from '@/store/marketStore';
import { useMarketStore as useRealtimeMarketStore } from '@/lib/store/useMarketStore';
import { TrendingUp, TrendingDown, ArrowUpDown, Search } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const TAB_IDS = ['ALL', 'FOREX', 'STOCK', 'SPOT', 'SWAP', 'OPTION', 'DEFI', 'METAVERSE', 'GAMING', 'MEME'] as const;

export default function MarketHub() {
  const { t } = useLanguage();
  const { assets, fetchAssets } = useMarketStore();
  const { markets: realtimeMarkets, initializeRealtime } = useRealtimeMarketStore();
  const [activeTab, setActiveTab] = useState<typeof TAB_IDS[number]>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchAssets();
    initializeRealtime();
  }, [fetchAssets, initializeRealtime]);

  const filteredAssets = assets.filter(asset => 
    (activeTab === 'ALL' || asset.type === activeTab) &&
    (asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
     asset.id.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getRealtimeKey = (asset: AssetData) => {
    // Construct key for realtime map (e.g. "spot:BTC-USDT")
    return `${asset.type.toLowerCase()}:${asset.symbol.replace('/', '-')}`;
  };

  return (
    <div className="min-h-screen pb-20 pt-20 px-4 container mx-auto">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder={t.market.search}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-colors backdrop-blur-md"
        />
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          {t.market.hub_title}
        </h1>
        <p className="text-sm text-gray-500">{t.market.subtitle}</p>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 mb-4 w-full no-scrollbar">
        {TAB_IDS.map((id) => {
          const isActive = activeTab === id;
          const labelKey = id.toLowerCase() as keyof typeof t.market.categories;
          const label = t.market.categories?.[labelKey] || id; // Fallback to ID if translation missing
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`
                flex items-center px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap shrink-0
                ${isActive 
                  ? 'text-white bg-transparent drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] scale-105' 
                  : 'text-white/60 hover:text-white'
                }
              `}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[1.2fr_1fr_0.8fr] gap-2 px-4 py-3 text-xs text-gray-500 border-b border-white/10">
        <div className="flex items-center gap-1">
          {t.market.headers.name} <span className="hidden md:inline text-[10px] text-gray-600">/ {t.market.headers.volume}</span>
          <ArrowUpDown className="w-3 h-3 ml-1" />
        </div>
        <div className="text-right flex items-center justify-end gap-1">
          {t.market.headers.price}
          <ArrowUpDown className="w-3 h-3 ml-1" />
        </div>
        <div className="text-right flex items-center justify-end gap-1">
          {t.market.headers.change}
          <ArrowUpDown className="w-3 h-3 ml-1" />
        </div>
      </div>

      {/* List */}
      <div className="flex flex-col">
        {filteredAssets.map((asset) => {
          const realtimeKey = getRealtimeKey(asset);
          const realtimeData = realtimeMarkets[realtimeKey];
          
          const price = realtimeData ? realtimeData.last_price : asset.price;
          const changeRate = realtimeData ? realtimeData.change_24h : asset.changeRate;
          const flash = realtimeData?.flash || null;
          const isUp = changeRate >= 0;
          
          return (
            <Link href={`/trade/${asset.id}`} key={asset.id}>
              <div 
                className={`
                  grid grid-cols-[1.2fr_1fr_0.8fr] gap-2 px-4 py-2.5
                  items-center transition-colors
                  cursor-pointer group h-[64px]
                  ${flash === 'up' ? 'bg-green-500/10' : ''}
                  ${flash === 'down' ? 'bg-red-500/10' : ''}
                `}
              >
                {/* Name / Volume Column */}
                <div className="flex items-center gap-3 overflow-hidden">
                  {asset.iconUrl ? (
                    <img 
                      src={asset.iconUrl} 
                      alt={asset.symbol} 
                      className="w-9 h-9 rounded-full object-cover shrink-0 bg-white/5"
                    />
                  ) : (
                    <div className={`
                      w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0
                      ${asset.type === 'SPOT' || asset.type === 'SWAP' ? 'bg-orange-500/20 text-orange-500' : 
                        asset.type === 'FOREX' ? 'bg-blue-500/20 text-blue-500' : 
                        'bg-purple-500/20 text-purple-500'}
                    `}>
                      {asset.symbol.substring(0, 1)}
                    </div>
                  )}
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="flex items-baseline gap-[3px] truncate">
                        <span className="font-bold text-white text-[1.1rem] leading-none">
                          {asset.symbol.includes('/') ? asset.symbol.split('/')[0] : asset.symbol}
                        </span>
                        {asset.symbol.includes('/') && (
                          <span className="text-[11px] text-gray-500 font-medium leading-none">
                            / {asset.symbol.split('/')[1]}
                          </span>
                        )}
                        {!asset.symbol.includes('/') && asset.type !== 'OPTION' && (
                          <span className="text-[11px] text-gray-500 font-medium leading-none">
                            / USDT
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-[11px] text-gray-500 font-medium truncate hidden md:block">
                      {asset.turnover || '$0.00'}
                    </div>
                  </div>
                </div>

                {/* Price Column */}
                <div className="text-right flex flex-col justify-center gap-0.5 pr-2">
                  <div className={`
                    font-bold text-[15px] leading-tight transition-colors duration-300
                    ${flash === 'up' ? 'text-green-400' : flash === 'down' ? 'text-red-400' : 'text-white'}
                  `}>
                    {price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                  </div>
                  <div className="text-[11px] text-gray-500 font-medium">
                    ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>

                {/* Change Column / Trade Button */}
                <div className="flex justify-end items-center">
                  <div className={`
                    w-[76px] h-[34px] flex items-center justify-center rounded-[4px] text-[13px] font-bold text-white tracking-wide
                    ${isUp ? 'bg-[#00C087]' : 'bg-[#E94C61]'}
                    group-hover:animate-pulse shadow-lg
                  `}>
                    {isUp ? '+' : ''}{changeRate.toFixed(2)}%
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      
      {filteredAssets.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No assets found for this category.
        </div>
      )}
    </div>
  );
}
