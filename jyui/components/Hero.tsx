'use client';

import { ArrowRight, Bitcoin, Activity, CheckCircle2, ShieldCheck, Wallet, Coins, Gem } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useCryptoPrice } from '@/hooks/useCryptoPrice';

export default function Hero() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { t, images } = useLanguage();
  const { price, connected } = useCryptoPrice();
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleRegister = () => {
    if (!email) return;
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
      setEmail('');
    }, 1500);
  };



  return (
    <section className="relative min-h-[100dvh] md:min-h-[800px] flex flex-col items-center justify-center pt-24 md:pt-20 overflow-hidden pb-4 md:pb-10 bg-black">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <div className="absolute inset-0 bg-black/50">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="relative z-10 w-full h-full object-cover"
          >
            <source src="/zy.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      
      <div className="relative z-10 container mx-auto px-6 text-center flex flex-col justify-end pb-10 md:justify-center md:pb-0 flex-1 w-full">
        {/* PC Floating Elements - Symmetrical Layout */}
        
        {/* Top Tier (Standard Size) */}
        {/* Left 1 */}
        <div className="hidden md:flex absolute top-[10%] left-[15%] w-16 h-16 items-center justify-center animate-wander-1">
          <div 
            className="w-full h-full flex items-center justify-center"
            style={{ transform: `translate(${mousePos.x * -1}px, ${mousePos.y * -1}px)` }}
          >
            {images?.hero_floating_1 ? (
              <img src={images.hero_floating_1} alt="Dynamic 1" className="w-10 h-10 object-contain" />
            ) : (
              <Bitcoin className="w-8 h-8 text-brand-cyan" />
            )}
          </div>
        </div>
        {/* Right 1 */}
        <div className="hidden md:flex absolute top-[10%] right-[15%] w-20 h-20 items-center justify-center animate-wander-2 delay-500">
          <div 
            className="w-full h-full flex items-center justify-center"
            style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
          >
            {images?.hero_floating_2 ? (
              <img src={images.hero_floating_2} alt="Dynamic 2" className="w-12 h-12 object-contain" />
            ) : (
              <Activity className="w-10 h-10 text-brand-purple" />
            )}
          </div>
        </div>

        {/* Middle Tier (Double Size) - Main Anchors */}
        {/* Left 2 */}
        <div className="hidden md:flex absolute top-[40%] left-[5%] w-32 h-32 items-center justify-center animate-wander-3 delay-1000">
          <div 
            className="w-full h-full flex items-center justify-center"
            style={{ transform: `translate(${mousePos.x * 1.5}px, ${mousePos.y * -1.5}px)` }}
          >
            {images?.hero_floating_3 ? (
              <img src={images.hero_floating_3} alt="Dynamic 3" className="w-20 h-20 object-contain" />
            ) : (
              <Wallet className="w-16 h-16 text-brand-purple" />
            )}
          </div>
        </div>
        {/* Right 2 */}
        <div className="hidden md:flex absolute top-[40%] right-[5%] w-32 h-32 items-center justify-center animate-wander-4 delay-2000">
          <div 
            className="w-full h-full flex items-center justify-center"
            style={{ transform: `translate(${mousePos.x * -1.5}px, ${mousePos.y * 1.5}px)` }}
          >
            {images?.hero_floating_4 ? (
              <img src={images.hero_floating_4} alt="Dynamic 4" className="w-20 h-20 object-contain" />
            ) : (
              <ShieldCheck className="w-16 h-16 text-brand-cyan" />
            )}
          </div>
        </div>

        {/* Bottom Tier (Standard Size) */}
        {/* Left 3 */}
        <div className="hidden md:flex absolute bottom-[20%] left-[15%] w-16 h-16 items-center justify-center animate-wander-5 delay-700">
          <div 
            className="w-full h-full flex items-center justify-center"
            style={{ transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * 0.5}px)` }}
          >
            {images?.hero_floating_5 ? (
              <img src={images.hero_floating_5} alt="Dynamic 5" className="w-10 h-10 object-contain" />
            ) : (
              <Coins className="w-8 h-8 text-brand-purple" />
            )}
          </div>
        </div>
        {/* Right 3 */}
        <div className="hidden md:flex absolute bottom-[20%] right-[15%] w-16 h-16 items-center justify-center animate-wander-6 delay-1500">
          <div 
            className="w-full h-full flex items-center justify-center"
            style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * -0.5}px)` }}
          >
            {images?.hero_floating_6 ? (
              <img src={images.hero_floating_6} alt="Dynamic 6" className="w-10 h-10 object-contain" />
            ) : (
              <Gem className="w-8 h-8 text-brand-cyan" />
            )}
          </div>
        </div>

        {/* Mobile Floating Elements - Symmetrical Layout */}
        
        {/* Top Tier */}
        {/* Left 1 */}
        <div className="md:hidden absolute top-[-9%] left-[6%] w-10 h-10 flex items-center justify-center animate-wander-1 opacity-[0.89]">
           {images?.hero_floating_1 ? (
             <img src={images.hero_floating_1} alt="Dynamic 1" className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(0,255,204,0.5)]" />
           ) : (
             <Bitcoin className="w-8 h-8 text-brand-cyan/80 drop-shadow-[0_0_10px_rgba(0,255,204,0.5)]" />
           )}
        </div>
        {/* Right 1 */}
        <div className="md:hidden absolute top-[-9%] right-[6%] w-10 h-10 flex items-center justify-center animate-wander-2 delay-500 opacity-[0.89]">
           {images?.hero_floating_2 ? (
             <img src={images.hero_floating_2} alt="Dynamic 2" className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
           ) : (
             <Activity className="w-8 h-8 text-brand-purple/80 drop-shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
           )}
        </div>

        {/* Middle Tier (Large) */}
        {/* Left 2 - Indented ~13% more (from -2% to 11%) */}
        <div className="md:hidden absolute top-[11%] left-[11%] w-14 h-14 flex items-center justify-center animate-wander-3 delay-1000 opacity-[0.89]">
           {images?.hero_floating_3 ? (
             <img src={images.hero_floating_3} alt="Dynamic 3" className="w-full h-full object-contain" />
           ) : (
             <Wallet className="w-10 h-10 text-brand-purple/80" />
           )}
        </div>
        {/* Right 2 - Indented ~13% more (from -2% to 11%) */}
        <div className="md:hidden absolute top-[11%] right-[11%] w-14 h-14 flex items-center justify-center animate-wander-4 delay-2000 opacity-[0.89]">
           {images?.hero_floating_4 ? (
             <img src={images.hero_floating_4} alt="Dynamic 4" className="w-full h-full object-contain" />
           ) : (
             <ShieldCheck className="w-10 h-10 text-brand-cyan/80" />
           )}
        </div>

        {/* Bottom Tier */}
        {/* Left 3 */}
        <div className="md:hidden absolute bottom-[56%] left-[6%] w-8 h-8 flex items-center justify-center animate-wander-5 delay-700 opacity-[0.89]">
           {images?.hero_floating_5 ? (
             <img src={images.hero_floating_5} alt="Dynamic 5" className="w-full h-full object-contain" />
           ) : (
             <Coins className="w-6 h-6 text-brand-purple/80" />
           )}
        </div>
        {/* Right 3 */}
        <div className="md:hidden absolute bottom-[56%] right-[6%] w-8 h-8 flex items-center justify-center animate-wander-6 delay-1500 opacity-[0.89]">
           {images?.hero_floating_6 ? (
             <img src={images.hero_floating_6} alt="Dynamic 6" className="w-full h-full object-contain" />
           ) : (
             <Gem className="w-6 h-6 text-brand-cyan/80" />
           )}
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          <div className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-cyan/20 bg-brand-cyan/5 text-brand-cyan text-xs font-medium uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
            {t.hero.leading}
          </div>

          {/* Live Price Display */}
          {connected && price && (
            <div className="flex justify-center mb-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 font-mono text-sm font-bold backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                BTC: ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          )}
          
          <h1 className="text-4xl md:text-8xl font-black tracking-tighter leading-[1.1] mb-2">
            {t.hero.title_line1} <br />
            <span className="text-brand-cyan md:text-transparent md:bg-clip-text md:bg-gradient-to-r md:from-brand-cyan md:to-brand-purple">
              {t.hero.title_line2}
            </span>
          </h1>
          
          <p className="text-sm md:text-xl text-gray-400 max-w-2xl mx-auto px-4 leading-relaxed">
            {t.hero.subtitle}
          </p>



          {/* Stats Pill (Mobile Only) */}
          <div className="md:hidden mx-auto max-w-sm bg-white/5 backdrop-blur-md rounded-full border border-white/10 p-4 flex justify-between items-center px-6 mb-8">
             <div className="text-center">
               <div className="text-white font-bold text-sm">$30亿</div>
               <div className="text-[10px] text-gray-500">{t.hero.mobile_vol}</div>
             </div>
             <div className="w-px h-6 bg-white/10" />
             <div className="text-center">
               <div className="text-white font-bold text-sm">100+</div>
               <div className="text-[10px] text-gray-500">{t.hero.mobile_coins}</div>
             </div>
             <div className="w-px h-6 bg-white/10" />
             <div className="text-center">
               <div className="text-white font-bold text-sm">1000万</div>
               <div className="text-[10px] text-gray-500">{t.hero.mobile_users}</div>
             </div>
          </div>

          {/* CTA Button (Mobile) */}
          <div className="md:hidden w-full px-4 mb-2">
            <button 
              className="w-full py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-lg rounded-full shadow-[0_0_20px_rgba(0,255,204,0.2)] active:scale-95 transition-transform antialiased"
              style={{ textShadow: '0 0 12px rgba(255, 255, 255, 0.8)' }}
            >
              {t.hero.mobile_cta}
            </button>
          </div>

          {/* Desktop Search/Input Area */}
          <div className="hidden md:block max-w-md mx-auto relative group">
            <div className={`absolute -inset-1 bg-gradient-to-r from-brand-cyan to-brand-purple rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 ${isSuccess ? 'opacity-80' : ''}`}></div>
            <div className="relative flex items-center bg-black border border-white/10 rounded-full p-2 pl-6">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
                placeholder={t.hero.placeholder} 
                className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-gray-500"
                disabled={isSubmitting || isSuccess}
              />
              <button 
                onClick={handleRegister}
                disabled={isSubmitting || isSuccess}
                className={`px-6 py-3 rounded-full font-bold transition-all flex items-center gap-2 min-w-[140px] justify-center ${
                  isSuccess 
                    ? 'bg-green-500 text-white hover:bg-green-600' 
                    : 'bg-white text-black hover:bg-brand-cyan'
                }`}
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : isSuccess ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    {t.hero.sent}
                  </>
                ) : (
                  <>
                    {t.hero.cta}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Desktop Quick Stats */}
          <div className="hidden md:flex pt-12 justify-center gap-12 text-center">
            <div>
              <div className="text-3xl font-bold text-white">550+</div>
              <div className="text-sm text-gray-500 uppercase tracking-wide">{t.hero.stats_coins}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">100+</div>
              <div className="text-sm text-gray-500 uppercase tracking-wide">{t.hero.stats_countries}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">10M+</div>
              <div className="text-sm text-gray-500 uppercase tracking-wide">{t.hero.stats_users}</div>
            </div>
          </div>
        </div>
      </div>



      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" />
    </section>
  );
}
