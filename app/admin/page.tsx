'use client';

import React, { useState, useEffect } from 'react';
import { translations } from '@/lib/translations';
import { AssetData } from '@/store/marketStore';

type ContentData = {
  text: Record<string, { zh: string; en: string }>;
  images: Record<string, string>;
};

export default function AdminPage() {
  const [content, setContent] = useState<ContentData>({
    text: {},
    images: {}
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  
  // Market Data State
  const [marketAssets, setMarketAssets] = useState<AssetData[]>([]);
  const [editingAsset, setEditingAsset] = useState<Partial<AssetData> | null>(null);
  const [isEditingMarket, setIsEditingMarket] = useState(false);

  // API Source Mapping
  const API_SOURCE_MAPPING: Record<string, string> = {
    'SPOT': 'module_spot',
    'SWAP': 'module_swap',
    'FOREX': 'module_forex',
    'STOCK': 'module_stock',
    'OPTION': 'module_option',
  };

  // Load initial data
  useEffect(() => {
    // Load content
    fetch('/api/admin/content')
      .then(res => res.json())
      .then(savedContent => {
        // Flatten translations to generate all available keys
        const defaultText: Record<string, { zh: string, en: string }> = {};
        
        // Helper to flatten object
        const flatten = (obj: any, prefix = '') => {
          Object.keys(obj).forEach(key => {
            const newKey = prefix ? `${prefix}.${key}` : key;
            if (typeof obj[key] === 'object' && obj[key] !== null) {
              flatten(obj[key], newKey);
            } else {
              // Found a leaf node (string)
              if (!defaultText[newKey]) defaultText[newKey] = { zh: '', en: '' };
              // We assume we are iterating 'zh' or 'en' first
            }
          });
        };

        // We need to iterate both languages from translations to build the full key set
        flatten(translations.zh);
        
        // Now populate default values from translations
        Object.keys(defaultText).forEach(key => {
          // Get value from translations.zh
          const getVal = (langObj: any, k: string) => {
            return k.split('.').reduce((obj, i) => obj?.[i], langObj) || '';
          };
          
          defaultText[key].zh = getVal(translations.zh, key);
          defaultText[key].en = getVal(translations.en, key);
        });

        // Merge saved content over defaults
        const mergedText = { ...defaultText, ...savedContent.text };
        
        setContent({
          text: mergedText,
          images: savedContent.images || {}
        });
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load content', err);
        setLoading(false);
      });

    // Load market assets
    fetch('/api/admin/markets')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setMarketAssets(data);
      })
      .catch(err => console.error('Failed to load markets', err));
  }, []);

  const handleTextChange = (key: string, lang: 'zh' | 'en', value: string) => {
    setContent(prev => ({
      ...prev,
      text: {
        ...prev.text,
        [key]: {
          ...prev.text[key],
          [lang]: value
        }
      }
    }));
  };

  const handleImageUpload = async (key: string, file: File) => {
    setUploading(key);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      
      if (data.url) {
        setContent(prev => ({
          ...prev,
          images: {
            ...prev.images,
            [key]: data.url
          }
        }));
      }
    } catch (err) {
      console.error('Upload failed', err);
      alert('上传失败');
    } finally {
      setUploading(null);
    }
  };

  const saveContent = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
      });
      alert('保存成功！请刷新首页查看效果。');
    } catch (err) {
      console.error('Save failed', err);
      alert('保存失败');
    } finally {
      setSaving(false);
    }
  };

  const saveMarkets = async (newAssets: AssetData[]) => {
    setMarketAssets(newAssets);
    try {
      await fetch('/api/admin/markets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAssets)
      });
    } catch (err) {
      console.error('Failed to save markets', err);
      alert('市场数据保存失败');
    }
  };

  const handleAssetSave = async () => {
    if (!editingAsset || !editingAsset.symbol) return;
    
    const newAsset = {
      ...editingAsset,
      id: editingAsset.id || `${editingAsset.symbol}_${Date.now()}`,
      price: Number(editingAsset.price),
      changeRate: Number(editingAsset.changeRate),
    } as AssetData;

    let newAssets = [...marketAssets];
    const index = newAssets.findIndex(a => a.id === newAsset.id);
    
    if (index >= 0) {
      newAssets[index] = newAsset;
    } else {
      newAssets.push(newAsset);
    }

    await saveMarkets(newAssets);
    setEditingAsset(null);
    setIsEditingMarket(false);
  };

  const deleteAsset = async (id: string) => {
    if (!confirm('确定要删除这个品种吗？')) return;
    const newAssets = marketAssets.filter(a => a.id !== id);
    await saveMarkets(newAssets);
  };

  const handleAssetIconUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) {
        setEditingAsset(prev => prev ? ({ ...prev, iconUrl: data.url }) : null);
      }
    } catch (err) {
      alert('图标上传失败');
    }
  };

  if (loading) return <div className="p-8 text-white">加载中...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">后台管理系统</h1>
          <button 
            onClick={saveContent}
            disabled={saving}
            className="px-6 py-2 bg-brand-cyan text-black font-bold rounded hover:bg-opacity-90 disabled:opacity-50"
          >
            {saving ? '保存中...' : '保存更改'}
          </button>
        </div>

        {/* Text Editing Section */}
        <div className="bg-gray-900 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4 text-brand-cyan">文案编辑</h2>
          <div className="space-y-6">
            {Object.keys(content.text).map((key) => (
              <div key={key} className="border-b border-gray-800 pb-6 last:border-0">
                <label className="block text-sm text-gray-400 mb-2 font-mono">{key}</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-gray-500 mb-1 block">中文 (ZH)</span>
                    <input
                      type="text"
                      value={content.text[key]?.zh || ''}
                      onChange={(e) => handleTextChange(key, 'zh', e.target.value)}
                      className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white focus:border-brand-cyan outline-none"
                    />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 mb-1 block">English (EN)</span>
                    <input
                      type="text"
                      value={content.text[key]?.en || ''}
                      onChange={(e) => handleTextChange(key, 'en', e.target.value)}
                      className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white focus:border-brand-cyan outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Management Section */}
        <div className="bg-gray-900 p-6 rounded-lg mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-brand-cyan">行情大厅配置</h2>
            <button 
              onClick={() => {
                setEditingAsset({ 
                  type: 'SPOT', 
                  symbol: '', 
                  displayName: '', 
                  price: 0, 
                  changeRate: 0, 
                  hasOption: false, 
                  turnover: '', 
                  leverage: '',
                  apiSource: API_SOURCE_MAPPING['SPOT'],
                  apiSymbol: ''
                });
                setIsEditingMarket(true);
              }}
              className="px-4 py-1 bg-brand-cyan text-black text-sm font-bold rounded hover:bg-opacity-90"
            >
              添加品种
            </button>
          </div>

          {isEditingMarket && editingAsset && (
            <div className="mb-6 p-4 border border-gray-700 rounded bg-black/50">
              <h3 className="text-lg font-bold mb-4">{editingAsset.id ? '编辑品种' : '新增品种'}</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="col-span-2 border-b border-gray-700 pb-2 mb-2">
                   <h4 className="text-sm font-bold text-brand-cyan mb-2">API 对接配置 (预留)</h4>
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">API 模块/项目 (API Module/Project)</label>
                        <input 
                          type="text" 
                          value={editingAsset.apiSource || ''} 
                          onChange={e => setEditingAsset({...editingAsset, apiSource: e.target.value})}
                          placeholder="e.g. module_spot"
                          className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-gray-400 cursor-not-allowed"
                          readOnly
                        />
                        <p className="text-[10px] text-gray-500 mt-1">根据品种类型自动关联 API 模块</p>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">API 原始代码 (API Symbol)</label>
                        <input 
                          type="text" 
                          value={editingAsset.apiSymbol || ''} 
                          onChange={e => setEditingAsset({...editingAsset, apiSymbol: e.target.value})}
                          placeholder="e.g. BTCUSDT"
                          className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white"
                        />
                        <p className="text-[10px] text-gray-500 mt-1">接口请求时使用的标准代码</p>
                      </div>
                   </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1">类型 (Type)</label>
                  <select 
                    value={editingAsset.type} 
                    onChange={e => {
                      const newType = e.target.value as any;
                      setEditingAsset({
                        ...editingAsset, 
                        type: newType,
                        apiSource: API_SOURCE_MAPPING[newType] || editingAsset.apiSource
                      });
                    }}
                    className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white"
                  >
                    <option value="SPOT">Spot (现货)</option>
                    <option value="SWAP">Perpetual (合约)</option>
                    <option value="FOREX">Forex (外汇)</option>
                    <option value="STOCK">USA (美股)</option>
                    <option value="OPTION">Options (期权)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">代码 (Symbol, e.g. BTC/USDT)</label>
                  <input 
                    type="text" 
                    value={editingAsset.symbol} 
                    onChange={e => setEditingAsset({...editingAsset, symbol: e.target.value})}
                    className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">名称 (Display Name)</label>
                  <input 
                    type="text" 
                    value={editingAsset.displayName} 
                    onChange={e => setEditingAsset({...editingAsset, displayName: e.target.value})}
                    className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">价格 (Price)</label>
                  <input 
                    type="number" 
                    value={editingAsset.price} 
                    onChange={e => setEditingAsset({...editingAsset, price: Number(e.target.value)})}
                    className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">涨跌幅 (Change %)</label>
                  <input 
                    type="number" 
                    value={editingAsset.changeRate} 
                    onChange={e => setEditingAsset({...editingAsset, changeRate: Number(e.target.value)})}
                    className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">成交额 (Turnover)</label>
                  <input 
                    type="text" 
                    value={editingAsset.turnover} 
                    onChange={e => setEditingAsset({...editingAsset, turnover: e.target.value})}
                    className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">杠杆 (Leverage, e.g. 10x)</label>
                  <input 
                    type="text" 
                    value={editingAsset.leverage} 
                    onChange={e => setEditingAsset({...editingAsset, leverage: e.target.value})}
                    className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">图标 (Icon)</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={e => e.target.files?.[0] && handleAssetIconUpload(e.target.files[0])}
                      className="w-full text-xs text-gray-400"
                    />
                    {editingAsset.iconUrl && (
                      <img src={editingAsset.iconUrl} alt="Preview" className="w-8 h-8 rounded-full" />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button 
                  onClick={() => { setIsEditingMarket(false); setEditingAsset(null); }}
                  className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                >
                  取消
                </button>
                <button 
                  onClick={handleAssetSave}
                  className="px-4 py-2 bg-brand-cyan text-black font-bold rounded hover:bg-opacity-90"
                >
                  保存
                </button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-400">
              <thead className="text-xs text-gray-500 uppercase bg-gray-800">
                <tr>
                  <th className="px-4 py-3">图标</th>
                  <th className="px-4 py-3">类型</th>
                  <th className="px-4 py-3">代码</th>
                  <th className="px-4 py-3">名称</th>
                  <th className="px-4 py-3">价格</th>
                  <th className="px-4 py-3">操作</th>
                </tr>
              </thead>
              <tbody>
                {marketAssets.map((asset) => (
                  <tr key={asset.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="px-4 py-3">
                      {asset.iconUrl ? (
                        <img src={asset.iconUrl} alt="" className="w-6 h-6 rounded-full" />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs text-white">
                          {asset.symbol?.[0]}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">{asset.type}</td>
                    <td className="px-4 py-3">{asset.symbol}</td>
                    <td className="px-4 py-3">{asset.displayName}</td>
                    <td className="px-4 py-3">{asset.price}</td>
                    <td className="px-4 py-3 flex gap-2">
                      <button 
                        onClick={() => { setEditingAsset(asset); setIsEditingMarket(true); }}
                        className="text-brand-cyan hover:underline"
                      >
                        编辑
                      </button>
                      <button 
                        onClick={() => deleteAsset(asset.id)}
                        className="text-red-500 hover:underline"
                      >
                        删除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Image/Video Upload Section */}
        <div className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-brand-cyan">图片/视频配置</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-800 pb-6">
              <label className="block text-lg font-medium mb-2">Hero 背景视频</label>
              <p className="text-sm text-gray-400 mb-4">上传视频将替换首页顶部的背景效果 (支持 mp4/webm)</p>
              
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => e.target.files?.[0] && handleImageUpload('hero_video', e.target.files[0])}
                    className="block w-full text-sm text-gray-400
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-brand-cyan file:text-black
                      hover:file:bg-opacity-90"
                  />
                </div>
                {uploading === 'hero_video' && <span className="text-yellow-500">上传中...</span>}
              </div>
              
              {content.images.hero_video && (
                <div className="mt-4 relative rounded-lg overflow-hidden border border-gray-700">
                  <video 
                    src={content.images.hero_video} 
                    className="w-full h-48 object-cover" 
                    controls 
                  />
                  <button 
                    onClick={() => setContent(prev => ({...prev, images: {...prev.images, hero_video: ''}}))}
                    className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700"
                  >
                    删除
                  </button>
                </div>
              )}
            </div>

            {/* Other Images placeholders if needed */}
            {['hero_bg', 'hero_floating_1', 'hero_floating_2', 'hero_floating_3', 'hero_floating_4', 'hero_floating_5', 'hero_floating_6'].map(imgKey => (
              <div key={imgKey} className="border-b border-gray-800 pb-6 last:border-0">
                <label className="block text-sm font-medium mb-2 font-mono">{imgKey}</label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleImageUpload(imgKey, e.target.files[0])}
                    className="block w-full text-sm text-gray-400
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-gray-800 file:text-white
                      hover:file:bg-gray-700"
                  />
                </div>
                {content.images[imgKey] && (
                  <div className="mt-4">
                    <img src={content.images[imgKey]} alt={imgKey} className="h-32 rounded border border-gray-700" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
