import React from 'react';
import { CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';
import { TranslationSchema } from '../../translations';
import { SaudiCoverageMap } from '../SaudiCoverageMap';

import riyadhFootprint from '../../assets/images/riyadh_saudi_vertical_1780862353837.png';
import jeddahFootprint from '../../assets/images/jeddah_saudi_vertical_1780862368910.png';
import dammamFootprint from '../../assets/images/dammam_saudi_vertical_1780862382331.png';
import khobarFootprint from '../../assets/images/khobar_saudi_vertical_1780862398190.png';

interface MarketFootprintSectionProps {
  lang: 'ar' | 'en';
  currentTrans: TranslationSchema;
}

export const MarketFootprintSection: React.FC<MarketFootprintSectionProps> = ({
  lang,
  currentTrans,
}) => {
  return (
    <section 
      id="footprint" 
      data-section="market-footprint"
      className="relative z-20 py-16 sm:py-20 lg:py-28 bg-[#F7F8F5] border-t border-b border-[#DCE5E0]/50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          
          {/* Text and Strategic Map Column (Left) */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8" id="footprint-text-col">
            <div className="space-y-3 sm:space-y-4" id="footprint-titles-box">
              <span className="text-xs font-bold tracking-[0.15em] text-[#07583F] uppercase block" id="footprint-badge">
                {currentTrans.expansion.sectionBadge}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#151B18] tracking-tight leading-tight font-black" id="footprint-headline">
                {currentTrans.expansion.title}
              </h2>
              <div className="h-[2px] w-12 bg-[#07583F]/35" id="footprint-decor-line" />
            </div>
            
            <p className="text-[#626B66] text-sm sm:text-base leading-relaxed font-normal" id="footprint-intro">
              {currentTrans.expansion.paragraph}
            </p>

            {/* Precise honest bullets - headquarters & access indicators */}
            <div className="space-y-3 pt-2" id="footprint-bullet-list">
              {currentTrans.expansion.bullets.map((bullet, idx) => (
                <div key={idx} className="flex gap-3 text-right rtl:text-right ltr:text-left" id={`footprint-bullet-${idx}`}>
                  <div className="p-1 bg-[#EEF4F0] text-[#07583F] rounded-full mt-0.5 shrink-0 self-start" id={`footprint-bullet-icon-${idx}`}>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="space-y-0.5" id={`footprint-bullet-text-${idx}`}>
                    <h4 className="text-sm font-bold text-[#151B18] leading-snug">{bullet.title}</h4>
                    <p className="text-xs text-[#626B66] leading-relaxed font-normal">{bullet.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed high-fidelity interactive SVG Saudi Arabia map */}
            <div className="pt-4 flex justify-center lg:justify-start mx-auto w-full max-w-[280px] sm:max-w-[420px] lg:max-w-[520px]" id="footprint-map-container">
              <SaudiCoverageMap 
                lang={lang} 
                mapAriaLabel={currentTrans.expansion.mapAriaLabel} 
                mapCaption={currentTrans.expansion.mapCaption} 
                currentTrans={currentTrans}
              />
            </div>

            <div className="pt-2 flex justify-center lg:justify-start" id="footprint-cta-wrapper">
              <a 
                href="#contact" 
                className="group inline-flex items-center justify-center gap-2.5 px-6 h-[46px] bg-transparent border border-[#07583F] hover:bg-[#07583F] text-[#07583F] hover:text-white rounded-lg text-xs font-bold transition-all duration-300 w-full sm:w-auto"
                id="footprint-cta-btn"
              >
                <span>{currentTrans.expansion.cta}</span>
                {lang === 'ar' ? (
                  <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" id="footprint-arrow-rtl" />
                ) : (
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" id="footprint-arrow-ltr" />
                )}
              </a>
            </div>
          </div>

          {/* Modern Daylight 2x2 cities network grid - Riyadh is larger */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-3 sm:gap-4" id="footprint-grid-col">
            
            {/* Card - Riyadh (Headquarters, wider + higher prominence) */}
            <div className="col-span-2 relative overflow-hidden h-[190px] sm:h-[240px] md:h-[280px] rounded-xl border border-[#DCE5E0]/60 hover:border-[#07583F]/35 group shadow-xs transform md:hover:translate-y-[-3px] transition-all duration-300" id="footprint-card-riyadh">
              <img 
                src={riyadhFootprint} 
                loading="lazy"
                decoding="async"
                alt="Riyadh HQ next home" 
                className="w-full h-full object-cover transform md:group-hover:scale-[1.025] transition-transform duration-700 brightness-95"
                referrerPolicy="no-referrer"
                id="footprint-img-riyadh"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151B18]/90 via-[#151B18]/30 to-transparent" id="footprint-gradient-riyadh" />
              
              {/* HEADQUARTERS BADGE on Riyadh ONLY */}
              <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-20" id="footprint-badge-riyadh">
                <span className="inline-flex px-3 py-1 bg-[#EEF4F0] border border-[#07583F]/25 rounded-md text-[10px] font-bold text-[#07583F] uppercase tracking-wider backdrop-blur-xs shadow-xs">
                  {currentTrans.expansion.hqBadge}
                </span>
              </div>

              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-right rtl:text-right ltr:text-left transform md:group-hover:translate-y-0 md:translate-y-[2px] transition-transform duration-300" id="footprint-caption-riyadh">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#EEF4F0] block mb-1">
                  {currentTrans.expansion.cities.riyadhCountry}
                </span>
                <h4 className="text-lg sm:text-xl text-[#FFFFFF] font-extrabold">{currentTrans.expansion.cities.riyadh}</h4>
                <p className="text-[11px] sm:text-xs text-[#FFFFFF]/80 font-normal mt-1 leading-relaxed">
                  {currentTrans.expansion.cities.riyadhSub}
                </p>
              </div>
            </div>

            {/* Card - Jeddah */}
            <div className="col-span-1 relative overflow-hidden h-[140px] sm:h-[180px] md:h-[210px] rounded-xl border border-[#DCE5E0]/60 hover:border-[#07583F]/35 group shadow-xs transform md:hover:translate-y-[-3px] transition-all duration-300" id="footprint-card-jeddah">
              <img 
                src={jeddahFootprint} 
                loading="lazy"
                decoding="async"
                alt="Jeddah access region" 
                className="w-full h-full object-cover transform md:group-hover:scale-[1.025] transition-transform duration-700 brightness-95"
                referrerPolicy="no-referrer"
                id="footprint-img-jeddah"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151B18]/90 via-[#151B18]/30 to-transparent" id="footprint-gradient-jeddah" />
              <div className="absolute bottom-4 left-4 right-4 text-right rtl:text-right ltr:text-left transform md:group-hover:translate-y-0 md:translate-y-[2px] transition-transform duration-300" id="footprint-caption-jeddah">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#FFFFFF]/60 block mb-1">
                  {currentTrans.expansion.cities.jeddahCountry}
                </span>
                <h4 className="text-base sm:text-lg text-[#FFFFFF] font-bold">{currentTrans.expansion.cities.jeddah}</h4>
                <p className="text-[10px] text-[#FFFFFF]/80 font-normal mt-0.5 leading-tight truncate">
                  {currentTrans.expansion.cities.jeddahSub}
                </p>
              </div>
            </div>

            {/* Card - Dammam */}
            <div className="col-span-1 relative overflow-hidden h-[140px] sm:h-[180px] md:h-[210px] rounded-xl border border-[#DCE5E0]/60 hover:border-[#07583F]/35 group shadow-xs transform md:hover:translate-y-[-3px] transition-all duration-300" id="footprint-card-dammam">
              <img 
                src={dammamFootprint} 
                loading="lazy"
                decoding="async"
                alt="Dammam access region" 
                className="w-full h-full object-cover transform md:group-hover:scale-[1.025] transition-transform duration-700 brightness-95"
                referrerPolicy="no-referrer"
                id="footprint-img-dammam"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151B18]/90 via-[#151B18]/30 to-transparent" id="footprint-gradient-dammam" />
              <div className="absolute bottom-4 left-4 right-4 text-right rtl:text-right ltr:text-left transform md:group-hover:translate-y-0 md:translate-y-[2px] transition-transform duration-300" id="footprint-caption-dammam">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#FFFFFF]/60 block mb-1">
                  {currentTrans.expansion.cities.dammamCountry}
                </span>
                <h4 className="text-base sm:text-lg text-[#FFFFFF] font-bold">{currentTrans.expansion.cities.dammam}</h4>
                <p className="text-[10px] text-[#FFFFFF]/80 font-normal mt-0.5 leading-tight truncate">
                  {currentTrans.expansion.cities.dammamSub}
                </p>
              </div>
            </div>

            {/* Card - Al Khobar */}
            <div className="col-span-2 md:col-span-1 relative overflow-hidden h-[140px] sm:h-[180px] md:h-[210px] rounded-xl border border-[#DCE5E0]/60 hover:border-[#07583F]/35 group shadow-xs transform md:hover:translate-y-[-3px] transition-all duration-300" id="footprint-card-khobar">
              <img 
                src={khobarFootprint} 
                loading="lazy"
                decoding="async"
                alt="Al Khobar access region" 
                className="w-full h-full object-cover transform md:group-hover:scale-[1.025] transition-transform duration-700 brightness-95"
                referrerPolicy="no-referrer"
                id="footprint-img-khobar"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151B18]/90 via-[#151B18]/30 to-transparent" id="footprint-gradient-khobar" />
              <div className="absolute bottom-4 left-4 right-4 text-right rtl:text-right ltr:text-left transform md:group-hover:translate-y-0 md:translate-y-[2px] transition-transform duration-300" id="footprint-caption-khobar">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#FFFFFF]/60 block mb-1">
                  {currentTrans.expansion.cities.khobarCountry}
                </span>
                <h4 className="text-base sm:text-lg text-[#FFFFFF] font-bold">{currentTrans.expansion.cities.khobar}</h4>
                <p className="text-[10px] text-[#FFFFFF]/80 font-normal mt-0.5 leading-tight truncate">
                  {currentTrans.expansion.cities.khobarSub}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
