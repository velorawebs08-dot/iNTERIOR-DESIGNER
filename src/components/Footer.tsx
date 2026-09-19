import React from 'react';
import { ArrowUpRight, MessageCircle, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { siteData } from '../siteData';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer id="main-footer" className="bg-[#1C1917] text-[#FAF8F5] pt-16 pb-12 border-t border-[#2E2925]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-[#2E2925]">
          {/* Col 1: Studio Philosophy (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="font-serif text-3xl font-normal tracking-wide text-[#FAF8F5] block">
              {siteData.studio.name}
            </span>
            <p className="text-xs uppercase tracking-[0.2em] text-[#C59B6D]">
              {siteData.studio.tagline}
            </p>
            <p className="text-sm text-[#A8A29E] leading-relaxed max-w-md pt-2">
              Architecture and interior design tailored around natural materials, stillness, and spatial harmony. Designing sanctuaries across Bengaluru, Mumbai, and Goa.
            </p>

            <div className="pt-2 flex items-center space-x-4">
              <a
                href={siteData.studio.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#3D3732] flex items-center justify-center text-[#FAF8F5] hover:border-[#C59B6D] hover:text-[#C59B6D] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${siteData.studio.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#3D3732] flex items-center justify-center text-[#FAF8F5] hover:border-[#25D366] hover:text-[#25D366] transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${siteData.studio.email}`}
                className="w-10 h-10 rounded-full border border-[#3D3732] flex items-center justify-center text-[#FAF8F5] hover:border-[#C59B6D] hover:text-[#C59B6D] transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#C59B6D] font-medium mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A8A29E]">
              <li>
                <button
                  onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#FAF8F5] transition-colors cursor-pointer"
                >
                  Home Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('projects'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#FAF8F5] transition-colors cursor-pointer"
                >
                  Portfolio Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#FAF8F5] transition-colors cursor-pointer"
                >
                  Room Galleries (Master Archive)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#FAF8F5] transition-colors cursor-pointer"
                >
                  Design Services & Process
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#FAF8F5] transition-colors cursor-pointer"
                >
                  About Our Practice
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('quote'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#FAF8F5] transition-colors cursor-pointer text-[#E7C79A]"
                >
                  Request Interior Quotation →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Studio & Inquiries (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#C59B6D] font-medium mb-4">
              Design Atelier
            </h4>
            
            <div className="space-y-3 text-sm text-[#A8A29E]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C59B6D] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#FAF8F5]">{siteData.studio.address}</p>
                  <p>{siteData.studio.city}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C59B6D] shrink-0" />
                <a href={`tel:${siteData.studio.phone.replace(/\s+/g, '')}`} className="hover:text-[#FAF8F5] transition-colors">
                  {siteData.studio.phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C59B6D] shrink-0" />
                <a href={`mailto:${siteData.studio.email}`} className="hover:text-[#FAF8F5] transition-colors">
                  {siteData.studio.email}
                </a>
              </div>
            </div>

            <div className="pt-4">
              <button
                id="footer-quote-btn"
                onClick={() => { onNavigate('quote'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#FAF8F5] text-[#1C1917] hover:bg-[#C59B6D] hover:text-white text-xs uppercase tracking-widest font-medium transition-colors rounded-xs cursor-pointer"
              >
                <span>Calculate Project Estimate</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright & credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#78716C] gap-4">
          <p>© {new Date().getFullYear()} {siteData.studio.name} Architecture & Design Studio. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-[#A8A29E] transition-colors">Architecture • Turnkey Interiors • Modular Solutions</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
