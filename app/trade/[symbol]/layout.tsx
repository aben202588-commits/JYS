import React from 'react';

export default function TradeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0b0e11] text-white">
      {/* 
        Responsive Layout Skeleton:
        - Mobile: flex-col (Stack vertically)
        - Desktop (md+): flex-row (Side by side)
      */}
      <main className="flex flex-col md:flex-row h-[calc(100vh-64px)] w-full overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 w-full h-full relative">
          {children}
        </div>
      </main>
    </div>
  );
}
