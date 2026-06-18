import React from 'react';
import { CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';
import { TranslationSchema } from '../../translations';
import aboutMeeting from '../../assets/images/saudi_meeting_daylight_1781616906235.jpg';

interface AboutSectionProps {
  lang: 'ar' | 'en';
  currentTrans: TranslationSchema;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  lang,
  currentTrans,
}) => {
  return (
    <section 
      id="about" 
      data-section="about"
      className="relative z-20 py-16 sm:py-20 lg:py-28 bg-[#FFFFFF] border-y border-[#DCE5E0]/50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 xl:gap-16 items-center">
          
          {/* Text Column - Placed first so it renders on Right in RTL Arabic, Left in LTR English, and Top on mobile layout */}
          <div className="space-y-6 sm:space-y-8" id="about-text-column">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EEF4F0] border border-[#DCE5E0] text-[#07583F] text-xs font-bold rounded-lg uppercase tracking-wider self-start shadow-xs" id="about-badge-container">
              <span>{currentTrans.aboutSection.eyebrow}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#151B18] font-black leading-tight tracking-tight" id="about-title">
              {currentTrans.aboutSection.title}
            </h2>

            <div className="space-y-4 text-[#626B66] text-sm sm:text-base leading-relaxed font-normal" id="about-paragraphs">
              <p>{currentTrans.aboutSection.paragraphs[0]}</p>
              <p>{currentTrans.aboutSection.paragraphs[1]}</p>
            </div>

            {/* Bullet Checklist */}
            <div className="space-y-3 pt-1" id="about-bullets">
              {currentTrans.aboutSection.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3" id={`about-bullet-${idx}`}>
                  <div className="p-1 bg-[#EEF4F0] text-[#07583F] rounded-full mt-0.5 shrink-0" id={`about-bullet-icon-${idx}`}>
                    <CheckCircle2 className="w-3.5 h-3.5 font-bold" />
                  </div>
                  <span className="text-sm text-[#151B18] font-semibold leading-tight">{bullet}</span>
                </div>
              ))}
            </div>

            <div className="pt-2" id="about-cta-container">
              <a 
                href="#contact" 
                className="group inline-flex items-center justify-center gap-2.5 px-6 h-[48px] bg-[#07583F] hover:bg-[#064632] text-white rounded-lg text-xs sm:text-sm font-bold shadow-sm transition-all duration-300 focus:outline-none w-full sm:w-auto"
                id="about-cta-btn"
              >
                <span>{currentTrans.aboutSection.cta}</span>
                {lang === 'ar' ? (
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" id="about-arrow-rtl" />
                ) : (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" id="about-arrow-ltr" />
                )}
              </a>
            </div>
          </div>

          {/* Image Column - Placed second so it renders on Left in RTL Arabic, Right in LTR English, and Bottom on mobile layout */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-[#DCE5E0]/60 shadow-xs" id="about-image-column">
            <img 
              src={aboutMeeting} 
              alt={currentTrans.aboutSection.imageAlt} 
              className="w-full h-full object-cover object-center"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              id="about-meeting-img"
            />
          </div>

        </div>
      </div>
    </section>
  );
};
