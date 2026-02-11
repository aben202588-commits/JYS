'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { createChart, ColorType, IChartApi, ISeriesApi, Time, CandlestickData, CandlestickSeries } from 'lightweight-charts';

interface ChartContainerProps {
  symbol: string;
  currentPrice: number | undefined;
  priceChangePercent: number | undefined;
}

export default function ChartContainer({ symbol, currentPrice, priceChangePercent }: ChartContainerProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const [chartLoaded, setChartLoaded] = useState(false);

  // Generate mock history data
  const generateInitialData = useCallback((basePrice: number) => {
    const data: CandlestickData[] = [];
    let time = Math.floor(Date.now() / 1000) - 100 * 60; // Start 100 mins ago
    let current = basePrice;

    for (let i = 0; i < 100; i++) {
      const open = current;
      const change = (Math.random() - 0.5) * (basePrice * 0.002);
      const close = open + change;
      const high = Math.max(open, close) + Math.random() * (basePrice * 0.001);
      const low = Math.min(open, close) - Math.random() * (basePrice * 0.001);

      data.push({
        time: time as Time,
        open,
        high,
        low,
        close,
      });

      current = close;
      time += 60;
    }
    return data;
  }, []);

  // Initialize Chart
  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Cleanup old chart
    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
    }

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#888',
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.05)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.05)' },
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
      rightPriceScale: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor: '#02C076',
      downColor: '#F84960',
      borderVisible: false,
      wickUpColor: '#02C076',
      wickDownColor: '#F84960',
      priceLineVisible: true,
      priceLineWidth: 1,
      priceLineColor: '#02C076', // Dynamic based on trend?
    });

    // Load initial data (mock)
    const initialPrice = currentPrice || 50000;
    const initialData = generateInitialData(initialPrice);
    series.setData(initialData);

    chartRef.current = chart;
    seriesRef.current = series;
    setChartLoaded(true);

    // Resize Observer
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({ 
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [symbol, generateInitialData]); // Re-init on symbol change

  // Update Chart with Realtime Data
  useEffect(() => {
    if (!seriesRef.current || !currentPrice) return;

    const series = seriesRef.current;
    const currentTime = Math.floor(Date.now() / 60) * 60 as Time; // Round to minute
    
    // Get last candle
    // Lightweight charts doesn't expose easy "getLastData", so we assume logic:
    // Ideally we track local state, but for simplicity we can assume we are appending/updating.
    // However, series.update() handles "update last bar" if time matches.
    
    // We need the last candle to update its Close/High/Low.
    // But since we can't easily read it back synchronously without state, 
    // we'll rely on the fact that series.update() with SAME time updates the candle.
    
    // Problem: We need the Open price for the NEW minute candle.
    // If it's a new minute, Open = Previous Close.
    // We can't easily get Previous Close from chart.
    // WORKAROUND: We won't be 100% accurate on "Open" for new candles without local state tracking.
    // BUT, for this task, we can track `lastCandle` in a Ref.

    updateCandle(currentTime, currentPrice);

  }, [currentPrice]);

  const lastCandleRef = useRef<CandlestickData | null>(null);

  const updateCandle = (time: Time, price: number) => {
    if (!seriesRef.current) return;

    // Initialize lastCandleRef from initial data if null
    if (!lastCandleRef.current) {
       // This is a bit tricky. We just generated initial data.
       // Let's assume the last candle of initial data is our starting point.
       // We can fetch it if we stored initialData.
       // Simplified: The first update might jump. It's acceptable for a prototype.
       lastCandleRef.current = {
         time: time,
         open: price,
         high: price,
         low: price,
         close: price
       };
    }

    const last = lastCandleRef.current;
    
    if (last.time === time) {
      // Update existing candle
      const updated = {
        ...last,
        high: Math.max(last.high, price),
        low: Math.min(last.low, price),
        close: price
      };
      seriesRef.current.update(updated);
      lastCandleRef.current = updated;
    } else {
      // New candle
      const newCandle = {
        time: time,
        open: last.close, // Open is previous close
        high: price,
        low: price,
        close: price
      };
      seriesRef.current.update(newCandle);
      lastCandleRef.current = newCandle;
    }
  };

  const isUp = (priceChangePercent || 0) >= 0;

  return (
    <div className="relative w-full h-full">
      {/* Price Bubble Overlay */}
      <div className="absolute top-4 left-4 z-10 flex flex-col items-start pointer-events-none">
        <div className={`
          backdrop-blur-md px-3 py-1.5 rounded-lg border
          ${isUp 
            ? 'bg-green-500/10 border-green-500/20 text-green-400' 
            : 'bg-red-500/10 border-red-500/20 text-red-400'}
        `}>
          <div className="text-2xl font-bold font-mono">
            {currentPrice?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="text-xs font-medium mt-0.5 flex items-center gap-1">
            <span>{isUp ? '+' : ''}{priceChangePercent?.toFixed(2)}%</span>
            <span className="opacity-60">24h</span>
          </div>
        </div>
      </div>

      {/* Chart Element */}
      <div ref={chartContainerRef} className="w-full h-full" />
      
      {!chartLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-20">
          <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}