import React from 'react';
import { TranslationSchema } from '../../translations';

interface StrategicQuoteSectionProps {
  currentTrans: TranslationSchema;
}

export const StrategicQuoteSection: React.FC<StrategicQuoteSectionProps> = ({
  currentTrans,
}) => {
  return (
    <section 
      data-section="strategic-quote"
      className="relative z-20 py-12 sm:py-16 bg-[#064632] overflow-hidden"
    >
      {/* Subtle executive geometric/pattern overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.04]" id="quote-pattern-bg">
        <div className="w-full h-full bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center space-y-4 sm:space-y-6" id="quote-content-container">
        <p className="text-lg sm:text-xl md:text-2xl lg:text-[28px] text-[#FFFFFF] font-medium leading-relaxed max-w-3xl" id="quote-text">
          {currentTrans.quote.text}
        </p>
        
        <div className="space-y-3 sm:space-y-4" id="quote-meta">
          <p className="text-[10px] sm:text-xs font-bold tracking-widest text-[#EEF4F0]/65 uppercase" id="quote-author">
            {currentTrans.quote.author}
          </p>
          
          <div className="pt-1" id="quote-cta-wrapper">
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center px-6 h-[44px] bg-[#FFFFFF] hover:bg-[#EEF4F0] text-[#064632] rounded-lg text-xs font-bold transition-all duration-300 w-full sm:w-auto"
              id="quote-cta-btn"
            >
              <span>{currentTrans.quote.cta}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
