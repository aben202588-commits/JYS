'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
// import MobileTicker from '@/components/MobileTicker';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white selection:bg-brand-cyan/30 selection:text-brand-cyan">
      {/* <MobileTicker /> */}
      <Header />
      <main className="flex-1 relative z-10">
        {children}
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
