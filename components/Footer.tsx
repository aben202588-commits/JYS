'use client';

import { Shield, Lock, Headphones, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/5 bg-[#050505] pt-20 pb-10">
      <div className="container mx-auto px-6">
        
        {/* Trust Section */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold mb-4">{t.footer.trust_title}</h2>
          <p className="text-gray-400 mb-12">{t.footer.trust_desc}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 rounded-2xl bg-[#111] border border-white/5 hover:border-brand-cyan/30 hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-brand-cyan/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-brand-cyan" />
              </div>
              <div className="text-4xl font-black text-white/10 mb-4 group-hover:text-brand-cyan/10 transition-colors">01</div>
              <h3 className="text-lg font-bold mb-2">{t.footer.trust_1_title}</h3>
              <p className="text-sm text-gray-500">{t.footer.trust_1_desc}</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-[#111] border border-white/5 hover:border-brand-purple/30 hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lock className="w-6 h-6 text-brand-purple" />
              </div>
              <div className="text-4xl font-black text-white/10 mb-4 group-hover:text-brand-purple/10 transition-colors">02</div>
              <h3 className="text-lg font-bold mb-2">{t.footer.trust_2_title}</h3>
              <p className="text-sm text-gray-500">{t.footer.trust_2_desc}</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#111] border border-white/5 hover:border-green-500/30 hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Headphones className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-4xl font-black text-white/10 mb-4 group-hover:text-green-500/10 transition-colors">03</div>
              <h3 className="text-lg font-bold mb-2">{t.footer.trust_3_title}</h3>
              <p className="text-sm text-gray-500">{t.footer.trust_3_desc}</p>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/5 pt-12">
          <div>
            <h4 className="font-bold mb-6">{t.footer.about}</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-brand-cyan">{t.footer.links.about}</a></li>
              <li><a href="#" className="hover:text-brand-cyan">{t.footer.links.careers}</a></li>
              <li><a href="#" className="hover:text-brand-cyan">{t.footer.links.contacts}</a></li>
              <li><a href="#" className="hover:text-brand-cyan">{t.footer.links.community}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">{t.footer.products}</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-brand-cyan">{t.footer.links.exchange}</a></li>
              <li><a href="#" className="hover:text-brand-cyan">{t.footer.links.academy}</a></li>
              <li><a href="#" className="hover:text-brand-cyan">{t.footer.links.wallet}</a></li>
              <li><a href="#" className="hover:text-brand-cyan">{t.footer.links.card}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">{t.footer.support}</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-brand-cyan">{t.footer.links.help}</a></li>
              <li><a href="#" className="hover:text-brand-cyan">{t.footer.links.request}</a></li>
              <li><a href="#" className="hover:text-brand-cyan">{t.footer.links.fees}</a></li>
              <li><a href="#" className="hover:text-brand-cyan">{t.footer.links.security}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">{t.footer.community}</h4>
            <div className="flex gap-4">
               <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-cyan hover:text-black transition-all">
                 <Twitter className="w-5 h-5" />
               </a>
               <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-cyan hover:text-black transition-all">
                 <Facebook className="w-5 h-5" />
               </a>
               <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-cyan hover:text-black transition-all">
                 <Instagram className="w-5 h-5" />
               </a>
               <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-cyan hover:text-black transition-all">
                 <Linkedin className="w-5 h-5" />
               </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 text-center text-xs text-gray-600">
          {t.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
