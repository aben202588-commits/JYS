'use client';

import { useState, useEffect } from 'react';
import DesktopHome from '@/components/DesktopHome';
import MobileHome from '@/components/MobileHome';
import SplashScreen from '@/components/SplashScreen';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const checkDevice = () => {
      // Combine width check (Tailwind md breakpoint is 768px) and User Agent for robustness
      const widthCheck = window.innerWidth < 768;
      const uaCheck = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(widthCheck || uaCheck);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const handleSplashFinish = () => {
    setLoading(false);
  };

  // Prevent hydration mismatch by only rendering after mount
  if (!mounted) return null;

  if (loading) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return isMobile ? <MobileHome /> : <DesktopHome />;
}
