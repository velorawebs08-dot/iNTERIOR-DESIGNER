import React, { useState } from 'react';
import { Check, CheckCircle2, AlertCircle, Send, MessageCircle, Sparkles, HelpCircle } from 'lucide-react';
import { siteData } from '../siteData';
import { insertQuotationRequest } from '../lib/queries';
import { QuotationRequest } from '../types';

interface QuotePageProps {
  onNavigate: (route: string) => void;
}

export const QuotePage: React.FC<QuotePageProps> = ({ onNavigate }) => {
  // Form State
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Bengaluru');
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [budgetRange, setBudgetRange] = useState(siteData.budgetRanges[1] || '₹2L–5L');
  const [timeline, setTimeline] = useState('1–3 months');
  const [message, setMessage] = useState('');

  // UI state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedQuote, setSubmittedQuote] = useState<QuotationRequest | null>(null);

  const toggleRoom = (room: string) => {
    if (selectedRooms.includes(room)) {
      setSelectedRooms(selectedRooms.filter(r => r !== room));
    } else {
      setSelectedRooms([...selectedRooms, room]);
    }
    // Clear room error if present
    if (errors.roomTypes) {
      setErrors(prev => {
        const next = { ...prev };
        delete next.roomTypes;
        return next;
      });
    }
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!fullName.trim()) {
      errs.fullName = 'Please enter your full name.';
    }

    if (!phoneNumber.trim()) {
      errs.phoneNumber = 'Phone number is required for quote dispatch.';
    } else if (!/^[0-9+\s\-]{8,15}$/.test(phoneNumber.trim())) {
      errs.phoneNumber = 'Please enter a valid phone number with 8-15 digits.';
    }

    if (!city.trim()) {
      errs.city = 'Please specify your city or property location.';
    }

    if (selectedRooms.length === 0) {
      errs.roomTypes = 'Please select at least one room or choose Full Home.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await insertQuotationRequest({
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        email: email.trim() || undefined,
        city: city.trim(),
        roomTypes: selectedRooms,
        budgetRange,
        timeline,
        message: message.trim() || undefined,
      });

      const newQuote: QuotationRequest = {
        id: result.refId,
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        email: email.trim() || undefined,
        city: city.trim(),
        roomTypes: selectedRooms,
        budgetRange,
        timeline,
        message: message.trim() || undefined,
        createdAt: new Date().toISOString(),
      };

      setSubmittedQuote(newQuote);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };


  const generateWhatsAppMessage = (quote: QuotationRequest) => {
    const text = `*New Interior Quotation Request*\n` +
      `*Ref ID:* ${quote.id}\n` +
      `*Name:* ${quote.fullName}\n` +
      `*Phone:* ${quote.phoneNumber}\n` +
      `*City:* ${quote.city}\n` +
      `*Rooms:* ${quote.roomTypes.join(', ')}\n` +
      `*Budget Range:* ${quote.budgetRange}\n` +
      `*Timeline:* ${quote.timeline}\n` +
      (quote.message ? `*Notes:* ${quote.message}\n` : '') +
      `\nSent from Atelier Veda Quote Portal.`;
    return encodeURIComponent(text);
  };

  return (
    <div id="quote-page" className="w-full py-12 sm:py-20 bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* If successfully submitted, show confirmation */}
        {submittedQuote ? (
          <div
            id="quote-success-card"
            className="bg-[#FAF8F5] border border-[#C59B6D] p-8 sm:p-12 rounded-xs shadow-md space-y-6 text-center animate-in fade-in zoom-in-95 duration-300"
          >
            <div className="w-16 h-16 bg-[#F5F2EC] rounded-full flex items-center justify-center mx-auto text-[#9E6938] border border-[#E8E3DA]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#9E6938] font-medium">
                Quotation Request Received
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917]">
                Thank you, {submittedQuote.fullName}
              </h2>
              <p className="text-xs font-mono text-[#78716C]">
                Reference ID: <span className="text-[#1C1917] font-bold">{submittedQuote.id}</span>
              </p>
            </div>

            <div className="bg-[#F5F2EC] p-6 rounded-xs text-left max-w-lg mx-auto text-xs sm:text-sm text-[#615B56] space-y-2 border border-[#E8E3DA]">
              <div className="flex justify-between border-b border-[#E8E3DA] pb-2">
                <span className="text-[#78716C]">Selected Spaces:</span>
                <span className="font-medium text-[#1C1917]">{submittedQuote.roomTypes.join(', ')}</span>
              </div>
              <div className="flex justify-between border-b border-[#E8E3DA] pb-2">
                <span className="text-[#78716C]">Estimated Budget:</span>
                <span className="font-medium text-[#1C1917]">{submittedQuote.budgetRange}</span>
              </div>
              <div className="flex justify-between border-b border-[#E8E3DA] pb-2">
                <span className="text-[#78716C]">Target Location:</span>
                <span className="font-medium text-[#1C1917]">{submittedQuote.city}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-[#78716C]">Timeline:</span>
                <span className="font-medium text-[#1C1917]">{submittedQuote.timeline}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#78716C] max-w-md mx-auto leading-relaxed">
              Our lead architectural designer will review your space requirements and reach out on{' '}
              <strong className="text-[#1C1917]">{submittedQuote.phoneNumber}</strong> within 24–48 business hours with an itemized preliminary cost schedule.
            </p>

            {/* Quick Action: Send directly to WhatsApp */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                id="quote-whatsapp-share-btn"
                href={`https://wa.me/${siteData.studio.whatsapp.replace(/\D/g, '')}?text=${generateWhatsAppMessage(submittedQuote)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 bg-[#25D366] text-white hover:bg-[#1EBE5D] text-xs uppercase tracking-widest font-medium transition-colors rounded-xs inline-flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Notify Atelier on WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  setSubmittedQuote(null);
                  setFullName('');
                  setPhoneNumber('');
                  setSelectedRooms([]);
                  setMessage('');
                }}
                className="w-full sm:w-auto px-6 py-3 border border-[#1C1917] text-[#1C1917] hover:bg-[#1C1917] hover:text-[#FAF8F5] text-xs uppercase tracking-widest font-medium transition-colors rounded-xs cursor-pointer"
              >
                <span>Submit Another Inquiry</span>
              </button>
            </div>
          </div>
        ) : (
          /* Quotation Form */
          <div className="space-y-10">
            {/* Form Header */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#9E6938] font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Estimate Your Space</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl text-[#1C1917] font-normal leading-tight">
                Request an Architectural Quotation
              </h1>
              <p className="text-sm text-[#78716C] font-light leading-relaxed">
                Provide preliminary details about your home or workplace to receive tailored material palettes, 3D visualization options, and an estimated investment breakdown.
              </p>
            </div>

            <form
              id="quotation-form"
              onSubmit={handleSubmit}
              className="bg-[#F5F2EC] border border-[#E8E3DA] p-6 sm:p-10 lg:p-12 rounded-xs shadow-xs space-y-8"
              noValidate
            >
              {/* Section 1: Contact Information */}
              <div className="space-y-4">
                <h3 className="text-xs uppercase tracking-[0.2em] text-[#1C1917] font-medium pb-2 border-b border-[#E8E3DA]">
                  1. Contact Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="quote-fullName" className="block text-xs uppercase tracking-wider text-[#44403C] font-medium">
                      Full Name <span className="text-[#9E6938]">*</span>
                    </label>
                    <input
                      type="text"
                      id="quote-fullName"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) setErrors({ ...errors, fullName: '' });
                      }}
                      placeholder="e.g. Priyanshu Sharma"
                      className={`w-full px-4 py-3 bg-[#FAF8F5] border text-sm text-[#1C1917] placeholder-[#A8A29E] focus:outline-hidden focus:ring-1 focus:ring-[#9E6938] rounded-xs transition-colors ${
                        errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-[#D6CEBE]'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1.5">
                    <label htmlFor="quote-phoneNumber" className="block text-xs uppercase tracking-wider text-[#44403C] font-medium">
                      Phone Number <span className="text-[#9E6938]">*</span>
                    </label>
                    <input
                      type="tel"
                      id="quote-phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                        if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: '' });
                      }}
                      placeholder="+91 98765 43210"
                      className={`w-full px-4 py-3 bg-[#FAF8F5] border text-sm text-[#1C1917] placeholder-[#A8A29E] focus:outline-hidden focus:ring-1 focus:ring-[#9E6938] rounded-xs transition-colors ${
                        errors.phoneNumber ? 'border-red-500 bg-red-50/20' : 'border-[#D6CEBE]'
                      }`}
                    />
                    {errors.phoneNumber && (
                      <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.phoneNumber}</span>
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="quote-email" className="block text-xs uppercase tracking-wider text-[#44403C] font-medium">
                      Email Address <span className="text-[#78716C] font-normal lowercase">(optional)</span>
                    </label>
                    <input
                      type="email"
                      id="quote-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="priyanshu@example.com"
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#D6CEBE] text-sm text-[#1C1917] placeholder-[#A8A29E] focus:outline-hidden focus:ring-1 focus:ring-[#9E6938] rounded-xs transition-colors"
                    />
                  </div>

                  {/* City */}
                  <div className="space-y-1.5">
                    <label htmlFor="quote-city" className="block text-xs uppercase tracking-wider text-[#44403C] font-medium">
                      Property Location / City <span className="text-[#9E6938]">*</span>
                    </label>
                    <input
                      type="text"
                      id="quote-city"
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        if (errors.city) setErrors({ ...errors, city: '' });
                      }}
                      placeholder="e.g. Bengaluru, Indiranagar"
                      className={`w-full px-4 py-3 bg-[#FAF8F5] border text-sm text-[#1C1917] placeholder-[#A8A29E] focus:outline-hidden focus:ring-1 focus:ring-[#9E6938] rounded-xs transition-colors ${
                        errors.city ? 'border-red-500 bg-red-50/20' : 'border-[#D6CEBE]'
                      }`}
                    />
                    {errors.city && (
                      <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.city}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 2: Room Type(s) Multi-Select */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#E8E3DA]">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-[#1C1917] font-medium">
                    2. Room Type(s) Needed <span className="text-[#9E6938]">*</span>
                  </h3>
                  <span className="text-[11px] text-[#78716C]">Select all that apply</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {siteData.roomTypes.map((room) => {
                    const isChecked = selectedRooms.includes(room);
                    return (
                      <button
                        type="button"
                        key={room}
                        id={`room-select-${room.toLowerCase().replace(/\s+/g, '-')}`}
                        onClick={() => toggleRoom(room)}
                        className={`p-3.5 border rounded-xs text-left text-xs uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-[#1C1917] border-[#1C1917] text-[#FAF8F5] shadow-xs'
                            : 'bg-[#FAF8F5] border-[#D6CEBE] text-[#44403C] hover:border-[#9E6938]'
                        }`}
                      >
                        <span className="font-medium">{room}</span>
                        <div
                          className={`w-4 h-4 rounded-xs border flex items-center justify-center transition-colors ${
                            isChecked
                              ? 'bg-[#9E6938] border-[#9E6938] text-white'
                              : 'border-[#A8A29E] bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {errors.roomTypes && (
                  <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.roomTypes}</span>
                  </p>
                )}
              </div>

              {/* Section 3: Budget & Timeline */}
              <div className="space-y-4">
                <h3 className="text-xs uppercase tracking-[0.2em] text-[#1C1917] font-medium pb-2 border-b border-[#E8E3DA]">
                  3. Budget Range & Project Timeline
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Budget Dropdown */}
                  <div className="space-y-1.5">
                    <label htmlFor="quote-budget" className="block text-xs uppercase tracking-wider text-[#44403C] font-medium">
                      Approximate Budget Range
                    </label>
                    <select
                      id="quote-budget"
                      value={budgetRange}
                      onChange={(e) => setBudgetRange(e.target.value)}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#D6CEBE] text-sm text-[#1C1917] focus:outline-hidden focus:ring-1 focus:ring-[#9E6938] rounded-xs cursor-pointer"
                    >
                      {siteData.budgetRanges.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                    <p className="text-[11px] text-[#78716C]">Includes bespoke design, 3D visualization, and execution.</p>
                  </div>

                  {/* Timeline Selector */}
                  <div className="space-y-1.5">
                    <label htmlFor="quote-timeline" className="block text-xs uppercase tracking-wider text-[#44403C] font-medium">
                      Preferred Timeline
                    </label>
                    <select
                      id="quote-timeline"
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#D6CEBE] text-sm text-[#1C1917] focus:outline-hidden focus:ring-1 focus:ring-[#9E6938] rounded-xs cursor-pointer"
                    >
                      <option value="Immediate (Within 1 month)">Immediate (Within 1 month)</option>
                      <option value="1–3 months">1–3 months</option>
                      <option value="3–6 months">3–6 months</option>
                      <option value="Planning phase (6+ months)">Planning phase (6+ months)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 4: Space Notes */}
              <div className="space-y-2">
                <label htmlFor="quote-message" className="block text-xs uppercase tracking-wider text-[#44403C] font-medium">
                  Message / Specific Space Goals <span className="text-[#78716C] lowercase font-normal">(optional)</span>
                </label>
                <textarea
                  id="quote-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details such as square footage, apartment name, architectural style preferences (e.g., Japandi, warm modernism, fluted woodwork), or specific modular storage needs..."
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#D6CEBE] text-sm text-[#1C1917] placeholder-[#A8A29E] focus:outline-hidden focus:ring-1 focus:ring-[#9E6938] rounded-xs transition-colors"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-[#E8E3DA] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-[#78716C]">
                  🔒 Your information is confidential and used exclusively for quotation planning.
                </div>

                <button
                  type="submit"
                  id="quote-submit-btn"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-4 bg-[#1C1917] text-[#FAF8F5] hover:bg-[#9E6938] text-xs uppercase tracking-[0.2em] font-medium transition-colors rounded-xs cursor-pointer shadow-md inline-flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Calculating & Submitting...</span>
                  ) : (
                    <>
                      <span>Submit Quotation Request</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
