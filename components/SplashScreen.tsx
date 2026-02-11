'use client';

import { useEffect } from 'react';

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const duration = 3000; // 3 seconds

    const finishTimer = setTimeout(() => {
      onFinish();
    }, duration);

    return () => {
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Neon WEB3 Effect */}
      <div className="relative z-10 w-full max-w-4xl px-4 flex items-center justify-center">
        <svg viewBox="0 0 600 150" className="w-full h-auto">
          <defs>
            {/* Gradient for the walking light effect */}
            <linearGradient id="neon-gradient" x1="0%" y1="0%" x2="200%" y2="0%">
              {/* Three colors: Red, Cyan, Yellow repeated to create seamless loop */}
              <stop offset="0%" stopColor="#ff003c" />
              <stop offset="16.6%" stopColor="#00f3ff" />
              <stop offset="33.3%" stopColor="#ffe600" />
              <stop offset="50%" stopColor="#ff003c" />
              <stop offset="66.6%" stopColor="#00f3ff" />
              <stop offset="83.3%" stopColor="#ffe600" />
              <stop offset="100%" stopColor="#ff003c" />
              
              {/* Animate the gradient to move across the text */}
              <animateTransform
                attributeName="gradientTransform"
                type="translate"
                from="-0.5 0"
                to="0 0"
                dur="2s"
                repeatCount="indefinite"
              />
            </linearGradient>

            {/* Glow Filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Text Group */}
          <g className="font-black tracking-tighter" style={{ fontFamily: 'system-ui, sans-serif' }}>
            {/* Background Stroke (Dimmed base) */}
            <text
              x="50%"
              y="50%"
              dy=".35em"
              textAnchor="middle"
              fontSize="120"
              fill="none"
              stroke="#333"
              strokeWidth="2"
            >
              WEB3
            </text>

            {/* Foreground Stroke (Walking Light) */}
            <text
              x="50%"
              y="50%"
              dy=".35em"
              textAnchor="middle"
              fontSize="120"
              fill="none"
              stroke="url(#neon-gradient)"
              strokeWidth="3"
              filter="url(#glow)"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              WEB3
            </text>
          </g>
        </svg>
      </div>
      
      {/* Optional: Add reflection at the bottom */}
      <div className="absolute bottom-1/3 w-64 h-8 bg-gradient-to-r from-transparent via-brand-cyan/20 to-transparent blur-2xl" />
    </div>
  );
}
