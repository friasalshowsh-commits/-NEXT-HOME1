import React from 'react';
import { TranslationSchema } from '../../translations';
import { AnimatedTimeline } from '../interactive/AnimatedTimeline';

interface StrategyTimelineSectionProps {
  currentTrans: TranslationSchema;
  lang: 'ar' | 'en';
}

export const StrategyTimelineSection: React.FC<StrategyTimelineSectionProps> = ({
  currentTrans,
  lang,
}) => {
  return (
    <section 
      id="strategy" 
      data-section="strategy"
      className="relative z-20 py-16 sm:py-20 lg:py-28 bg-[#FFFFFF] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-20 space-y-3" id="strategy-header">
          <span className="text-xs font-bold tracking-[0.15em] text-[#07583F] uppercase block" id="strategy-badge">
            {currentTrans.howWeWork.sectionBadge}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#151B18] tracking-tight leading-tight font-black" id="strategy-title">
            {currentTrans.howWeWork.title}
          </h2>
        </div>

        <AnimatedTimeline currentTrans={currentTrans} lang={lang} />

      </div>
    </section>
  );
};
