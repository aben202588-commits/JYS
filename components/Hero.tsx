'use client';

import { ArrowRight, Bitcoin, Activity, CheckCircle2, ArrowUpFromLine, ArrowDownToLine, ShieldCheck, BookUser, Wallet, Coins, Gem } from 'lucide-react';
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

  const quickActions = [
    { name: t.hero.quick_withdraw, icon: ArrowUpFromLine },
    { name: t.hero.quick_deposit, icon: ArrowDownToLine },
    { name: t.hero.quick_security, icon: ShieldCheck },
    { name: t.hero.quick_address, icon: BookUser },
    { name: t.hero.quick_portfolio, icon: Wallet },
  ];

  return (
    <section className="flex flex-col min-h-screen bg-[#050505] overflow-x-hidden">
      {/* Upper Area: Video + Content */}
      <div className="relative w-full rounded-b-[2.5rem] overflow-hidden md:min-h-[800px] flex flex-col justify-center">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          
          {/* Top Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-cyan/10 blur-[120px] rounded-full" />
          
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-20 bg-center pointer-events-none mix-blend-overlay"
            style={{ 
              backgroundImage: images?.hero_bg ? `url('${images.hero_bg}')` : "url('/grid.svg')",
              backgroundSize: images?.hero_bg ? 'cover' : 'auto'
            }}
          />
          
          {/* Mobile Digital Waves */}
          <div className="absolute top-1/3 left-0 right-0 h-64 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-blue-900/20 blur-3xl md:hidden" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center pt-28 md:pt-32 pb-12 md:pb-0">
        {/* PC Floating Elements - Symmetrical Layout */}
        
        {/* Top Tier (Standard Size) */}
        {/* Left 1 */}
        <div 
          className="hidden md:flex absolute top-[10%] left-[15%] w-16 h-16 items-center justify-center animate-bounce duration-[3000ms]"
          style={{ transform: `translate(${mousePos.x * -1}px, ${mousePos.y * -1}px)` }}
        >
          {images?.hero_floating_1 ? (
            <img src={images.hero_floating_1} alt="Dynamic 1" className="w-10 h-10 object-contain" />
          ) : (
            <Bitcoin className="w-8 h-8 text-brand-cyan" />
          )}
        </div>
        {/* Right 1 */}
        <div 
          className="hidden md:flex absolute top-[10%] right-[15%] w-20 h-20 items-center justify-center animate-bounce duration-[4000ms] delay-500"
          style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
        >
          {images?.hero_floating_2 ? (
            <img src={images.hero_floating_2} alt="Dynamic 2" className="w-12 h-12 object-contain" />
          ) : (
            <Activity className="w-10 h-10 text-brand-purple" />
          )}
        </div>

        {/* Middle Tier (Double Size) - Main Anchors */}
        {/* Left 2 */}
        <div 
          className="hidden md:flex absolute top-[40%] left-[5%] w-32 h-32 items-center justify-center animate-bounce duration-[5000ms] delay-1000"
          style={{ transform: `translate(${mousePos.x * 1.5}px, ${mousePos.y * -1.5}px)` }}
        >
          {images?.hero_floating_3 ? (
            <img src={images.hero_floating_3} alt="Dynamic 3" className="w-20 h-20 object-contain" />
          ) : (
            <Wallet className="w-16 h-16 text-brand-purple" />
          )}
        </div>
        {/* Right 2 */}
        <div 
          className="hidden md:flex absolute top-[40%] right-[5%] w-32 h-32 items-center justify-center animate-bounce duration-[6000ms] delay-2000"
          style={{ transform: `translate(${mousePos.x * -1.5}px, ${mousePos.y * 1.5}px)` }}
        >
          {images?.hero_floating_4 ? (
            <img src={images.hero_floating_4} alt="Dynamic 4" className="w-20 h-20 object-contain" />
          ) : (
            <ShieldCheck className="w-16 h-16 text-brand-cyan" />
          )}
        </div>

        {/* Bottom Tier (Standard Size) */}
        {/* Left 3 */}
        <div 
          className="hidden md:flex absolute bottom-[20%] left-[15%] w-16 h-16 items-center justify-center animate-bounce duration-[3500ms] delay-700"
          style={{ transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * 0.5}px)` }}
        >
          {images?.hero_floating_5 ? (
            <img src={images.hero_floating_5} alt="Dynamic 5" className="w-10 h-10 object-contain" />
          ) : (
            <Coins className="w-8 h-8 text-brand-purple" />
          )}
        </div>
        {/* Right 3 */}
        <div 
          className="hidden md:flex absolute bottom-[20%] right-[15%] w-16 h-16 items-center justify-center animate-bounce duration-[4500ms] delay-1500"
          style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * -0.5}px)` }}
        >
          {images?.hero_floating_6 ? (
            <img src={images.hero_floating_6} alt="Dynamic 6" className="w-10 h-10 object-contain" />
          ) : (
            <Gem className="w-8 h-8 text-brand-cyan" />
          )}
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
        <div className="max-w-4xl mx-auto space-y-8 md:space-y-10">
          <div className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-cyan/20 bg-brand-cyan/5 text-brand-cyan text-xs font-medium uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
            {t.hero.leading}
          </div>

          {/* Live Price Display */}
          {connected && price && (
            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 font-mono text-sm font-bold backdrop-blur-sm -translate-y-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                BTC: ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          )}
          
          <h1 className="text-4xl md:text-8xl font-black tracking-tighter leading-[1.2] md:leading-[1.1] mb-6">
            {t.hero.title_line1} <br />
            <span className="inline-block mt-[0.2em] text-brand-cyan md:text-transparent md:bg-clip-text md:bg-gradient-to-r md:from-brand-cyan md:to-brand-purple">
              {t.hero.title_line2}
            </span>
          </h1>
          
          <p className="text-sm md:text-xl text-gray-400 max-w-2xl mx-auto px-4 leading-relaxed mb-4">
            {t.hero.subtitle}
          </p>



          {/* Stats Pill (Mobile Only) */}
          <div className="md:hidden mx-auto max-w-sm bg-white/5 backdrop-blur-md rounded-full border border-white/10 p-4 flex justify-between items-center px-6 mb-10">
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
          <div className="md:hidden w-full px-4 mb-6">
            <button className="w-full py-4 bg-brand-cyan text-black font-black text-lg rounded-full shadow-[0_0_20px_rgba(0,255,204,0.4)] active:scale-95 transition-transform">
              {t.hero.mobile_cta}
            </button>
          </div>

          {/* Quick Actions (Mobile) - Black Mask Area */}
          <div className="md:hidden w-full px-4">
            <div className="w-full bg-black/90 backdrop-blur-md rounded-2xl p-4 border border-white/5">
              <div className="grid grid-cols-5 gap-2">
                {quickActions.map((action) => (
                  <div key={action.name} className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5">
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[10px] text-white font-medium">{action.name}</span>
                  </div>
                ))}
              </div>
            </div>
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

      </div>
      
      {/* Bottom Fade (Hidden on mobile to show sharp contrast) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none hidden md:block" />
    </section>
  );
}
