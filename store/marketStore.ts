import { create } from 'zustand';

export interface AssetData {
  id: string; // 如 "BTC_USDT_SPOT"
  type: 'SPOT' | 'SWAP' | 'FOREX' | 'STOCK' | 'OPTION';
  symbol: string; // 币种/资产代码
  displayName: string; // 中文全称
  price: number;
  changeRate: number; // 涨跌幅
  hasOption: boolean; // 是否支持二元期权标签
  turnover: string; // 成交额 (e.g., "$535.89万")
  leverage?: string; // 杠杆倍数 (e.g., "10x")
  iconUrl?: string; // 图标 URL
  apiSource?: string; // API 数据源标识 (e.g., "binance", "alpha_vantage", "local_core")
  apiSymbol?: string; // API 请求用的原始代码 (e.g., "BTCUSDT")
}

interface MarketState {
  assets: AssetData[];
  setAssets: (assets: AssetData[]) => void;
  updateAsset: (id: string, data: Partial<AssetData>) => void;
  fetchAssets: () => Promise<void>;
}

export const useMarketStore = create<MarketState>((set) => ({
  assets: [],
  setAssets: (assets) => set({ assets }),
  updateAsset: (id, data) =>
    set((state) => ({
      assets: state.assets.map((asset) =>
        asset.id === id ? { ...asset, ...data } : asset
      ),
    })),
  fetchAssets: async () => {
    try {
      const res = await fetch('/api/admin/markets');
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        set({ assets: data });
      } else {
        // Fallback or empty
        set({ assets: [] });
      }
    } catch (error) {
      console.error('Failed to fetch market assets:', error);
    }
  },
}));
