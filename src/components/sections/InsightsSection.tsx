import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, BookOpen, X, ArrowUpRight } from 'lucide-react';
import { TranslationSchema } from '../../translations';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { SectionTitleReveal } from '../interactive/SectionTitleReveal';

interface InsightsSectionProps {
  lang: 'ar' | 'en';
  currentTrans: TranslationSchema;
  activeArticleIdx: number | null;
  setActiveArticleIdx: (idx: number | null) => void;
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({
  lang,
  currentTrans,
  activeArticleIdx,
  setActiveArticleIdx,
}) => {
  // Lock scroll when modal is active
  useBodyScrollLock(activeArticleIdx !== null);

  return (
    <>
      {/* 8B. EXECUTIVE ARTICLES & BRIEFINGS NEWS FLASH (Insights) */}
      <section 
        id="insights" 
        data-section="insights"
        className="relative z-20 py-16 sm:py-20 lg:py-28 bg-bg-alt border-t border-border-light overflow-hidden" 
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 sm:mb-16 gap-4 sm:gap-6" id="insights-header">
            <div>
              <span className="text-xs font-bold tracking-[0.15em] text-saudi uppercase block mb-2 sm:mb-3" id="insights-badge">
                {currentTrans.insightsSec.tagline}
              </span>
              <SectionTitleReveal 
                text={currentTrans.insightsSec.title} 
                variant="lines" 
                className="text-2xl sm:text-3xl lg:text-4xl text-text-primary tracking-tight font-extrabold" 
                id="insights-title" 
              />
            </div>
            <p className="text-text-secondary text-sm max-w-md font-normal leading-relaxed" id="insights-desc">
              {currentTrans.insightsSec.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8" id="insights-grid">
            {currentTrans.insightsSec.items.map((item, idx) => (
              <div 
                key={idx} 
                className="relative p-6 sm:p-10 bg-white border border-border-light hover:border-saudi/30 transition-all duration-500 rounded-2xl flex flex-col justify-between group overflow-hidden cursor-pointer shadow-sm hover:shadow-md select-none"
                onClick={() => setActiveArticleIdx(idx)}
                id={`insight-card-${idx}`}
              >
                {/* Card Header with tag and reading time */}
                <div className="flex items-center justify-between text-xs mb-6 sm:mb-8" id={`insight-meta-${idx}`}>
                  <span className="text-xs font-bold tracking-wider text-saudi uppercase" id={`insight-tag-${idx}`}>
                    {item.tag}
                  </span>
                  <div className="flex items-center gap-1.5 text-text-secondary font-sans text-[11px] font-semibold" id={`insight-readtime-box-${idx}`}>
                    <Clock className="w-3.5 h-3.5 text-saudi" />
                    <span>{item.readTime}</span>
                  </div>
                </div>

                {/* Card Body - centered title and excerpt */}
                <div className="flex flex-col items-center justify-center text-center my-4 sm:my-6 flex-grow pb-4" id={`insight-body-${idx}`}>
                  <h3 className="text-lg sm:text-xl md:text-2xl text-text-primary font-bold mb-3 leading-snug group-hover:text-saudi transition-colors duration-300" id={`insight-title-${idx}`}>
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-sm font-normal leading-relaxed max-w-xl" id={`insight-excerpt-${idx}`}>
                    {item.excerpt}
                  </p>
                </div>

                {/* Card Footer with link and date */}
                <div className="flex items-center justify-between text-xs mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border-light" id={`insight-footer-${idx}`}>
                  <button 
                    className="flex items-center gap-1 text-saudi hover:text-saudi-dark font-bold text-[11px] uppercase tracking-wider group-hover:underline cursor-pointer select-none focus:outline-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveArticleIdx(idx);
                    }}
                    id={`insight-btn-${idx}`}
                  >
                    <span>{currentTrans.insightsSec.readMore}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-saudi" />
                  </button>
                  <span className="text-text-secondary/70 font-sans text-[11px] font-semibold uppercase font-mono" id={`insight-date-${idx}`}>
                    {item.date}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ARTICLE MODAL / OVERLAY */}
      <AnimatePresence>
        {activeArticleIdx !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-text-primary/65 backdrop-blur-md"
            onClick={() => setActiveArticleIdx(null)}
            id="insight-modal-overlay"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-4xl bg-white border border-border-light p-5 sm:p-8 md:p-12 my-8 rounded-2xl sm:rounded-3xl shadow-2xl overflow-y-auto max-h-[90dvh] cursor-default text-text-primary"
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
              onClick={(e) => e.stopPropagation()}
              id="insight-modal-container"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-border-light pb-4 sm:pb-6 mb-6 sm:mb-10 sticky top-0 bg-white z-10" id="insight-modal-header">
                {/* BookOpen icon and Category Tag */}
                <div className="flex items-center gap-2.5 text-saudi" id="insight-modal-category">
                  <BookOpen className="w-5 h-5 shrink-0" />
                  <span className="text-sm font-bold tracking-wide">
                    {currentTrans.insightsSec.items[activeArticleIdx].tag}
                  </span>
                </div>

                {/* Close button */}
                <button 
                  onClick={() => setActiveArticleIdx(null)}
                  className="flex items-center gap-1.5 text-text-secondary hover:text-saudi text-xs sm:text-sm font-semibold transition-colors duration-300 cursor-pointer focus:outline-none min-h-[40px] px-2"
                  id="insight-modal-close"
                >
                  <X className="w-4 h-4 shrink-0" />
                  <span>{currentTrans.insightsSec.closeLabel}</span>
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex flex-col items-center" id="insight-modal-body">
                {/* Date & Reading time info */}
                <div className="flex items-center gap-2 text-text-secondary text-xs sm:text-sm font-mono tracking-wider mb-4 sm:mb-6 font-semibold" id="insight-modal-meta">
                  <span>{currentTrans.insightsSec.items[activeArticleIdx].date}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-saudi shrink-0" />
                    <span>{currentTrans.insightsSec.items[activeArticleIdx].readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl md:text-3xl text-text-primary font-extrabold text-center leading-tight max-w-3xl" id="insight-modal-title">
                  {currentTrans.insightsSec.items[activeArticleIdx].title}
                </h2>

                {/* Thin horizontal green line */}
                <div className="w-20 sm:w-24 h-[2px] bg-saudi my-6 sm:my-8" id="insight-modal-decor" />

                {/* Paragraphs content - cleanly aligned depending on active language direction */}
                <div className="space-y-4 sm:space-y-6 text-text-secondary text-sm sm:text-base max-w-3xl mx-auto leading-relaxed font-normal" id="insight-modal-paragraphs">
                  {currentTrans.insightsSec.items[activeArticleIdx].paragraphs.map((para, pIdx) => (
                    <p 
                      key={pIdx} 
                      className="leading-relaxed whitespace-pre-line text-right rtl:text-right ltr:text-left"
                      id={`insight-modal-para-${pIdx}`}
                    >
                      {para}
                    </p>
                  ))}
                </div>

                {/* Related service crawlable link */}
                <div className="mt-8 pt-6 border-t border-border-light/65 w-full max-w-3xl flex justify-center" id="insight-modal-related-link">
                  <a
                    href={
                      activeArticleIdx === 0
                        ? (lang === 'ar' ? '/services/saudi-market-entry' : '/en/services/saudi-market-entry')
                        : (lang === 'ar' ? '/services/strategic-partnerships' : '/en/services/strategic-partnerships')
                    }
                    className="text-xs sm:text-sm font-bold text-saudi hover:text-saudi-dark transition-colors inline-flex items-center gap-1 hover:underline cursor-pointer"
                    id="insight-related-service-anchor"
                  >
                    <span>
                      {activeArticleIdx === 0
                        ? (lang === 'ar' ? 'اقرأ المزيد حول خدمات دخول السوق السعودي ←' : 'Read more about our Saudi Market Entry services ←')
                        : (lang === 'ar' ? 'اقرأ المزيد حول خدمات الشراكات الاستراتيجية ←' : 'Read more about our Strategic Partnerships services ←')}
                    </span>
                  </a>
                </div>

                {/* Footnote signature */}
                <span className="text-text-secondary/70 text-xs sm:text-sm italic block text-center mt-10 sm:mt-12 font-semibold border-t border-border-light/65 pt-4 w-full" id="insight-modal-footnote">
                  {currentTrans.insightsSec.signature}
                </span>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
