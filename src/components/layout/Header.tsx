import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Menu, X } from 'lucide-react';
import { TranslationSchema } from '../../translations';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

interface HeaderProps {
  lang: 'ar' | 'en';
  toggleLanguage: () => void;
  activeSection: string;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  scrolled: boolean;
  currentTrans: TranslationSchema;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  toggleLanguage,
  activeSection,
  isMenuOpen,
  setIsMenuOpen,
  scrolled,
  currentTrans,
}) => {
  // Safe drawer overflow locking
  useBodyScrollLock(isMenuOpen);

  return (
    <>
      {/* 1. TRANSLUCENT & FIXED FLOATING NAVIGATION BAR OVER THE GRAPHIC HERO */}
      <header
        id="header-nav"
        className={`fixed inset-x-0 top-0 z-50 h-[62px] lg:h-[70px] transition-all duration-300 ${
          scrolled
            ? 'border-b border-[#DCE5E0] bg-white/95 shadow-sm backdrop-blur-md'
            : 'border-b border-white/20 bg-transparent backdrop-blur-[2px]'
        }`}
      >
        <div className="mx-auto flex justify-between items-center h-full w-full max-w-[1540px] px-4 sm:px-5 lg:px-10 xl:px-14">
          
          {/* Column 1: Executive Logo */}
          <div className="flex items-center justify-start flex-nowrap" id="header-logo-container">
            <a href="#" className="flex flex-col text-right rtl:text-right ltr:text-left focus:outline-none select-none group whitespace-nowrap leading-none gap-0.5" id="header-logo-anchor">
              <span className="font-sans text-[22px] sm:text-[24px] lg:text-[27px] font-extrabold tracking-wider text-[#151B18] uppercase leading-none" id="header-brand-title">
                {currentTrans.brand.name}
              </span>
              <span className="text-[10px] sm:text-[11px] lg:text-[12px] tracking-[0.05em] text-[#151B18] uppercase font-bold leading-none" id="header-brand-subtitle">
                {currentTrans.brand.subtitle}
              </span>
            </a>
          </div>

          {/* Column 2: Centered Web Navigation Links */}
          <div className="hidden lg:flex justify-center items-center gap-6 xl:gap-8" id="desktop-nav-menu">
            <a 
              href="#home" 
              className={`text-[15px] lg:text-[16px] font-medium lg:font-semibold pb-1 transition-all duration-300 select-none ${
                activeSection === 'home' 
                  ? 'text-[#07583F] border-b-2 border-[#07583F]' 
                  : 'text-[#151B18] hover:text-[#07583F] border-b-2 border-transparent'
              }`}
              id="desktop-nav-home"
            >
              {lang === 'ar' ? 'الرئيسية' : 'Home'}
            </a>
            <a 
              href="#about" 
              className={`text-[15px] lg:text-[16px] font-medium lg:font-semibold pb-1 transition-all duration-300 select-none ${
                activeSection === 'about' 
                  ? 'text-[#07583F] border-b-2 border-[#07583F]' 
                  : 'text-[#151B18] hover:text-[#07583F] border-b-2 border-transparent'
              }`}
              id="desktop-nav-about"
            >
              {currentTrans.nav.about}
            </a>
            <a 
              href="#services" 
              className={`text-[15px] lg:text-[16px] font-medium lg:font-semibold pb-1 transition-all duration-300 select-none ${
                activeSection === 'services' 
                  ? 'text-[#07583F] border-b-2 border-[#07583F]' 
                  : 'text-[#151B18] hover:text-[#07583F] border-b-2 border-transparent'
              }`}
              id="desktop-nav-services"
            >
              {currentTrans.nav.services}
            </a>
            <a 
              href="#strategy" 
              className={`text-[15px] lg:text-[16px] font-medium lg:font-semibold pb-1 transition-all duration-300 select-none ${
                activeSection === 'strategy' 
                  ? 'text-[#07583F] border-b-2 border-[#07583F]' 
                  : 'text-[#151B18] hover:text-[#07583F] border-b-2 border-transparent'
              }`}
              id="desktop-nav-strategy"
            >
              {currentTrans.nav.strategy}
            </a>
            <a 
              href="#footprint" 
              className={`text-[15px] lg:text-[16px] font-medium lg:font-semibold pb-1 transition-all duration-300 select-none ${
                activeSection === 'footprint' 
                  ? 'text-[#07583F] border-b-2 border-[#07583F]' 
                  : 'text-[#151B18] hover:text-[#07583F] border-b-2 border-transparent'
              }`}
              id="desktop-nav-footprint"
            >
              {currentTrans.nav.footprint}
            </a>
            <a 
              href="#insights" 
              className={`text-[15px] lg:text-[16px] font-medium lg:font-semibold pb-1 transition-all duration-300 select-none ${
                activeSection === 'insights' 
                  ? 'text-[#07583F] border-b-2 border-[#07583F]' 
                  : 'text-[#151B18] hover:text-[#07583F] border-b-2 border-transparent'
              }`}
              id="desktop-nav-insights"
            >
              {currentTrans.nav.insights}
            </a>
          </div>

          {/* Column 3: Global Actions Area */}
          <div className="flex items-center justify-end gap-2 sm:gap-3 lg:gap-4 select-none" id="header-actions-group">
            {/* Minimalist Globe Language Button */}
            <button 
              onClick={toggleLanguage}
              className="text-xs lg:text-sm font-bold text-[#07583F] hover:text-[#064632] hover:bg-[#07583F]/5 transition-all h-9 min-w-[52px] px-3 lg:h-[44px] lg:px-4 rounded-lg border border-[#DCE5E0]/60 bg-transparent cursor-pointer flex items-center justify-center gap-1.5 focus:outline-none"
              id="header-lang-toggle"
            >
              <Globe className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#07583F]" id="header-lang-icon" />
              <span id="header-lang-text">{lang === 'ar' ? 'EN' : 'AR'}</span>
            </button>

            {/* Prominent Saudi Green Action Button */}
            <a 
              href="#contact"
              className="hidden lg:flex text-sm font-bold bg-[#006241] hover:bg-[#004f34] text-white h-[44px] items-center px-6 rounded-lg transition-all"
              id="header-cta-contact"
            >
              <span>{currentTrans.nav.contact}</span>
            </a>

            {/* Mobile Drawer Toggle Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-[#07583F] hover:text-[#064632] focus:outline-none cursor-pointer flex items-center justify-center min-w-[40px] min-h-[40px]"
              aria-label={currentTrans.nav.toggleMenu}
              aria-expanded={isMenuOpen}
              id="header-mobile-toggle"
            >
              {isMenuOpen ? <X className="w-6 h-6" id="mobile-toggle-close-icon" /> : <Menu className="w-6 h-6" id="mobile-toggle-open-icon" />}
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE DRAWER NAVIGATION MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <React.Fragment key="mobile-drawer-wrapper">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-[62px] z-30 bg-black/50 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
              id="mobile-nav-backdrop"
            />
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="fixed top-[62px] left-0 right-0 z-40 bg-white border-b border-[#DCE5E0] shadow-md block lg:hidden max-h-[calc(100dvh-62px)] overflow-y-auto"
              id="mobile-nav-drawer"
            >
              <div className="px-4 py-5 flex flex-col space-y-0.5 max-w-lg mx-auto font-sans" id="mobile-nav-links-box">
                <a 
                  href="#home" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center text-[15px] text-[#151B18] hover:text-[#07583F] hover:bg-[#07583F]/5 rounded-lg px-4 h-[48px] transition-all font-semibold"
                  id="mobile-link-home"
                >
                  {lang === 'ar' ? 'الرئيسية' : 'Home'}
                </a>
                <a 
                  href="#about" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center text-[15px] text-[#151B18] hover:text-[#07583F] hover:bg-[#07583F]/5 rounded-lg px-4 h-[48px] transition-all font-semibold"
                  id="mobile-link-about"
                >
                  {currentTrans.nav.about}
                </a>
                <a 
                  href="#services" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center text-[15px] text-[#151B18] hover:text-[#07583F] hover:bg-[#07583F]/5 rounded-lg px-4 h-[48px] transition-all font-semibold"
                  id="mobile-link-services"
                >
                  {currentTrans.nav.services}
                </a>
                <a 
                  href="#strategy" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center text-[15px] text-[#151B18] hover:text-[#07583F] hover:bg-[#07583F]/5 rounded-lg px-4 h-[48px] transition-all font-semibold"
                  id="mobile-link-strategy"
                >
                  {currentTrans.nav.strategy}
                </a>
                <a 
                  href="#footprint" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center text-[15px] text-[#151B18] hover:text-[#07583F] hover:bg-[#07583F]/5 rounded-lg px-4 h-[48px] transition-all font-semibold"
                  id="mobile-link-footprint"
                >
                  {currentTrans.nav.footprint}
                </a>
                <a 
                  href="#insights" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center text-[15px] text-[#151B18] hover:text-[#07583F] hover:bg-[#07583F]/5 rounded-lg px-4 h-[48px] transition-all font-semibold"
                  id="mobile-link-insights"
                >
                  {currentTrans.nav.insights}
                </a>
                <a 
                  href="#contact" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center text-[15px] text-white bg-[#006241] hover:bg-[#004f34] rounded-lg px-4 h-[48px] mt-2 transition-all font-bold justify-center shadow-xs"
                  id="mobile-link-contact"
                >
                  {currentTrans.nav.contact}
                </a>
              </div>
            </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>
    </>
  );
};
