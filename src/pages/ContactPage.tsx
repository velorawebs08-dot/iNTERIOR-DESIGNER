import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Instagram, Clock, Send, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { siteData } from '../siteData';

interface ContactPageProps {
  onNavigate: (route: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formSent, setFormSent] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone) return;

    console.log('[STUDIO INQUIRY]', {
      name: contactName,
      phone: contactPhone,
      email: contactEmail,
      message: contactMessage,
      timestamp: new Date().toISOString()
    });

    setFormSent(true);
  };

  return (
    <div id="contact-page" className="w-full py-12 sm:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#9E6938] font-medium">
            <span>Connect With Our Team</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1C1917] font-normal leading-tight">
            Visit Our Design Atelier
          </h1>
          <p className="text-sm sm:text-base text-[#78716C] max-w-2xl font-light leading-relaxed">
            Whether you are planning a complete residential sanctuary or seeking modular kitchen cabinetry, we welcome you to meet our design architects.
          </p>
        </div>

        {/* 1. Main Grid: Contact Details & Quick Message */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          {/* Left Column: Direct Info & Socials (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#F5F2EC] p-8 border border-[#E8E3DA] rounded-xs space-y-6">
              <h3 className="font-serif text-2xl text-[#1C1917]">
                Atelier Headquarters
              </h3>

              <div className="space-y-4 text-sm text-[#615B56]">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-[#FAF8F5] border border-[#E8E3DA] rounded-xs text-[#9E6938] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#78716C] block font-medium">Studio Address</span>
                    <p className="font-medium text-[#1C1917] mt-0.5">{siteData.studio.address}</p>
                    <p>{siteData.studio.city}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-[#FAF8F5] border border-[#E8E3DA] rounded-xs text-[#9E6938] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#78716C] block font-medium">Telephone Concierge</span>
                    <a href={`tel:${siteData.studio.phone.replace(/\s+/g, '')}`} className="font-medium text-[#1C1917] hover:text-[#9E6938] transition-colors mt-0.5 block">
                      {siteData.studio.phone}
                    </a>
                    <p className="text-xs text-[#78716C]">Mon – Sat: 10:00 AM – 7:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-[#FAF8F5] border border-[#E8E3DA] rounded-xs text-[#9E6938] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#78716C] block font-medium">Design Inquiries</span>
                    <a href={`mailto:${siteData.studio.email}`} className="font-medium text-[#1C1917] hover:text-[#9E6938] transition-colors mt-0.5 block">
                      {siteData.studio.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-[#FAF8F5] border border-[#E8E3DA] rounded-xs text-[#25D366] shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#78716C] block font-medium">Direct WhatsApp</span>
                    <a
                      href={`https://wa.me/${siteData.studio.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent("Hello Atelier Veda, I would like to schedule an interior design consultation.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#1C1917] hover:text-[#25D366] transition-colors mt-0.5 inline-flex items-center gap-1"
                    >
                      <span>Chat with Lead Designer</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links Box */}
            <div className="p-6 border border-[#E8E3DA] rounded-xs bg-[#FAF8F5] space-y-4">
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#1C1917] font-medium">
                Digital Portfolios & Press
              </h4>
              <p className="text-xs text-[#78716C]">
                Follow our ongoing site progress, material unboxings, and architectural photo walks.
              </p>

              <div className="flex items-center gap-3 pt-1">
                <a
                  href={siteData.studio.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-[#F5F2EC] hover:bg-[#1C1917] hover:text-white border border-[#E8E3DA] text-xs uppercase tracking-wider font-medium text-[#1C1917] transition-colors rounded-xs inline-flex items-center gap-2"
                >
                  <Instagram className="w-4 h-4 text-[#9E6938]" />
                  <span>Instagram</span>
                </a>

                <button
                  onClick={() => onNavigate('quote')}
                  className="px-4 py-2.5 bg-[#1C1917] text-[#FAF8F5] hover:bg-[#9E6938] text-xs uppercase tracking-wider font-medium transition-colors rounded-xs inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Quick Estimate</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Message Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#F5F2EC] p-8 sm:p-10 border border-[#E8E3DA] rounded-xs">
            {formSent ? (
              <div className="py-16 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-14 h-14 bg-[#FAF8F5] rounded-full flex items-center justify-center mx-auto text-[#9E6938] border border-[#E8E3DA]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl text-[#1C1917]">Message Delivered</h3>
                <p className="text-xs sm:text-sm text-[#78716C] max-w-sm mx-auto">
                  Thank you for writing to Atelier Veda. Our concierge will review your message and reply within 1 business day.
                </p>
                <button
                  onClick={() => setFormSent(false)}
                  className="text-xs uppercase tracking-widest text-[#9E6938] hover:underline underline-offset-4 pt-2 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl text-[#1C1917]">
                    Send a Direct Inquiry
                  </h3>
                  <p className="text-xs text-[#78716C] mt-1">
                    Have a question or looking to discuss press/collaborations? Leave a note below.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="block text-xs uppercase tracking-wider text-[#44403C] font-medium">
                    Your Name <span className="text-[#9E6938]">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Siddharth Verma"
                    className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#D6CEBE] text-sm text-[#1C1917] placeholder-[#A8A29E] focus:outline-hidden focus:ring-1 focus:ring-[#9E6938] rounded-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-phone" className="block text-xs uppercase tracking-wider text-[#44403C] font-medium">
                      Phone Number <span className="text-[#9E6938]">*</span>
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#D6CEBE] text-sm text-[#1C1917] placeholder-[#A8A29E] focus:outline-hidden focus:ring-1 focus:ring-[#9E6938] rounded-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="block text-xs uppercase tracking-wider text-[#44403C] font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="siddharth@example.com"
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#D6CEBE] text-sm text-[#1C1917] placeholder-[#A8A29E] focus:outline-hidden focus:ring-1 focus:ring-[#9E6938] rounded-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-msg" className="block text-xs uppercase tracking-wider text-[#44403C] font-medium">
                    Message
                  </label>
                  <textarea
                    id="contact-msg"
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Tell us about your project timeline, location, or inquiry..."
                    className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#D6CEBE] text-sm text-[#1C1917] placeholder-[#A8A29E] focus:outline-hidden focus:ring-1 focus:ring-[#9E6938] rounded-xs"
                  />
                </div>

                <button
                  type="submit"
                  id="contact-submit-btn"
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#1C1917] text-[#FAF8F5] hover:bg-[#9E6938] text-xs uppercase tracking-widest font-medium transition-colors rounded-xs cursor-pointer shadow-xs inline-flex items-center justify-center gap-2"
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 2. Embedded Google Map Section */}
        <div className="border border-[#E8E3DA] rounded-xs overflow-hidden bg-[#E8E3DA] shadow-xs">
          <div className="bg-[#F5F2EC] px-6 py-4 border-b border-[#E8E3DA] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#1C1917] font-medium">
              <MapPin className="w-4 h-4 text-[#9E6938]" />
              <span>Atelier Location — Lavelle Road, Bengaluru</span>
            </div>
            <span className="text-[11px] text-[#78716C]">Valet Parking Available</span>
          </div>

          <div className="w-full h-[400px]">
            <iframe
              src={siteData.studio.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Atelier Veda Studio Location Map"
              className="grayscale contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
