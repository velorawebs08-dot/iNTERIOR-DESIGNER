import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, MessageCircle } from 'lucide-react';
import { siteData } from '../siteData';

interface HeaderProps {
  currentRoute: string;
  onNavigate: (route: string, slug?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', route: 'home' },
    { label: 'Projects', route: 'projects' },
    { label: 'Room Gallery', route: 'gallery' },
    { label: 'Services', route: 'services' },
    { label: 'About', route: 'about' },
    { label: 'Contact', route: 'contact' },
  ];

  const handleNavClick = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E3DA] shadow-xs'
          : 'bg-[#FAF8F5]/80 backdrop-blur-xs border-b border-[#E8E3DA]/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Studio Name */}
        <button
          id="header-brand-btn"
          onClick={() => handleNavClick('home')}
          className="text-left group cursor-pointer focus:outline-hidden"
        >
          <span className="block font-serif text-2xl sm:text-3xl font-normal tracking-wider text-[#1C1917] group-hover:text-[#9E6938] transition-colors">
            {siteData.studio.name}
          </span>
          <span className="block text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#78716C] font-light">
            Interior Architecture
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-7 lg:space-x-9">
          {navLinks.map((link) => {
            const isActive = currentRoute === link.route || (link.route === 'projects' && currentRoute === 'project-detail');
            return (
              <button
                key={link.route}
                id={`nav-${link.route}-btn`}
                onClick={() => handleNavClick(link.route)}
                className={`relative py-1 text-sm tracking-widest uppercase transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[#1C1917] font-medium'
                    : 'text-[#615B56] hover:text-[#1C1917]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#9E6938]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Desktop Right CTAs */}
        <div className="hidden md:flex items-center space-x-3">
          <a
            id="header-whatsapp-btn"
            href={`https://wa.me/${siteData.studio.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent("Hello Atelier Veda, I would like to consult about an interior design project.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-[#78716C] hover:text-[#25D366] transition-colors"
            title="Chat on WhatsApp"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
          </a>

          <button
            id="header-quote-cta-btn"
            onClick={() => handleNavClick('quote')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1C1917] text-[#FAF8F5] hover:bg-[#9E6938] text-xs uppercase tracking-widest font-medium transition-all duration-200 cursor-pointer shadow-xs rounded-xs"
          >
            <span>Get a Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1C1917] hover:text-[#9E6938] transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          id="mobile-drawer"
          className="md:hidden border-b border-[#E8E3DA] bg-[#FAF8F5] px-6 py-6 space-y-4 shadow-lg animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.route || (link.route === 'projects' && currentRoute === 'project-detail');
              return (
                <button
                  key={link.route}
                  onClick={() => handleNavClick(link.route)}
                  className={`text-left py-2 text-base uppercase tracking-widest transition-colors cursor-pointer flex items-center justify-between ${
                    isActive ? 'text-[#9E6938] font-semibold' : 'text-[#44403C]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#9E6938]" />}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#E8E3DA] flex flex-col gap-3">
            <button
              id="mobile-quote-btn"
              onClick={() => handleNavClick('quote')}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#1C1917] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium rounded-xs"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              id="mobile-whatsapp-btn"
              href={`https://wa.me/${siteData.studio.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent("Hello Atelier Veda, I would like to consult about an interior design project.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 border border-[#D6CEBE] text-[#1C1917] text-xs uppercase tracking-widest font-medium rounded-xs"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
