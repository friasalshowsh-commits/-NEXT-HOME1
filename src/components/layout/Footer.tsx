import React from 'react';
import { TranslationSchema } from '../../translations';
import { companyLegalInfo } from '../../config/company';
import { Building2, ReceiptText } from 'lucide-react';

interface FooterProps {
  lang: 'ar' | 'en';
  currentTrans: TranslationSchema;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  currentTrans,
}) => {
  return (
    <footer id="footer-nav" className="relative z-20 bg-saudi-dark border-t border-saudi-dark/60 py-16 sm:py-24 text-white/70 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-16 items-start pb-16 border-b border-white/10 text-right rtl:text-right ltr:text-left" id="footer-grid">
          
          {/* Column 1: Corporate Profile */}
          <div className="space-y-4" id="footer-col-profile">
            <a href="#" className="flex flex-col select-none group focus:outline-none" id="footer-logo-anchor">
              <span className="text-xl tracking-normal text-white font-bold uppercase leading-none" id="footer-brand-title">
                NEXT HOME
              </span>
              <span className="text-xs tracking-wider text-saudi-sand mt-1 font-semibold" id="footer-brand-subtitle">
                نيكست هوم
              </span>
            </a>
            <p className="text-xs text-white/60 leading-relaxed font-normal max-w-xs" id="footer-tagline-text">
              {currentTrans.footer.tagline}
            </p>
          </div>

          {/* Column 2: Business areas / مجالات الأعمال */}
          <div className="space-y-4" id="footer-col-services">
            <h4 className="text-xs uppercase text-white font-bold tracking-wider select-none" id="footer-services-heading">
              {currentTrans.footer.businessAreasLabel}
            </h4>
            <ul className="space-y-2.5 text-xs text-white/50 font-normal" id="footer-services-list">
              <li>{currentTrans.howWeWork.steps[0].title}</li>
              <li>{currentTrans.howWeWork.steps[1].title}</li>
              <li>{currentTrans.howWeWork.steps[3].title}</li>
            </ul>
          </div>

          {/* Column 3: Dedicated Corporate Information Block */}
          <div className="space-y-4" id="footer-col-corporate-info">
            <h4 className="text-xs uppercase text-white font-bold tracking-wider select-none" id="footer-info-heading">
              {currentTrans.footer.corporateInfoLabel}
            </h4>
            <div className="space-y-3 font-sans" id="footer-info-details">
              <p className="text-xs text-white/60 font-normal tracking-wide leading-relaxed" id="footer-location-text">
                {currentTrans.footer.companyLocation}
              </p>
              {/* Integration of premium compact CR & VAT card tags inside column 3 */}
              <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2" id="footer-legal-container">
                
                {/* Commercial Registration Card */}
                <div 
                  className="group relative rounded-[18px] border border-white/10 bg-white/[0.045] p-1.5 sm:p-2 flex items-center justify-between gap-1 hover:bg-white/[0.07] hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300 select-all h-[76px] sm:h-[84px] md:h-[90px]" 
                  id="footer-cr-card"
                  dir={lang === 'ar' ? 'rtl' : 'ltr'}
                >
                  <div className="flex-1 min-w-0 flex flex-col justify-center" id="footer-cr-card-info">
                    <div className="flex items-center gap-1 flex-wrap" id="footer-cr-card-title-row">
                      <span className="text-[8px] sm:text-[9.5px] font-bold text-white/60 block tracking-tight sm:tracking-wide select-none">
                        {currentTrans.legalInfo.commercialRegistration}
                      </span>
                    </div>
                    <span 
                      dir="ltr"
                      className="block text-[12px] min-[350px]:text-[13px] sm:text-[15px] lg:text-[17px] font-black text-white mt-1 font-mono tracking-tight sm:tracking-normal select-all rtl:text-right ltr:text-left whitespace-nowrap max-[350px]:whitespace-normal max-[350px]:break-all"
                      style={{ fontVariantNumeric: 'tabular-nums' }}
                    >
                      {companyLegalInfo.commercialRegistration}
                    </span>
                  </div>
                  {/* Premium Seal/Stamp graphic in place of plain lucide icon */}
                  <div className="shrink-0 scale-90 sm:scale-100" id="footer-cr-card-badge">
                    <svg viewBox="0 0 40 40" className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] shrink-0 opacity-90 select-none">
                      <defs>
                        <radialGradient id="saudiBadgeGrad" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#086e4e" />
                          <stop offset="100%" stopColor="#04412e" />
                        </radialGradient>
                      </defs>
                      <rect x="2" y="2" width="36" height="36" rx="10" fill="url(#saudiBadgeGrad)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                      {/* Palm tree */}
                      <path d="M20,11 L20,24" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M20,11 C18,9 14,10 13,12" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
                      <path d="M20,11 C22,9 26,10 27,12" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
                      <path d="M20,13 C17,12 15,13 14,15" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
                      <path d="M20,13 C23,12 25,13 26,15" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
                      {/* Crossed swords */}
                      <path d="M15,27 L25,22" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
                      <path d="M25,27 L15,22" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
                      <circle cx="15.5" cy="26.5" r="0.8" fill="#ffffff" />
                      <circle cx="24.5" cy="26.5" r="0.8" fill="#ffffff" />
                    </svg>
                  </div>
                </div>

                {/* VAT Tax Registration Card */}
                <div 
                  className="group relative rounded-[18px] border border-white/10 bg-white/[0.045] p-1.5 sm:p-2 flex items-center justify-between gap-1 hover:bg-white/[0.07] hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300 select-all h-[76px] sm:h-[84px] md:h-[90px]" 
                  id="footer-vat-card"
                  dir={lang === 'ar' ? 'rtl' : 'ltr'}
                >
                  <div className="flex-1 min-w-0 flex flex-col justify-center" id="footer-vat-card-info">
                    <div className="flex items-center gap-1 flex-wrap" id="footer-vat-card-title-row">
                      <span className="text-[8px] sm:text-[9.5px] font-bold text-white/60 block tracking-tight sm:tracking-wide select-none">
                        {currentTrans.legalInfo.vatNumber}
                      </span>
                    </div>
                    <span 
                      dir="ltr"
                      className="block text-[12px] min-[350px]:text-[13px] sm:text-[15px] lg:text-[17px] font-black text-white mt-1 font-mono tracking-tight sm:tracking-normal select-all rtl:text-right ltr:text-left whitespace-nowrap max-[350px]:whitespace-normal max-[350px]:break-all"
                      style={{ fontVariantNumeric: 'tabular-nums' }}
                    >
                      {companyLegalInfo.vatNumber}
                    </span>
                  </div>
                  {/* Premium secure shield tech badge */}
                  <div className="shrink-0 scale-90 sm:scale-100" id="footer-vat-card-badge">
                    <svg viewBox="0 0 40 40" className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] shrink-0 opacity-90 select-none">
                      <defs>
                        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#7EB39E" stopOpacity="0.8" />
                          <stop offset="50%" stopColor="#07583F" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#032016" stopOpacity="0.9" />
                        </linearGradient>
                        <linearGradient id="linesGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#a3e2cb" />
                          <stop offset="100%" stopColor="#7EB39E" />
                        </linearGradient>
                      </defs>
                      <path 
                        d="M20,4 C28,4 34,7 34,13 C34,22 28,31 20,36 C12,31 6,22 6,13 C6,7 12,4 20,4 Z" 
                        fill="url(#shieldGrad)" 
                        stroke="rgba(126, 179, 158, 0.3)" 
                        strokeWidth="1.5"
                      />
                      <path d="M11,12 L29,12" stroke="url(#linesGrad)" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="1 3" />
                      <path d="M9,16 L31,16" stroke="url(#linesGrad)" strokeWidth="1.2" strokeLinecap="round" />
                      <path d="M8,20 L32,20" stroke="url(#linesGrad)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 2" />
                      <path d="M9,24 L31,24" stroke="url(#linesGrad)" strokeWidth="1.2" strokeLinecap="round" />
                      <path d="M12,28 L28,28" stroke="url(#linesGrad)" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Column 4: Communication / الاتصالات التنفيذية */}
          <div className="space-y-4" id="footer-col-contact">
            <h4 className="text-xs uppercase text-white font-bold tracking-wider select-none" id="footer-comm-heading">
              {currentTrans.footer.communicationLabel}
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-white/50" id="footer-comm-list">
              <li>
                <a 
                  href="mailto:info@nexthome-group.com" 
                  className="hover:text-white transition-colors duration-200"
                  id="footer-email-link"
                >
                  info@nexthome-group.com
                </a>
              </li>
              <li dir="ltr" className="rtl:text-right ltr:text-left">
                <a 
                  href="tel:+966506612761" 
                  className="hover:text-white transition-colors duration-200"
                  id="footer-phone-link"
                >
                  +966 50 661 2761
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Sub Footer with Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] tracking-wider text-white/40 font-semibold uppercase text-center sm:text-start" id="footer-legal-bar">
          <span className="font-semibold" id="footer-copyright-text">{currentTrans.footer.allRightsReserved}</span>
          <div className="flex items-center gap-6" id="footer-legal-links">
            <span className="hover:text-white cursor-pointer transition-colors duration-200" id="footer-legal-anchor">
              {currentTrans.footer.legalLink}
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
