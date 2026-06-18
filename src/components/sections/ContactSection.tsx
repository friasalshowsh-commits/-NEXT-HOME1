import React, { ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Send, Building } from 'lucide-react';
import { TranslationSchema } from '../../translations';

interface ContactSectionProps {
  lang: 'ar' | 'en';
  currentTrans: TranslationSchema;
  formData: {
    fullName: string;
    company: string;
    email: string;
    phone: string;
    message: string;
  };
  formSubmitted: boolean;
  setFormSubmitted: (submitted: boolean) => void;
  isSubmitting: boolean;
  submitError: string | null;
  handleFormChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  submitContactForm: (e: FormEvent) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  lang,
  currentTrans,
  formData,
  formSubmitted,
  setFormSubmitted,
  isSubmitting,
  submitError,
  handleFormChange,
  submitContactForm,
}) => {
  return (
    <section 
      id="contact" 
      data-section="contact"
      className="relative z-20 py-16 sm:py-20 lg:py-28 bg-white overflow-hidden border-t border-border-light"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 xl:gap-24 items-start">
          
          {/* Left Column: Premium Executive inquiry Form (takes 6 cols) */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8" id="contact-form-col">
            
            <div className="text-right rtl:text-right ltr:text-left" id="contact-header">
              <span className="text-xs font-bold tracking-[0.15em] text-saudi uppercase block mb-2 sm:mb-3" id="contact-badge">
                {currentTrans.contact.sectionBadge}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl text-text-primary mb-3 sm:mb-4 font-extrabold tracking-tight" id="contact-title">
                {currentTrans.contact.title}
              </h2>
              <p className="text-text-secondary text-sm sm:text-base font-normal leading-relaxed" id="contact-subtitle">
                {currentTrans.contact.subtitle}
              </p>
            </div>

            {/* Form container */}
            <div className="space-y-6 sm:space-y-8 select-none" dir={lang === 'ar' ? 'rtl' : 'ltr'} id="contact-form-container">
              
              {/* Clean Title */}
              <div className="flex justify-start" id="contact-form-title-box">
                <h3 className="text-lg sm:text-xl md:text-2xl text-text-primary font-bold mb-1">
                  {currentTrans.contact.form.title}
                </h3>
              </div>

              <AnimatePresence mode="wait">
                {formSubmitted ? (
                  <motion.div 
                    key="success-message"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12 space-y-6 bg-saudi-light/60 border border-saudi/15 p-8 rounded-xl"
                    id="contact-success-box"
                  >
                    <div className="inline-flex p-4 rounded-full bg-saudi/10 border border-saudi/25 text-saudi justify-center" id="success-icon-container">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h4 className="text-xl text-saudi-dark font-bold" id="success-title">{currentTrans.contact.form.successTitle}</h4>
                    <p className="text-sm text-text-secondary max-w-sm mx-auto leading-relaxed mt-2" id="success-message-text">
                      {currentTrans.contact.form.successMsg}
                    </p>
                    <button 
                      onClick={() => setFormSubmitted(false)}
                      className="text-xs font-semibold text-saudi underline cursor-pointer hover:text-saudi-dark focus:outline-none"
                      id="submit-another-btn"
                    >
                      {currentTrans.contact.form.submitAnother}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="consultation-form"
                    onSubmit={submitContactForm}
                    className="space-y-6"
                    id="consultation-form-element"
                  >
                    {/* Name & Email Row (RTL responsive) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" id="form-row-1">
                      
                      {/* Name Field (RTL key: comes first) */}
                      <div className="space-y-2 text-right rtl:text-right ltr:text-left" id="field-fullname-box">
                        <label className="text-xs font-bold text-text-secondary block tracking-wide">
                          {currentTrans.contact.form.fullNameRef} <span className="text-saudi">*</span>
                        </label>
                        <input 
                          type="text" 
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleFormChange}
                          className="w-full bg-bg-alt border border-border-light focus:border-saudi/50 rounded-lg py-3.5 px-4 text-sm text-text-primary focus:outline-none transition-all duration-300 font-normal placeholder-text-secondary/40 focus:ring-1 focus:ring-saudi/30 text-right rtl:text-right ltr:text-left"
                          placeholder={currentTrans.contact.form.fullNamePlaceholder}
                          id="input-fullname"
                        />
                      </div>

                      {/* Email Field */}
                      <div className="space-y-2 text-right rtl:text-right ltr:text-left" id="field-email-box">
                        <label className="text-xs font-bold text-text-secondary block tracking-wide">
                          {currentTrans.contact.form.emailRef} <span className="text-saudi">*</span>
                        </label>
                        <input 
                          type="email" 
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleFormChange}
                          className="w-full bg-bg-alt border border-border-light focus:border-saudi/50 rounded-lg py-3.5 px-4 text-sm text-text-primary focus:outline-none transition-all duration-300 font-normal placeholder-text-secondary/40 focus:ring-1 focus:ring-saudi/30 text-right rtl:text-right ltr:text-left font-sans"
                          placeholder="example@domain.com"
                          id="input-email"
                        />
                      </div>

                    </div>

                    {/* Company Name & Phone Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" id="form-row-2">
                      
                      {/* Company Name Field */}
                      <div className="space-y-2 text-right rtl:text-right ltr:text-left" id="field-company-box">
                        <label className="text-xs font-bold text-text-secondary block tracking-wide">
                          {currentTrans.contact.form.companyNameRef}
                        </label>
                        <input 
                          type="text" 
                          name="company"
                          value={formData.company}
                          onChange={handleFormChange}
                          className="w-full bg-bg-alt border border-border-light focus:border-saudi/50 rounded-lg py-3.5 px-4 text-sm text-text-primary focus:outline-none transition-all duration-300 font-normal placeholder-text-secondary/40 focus:ring-1 focus:ring-saudi/30 text-right rtl:text-right ltr:text-left"
                          placeholder={currentTrans.contact.form.companyPlaceholder}
                          id="input-company"
                        />
                      </div>

                      {/* Phone Field */}
                      <div className="space-y-2 text-right rtl:text-right ltr:text-left" id="field-phone-box">
                        <label className="text-xs font-bold text-text-secondary block tracking-wide">
                          {currentTrans.contact.form.phoneRef} <span className="text-saudi">*</span>
                        </label>
                        <input 
                          type="tel" 
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleFormChange}
                          className="w-full bg-bg-alt border border-border-light focus:border-saudi/50 rounded-lg py-3.5 px-4 text-sm text-text-primary focus:outline-none transition-all duration-300 font-normal placeholder-text-secondary/40 focus:ring-1 focus:ring-saudi/30 text-right rtl:text-right ltr:text-left phone-mono"
                          placeholder={currentTrans.contact.form.phonePlaceholder}
                          id="input-phone"
                        />
                      </div>

                    </div>

                    {/* Strategic Scope Message */}
                    <div className="space-y-2 text-right rtl:text-right ltr:text-left" id="field-message-box">
                      <label className="text-xs font-bold text-text-secondary block tracking-wide">
                        {currentTrans.contact.form.messageRef} <span className="text-saudi">*</span>
                      </label>
                      <textarea 
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleFormChange}
                        className="w-full bg-bg-alt border border-border-light focus:border-saudi/50 rounded-lg py-3.5 px-4 text-sm text-text-primary focus:outline-none transition-all duration-300 font-normal resize-none placeholder-text-secondary/40 focus:ring-1 focus:ring-saudi/30 text-right rtl:text-right ltr:text-left"
                        placeholder={currentTrans.contact.form.messagePlaceholder}
                        id="input-message"
                      ></textarea>
                    </div>

                    {/* Submit & Error Message */}
                    {submitError && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 text-right rtl:text-right ltr:text-left" id="submit-error-banner">
                        {submitError}
                      </div>
                    )}

                    <div className="flex justify-end pt-2 w-full" id="submit-btn-box">
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className={`group inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-3.5 bg-saudi text-white rounded-lg tracking-wider text-sm font-semibold transition-all duration-300 focus:outline-none shadow-md shadow-saudi/15 w-full sm:w-auto ${
                          isSubmitting 
                            ? 'opacity-60 cursor-not-allowed' 
                            : 'hover:bg-saudi-dark cursor-pointer'
                        }`}
                        id="submit-form-btn"
                      >
                        {isSubmitting ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" id="submit-spinner"></div>
                        ) : (
                          <Send className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                        )}
                        <span>
                          {isSubmitting 
                            ? (lang === 'ar' ? 'جاري الإرسال...' : 'Sending...') 
                            : currentTrans.contact.form.submitBtn}
                        </span>
                      </button>
                    </div>

                  </motion.form>
                )}
              </AnimatePresence>

            </div>

          </div>

          {/* Right Column: High-end Executive Portrait & Details (takes 6 cols) */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-10 w-full" id="contact-details-col">
            
            {/* Executive display layout */}
            <div className="border border-border-light bg-bg-alt p-5 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-8 relative overflow-hidden rounded-xl shadow-sm" id="office-card">
              <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-saudi" id="office-accent-bar"></div>
              
              {/* Premium Corporate Icon inside a sophisticated green / dark-tint container */}
              <div className="w-14 h-14 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center bg-saudi-light border border-saudi/10 rounded-xl text-saudi" id="office-icon-box">
                <Building className="w-7 h-7 sm:w-10 sm:h-10 text-saudi" />
              </div>

              {/* Office text */}
              <div className="space-y-2 sm:space-y-3 text-center sm:text-start flex-1 min-w-0 w-full" id="office-text-box">
                <span className="text-[10px] uppercase tracking-[0.15em] text-saudi font-bold block" id="office-badge">
                  {currentTrans.contact.executiveOfficeLabel}
                </span>
                <h3 className="text-lg sm:text-2xl text-text-primary font-bold leading-snug text-center sm:text-start" id="office-title">
                  {currentTrans.contact.officeTitle}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed font-normal text-center sm:text-start" id="office-desc">
                  {currentTrans.contact.officeDesc}
                </p>
                
                <div className="inline-flex py-1 px-2.5 bg-saudi-light/80 border border-saudi/10 rounded-md" id="office-partnership-tag">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-saudi">
                    NEXT HOME PARTNERSHIPS
                  </span>
                </div>
              </div>

            </div>

            {/* Executive Contact Card matching the uploaded luxury format */}
            <div 
              className="border border-border-light bg-bg-alt p-6 sm:p-10 relative overflow-hidden shadow-sm rounded-2xl" 
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
              id="executive-contact-card"
            >
              {/* Accent thin line on top to match high-end card styling */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-saudi/30" id="exec-accent-top"></div>
              
              {/* Visual Header / Title matching raw image style */}
              <div className="space-y-2 mb-6 sm:mb-8 text-right rtl:text-right ltr:text-left" id="exec-header">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-saudi block font-bold" id="exec-badge">
                  {currentTrans.contact.executiveContactLabel}
                </span>
                <h3 className="text-2xl sm:text-4xl text-text-primary font-extrabold tracking-tight leading-none mt-1" id="exec-name">
                  {currentTrans.contact.name}
                </h3>
                <p className="text-xs sm:text-sm text-saudi font-bold mt-1.5 sm:mt-2" id="exec-role">
                  {currentTrans.contact.role}
                </p>
              </div>

              {/* Divider Line */}
              <div className="w-full border-b border-border-light mb-6" id="exec-divider"></div>

              {/* Info Rows */}
              <div className="space-y-4" id="exec-rows">
                
                {/* Phone Row */}
                <div className="flex justify-between items-center py-4 border-b border-border-light/60 hover:bg-white/50 transition-colors" id="exec-row-phone">
                  <span className="text-[12px] text-text-secondary font-bold" id="exec-row-phone-lbl">
                    {currentTrans.contact.phoneLabel}
                  </span>
                  <a 
                    href="tel:+966506612761" 
                    className="text-text-primary text-sm sm:text-base font-bold hover:text-saudi transition-colors font-sans"
                    dir="ltr"
                    id="exec-phone-link"
                  >
                    +966 50 661 2761
                  </a>
                </div>

                {/* Email Row - Using Corporate Email info@nexthome-group.com */}
                <div className="flex justify-between items-center py-4 border-b border-border-light/60 hover:bg-white/50 transition-colors" id="exec-row-email">
                  <span className="text-[12px] text-text-secondary font-bold" id="exec-row-email-lbl">
                    {currentTrans.contact.emailLabel}
                  </span>
                  <a 
                    href="mailto:info@nexthome-group.com" 
                    className="text-text-primary text-sm sm:text-base font-bold hover:text-saudi transition-colors break-all pl-2 font-sans"
                    id="exec-email-link"
                  >
                    info@nexthome-group.com
                  </a>
                </div>

                {/* Location Row */}
                <div className="flex justify-between items-center py-4 border-b border-border-light/60 hover:bg-white/50 transition-colors" id="exec-row-loc">
                  <span className="text-[12px] text-text-secondary font-bold" id="exec-row-loc-lbl">
                    {currentTrans.contact.locationLabel}
                  </span>
                  <span className="text-text-primary text-sm sm:text-base font-normal" id="exec-loc-val">
                    {currentTrans.contact.location}
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
