import React from 'react';
import { ArrowRight, CheckCircle2, Home, LayoutGrid, Building2, Compass, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { siteData } from '../siteData';

interface ServicesPageProps {
  onNavigate: (route: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home':
        return <Home className="w-8 h-8 text-[#9E6938]" />;
      case 'LayoutGrid':
        return <LayoutGrid className="w-8 h-8 text-[#9E6938]" />;
      case 'Building2':
        return <Building2 className="w-8 h-8 text-[#9E6938]" />;
      case 'Compass':
      default:
        return <Compass className="w-8 h-8 text-[#9E6938]" />;
    }
  };

  const processSteps = [
    {
      step: "01",
      title: "Consultation & Discovery",
      desc: "An in-depth session exploring your lifestyle rituals, aesthetic preferences, functional must-haves, and budget boundaries."
    },
    {
      step: "02",
      title: "Space Planning & 2D Layouts",
      desc: "Optimizing flow, structural furniture placements, civil modifications, and technical electrical/plumbing drawings."
    },
    {
      step: "03",
      title: "3D Renders & Material Palette",
      desc: "Photorealistic spatial renders paired with physical tactile material boards: natural stone, wood veneers, fabrics, and metals."
    },
    {
      step: "04",
      title: "Precision Execution & Craft",
      desc: "Rigorous site execution managed by our in-house project engineers, bespoke carpentry, and factory-precision modular joinery."
    },
    {
      step: "05",
      title: "White-Glove Handover & Warranty",
      desc: "Deep cleaning, custom lighting commissioning, decorative art placement, and 10-year hardware warranty certification."
    }
  ];

  return (
    <div id="services-page" className="w-full py-12 sm:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#9E6938] font-medium">
            <span>Our Expertise</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1C1917] font-normal leading-tight">
            Design Services & Turnkey Practice
          </h1>
          <p className="text-sm sm:text-base text-[#78716C] max-w-2xl font-light leading-relaxed">
            From comprehensive whole-home transformations to custom modular kitchen engineering, every service is delivered with architectural integrity and single-point accountability.
          </p>
        </div>

        {/* 1. Services Breakdown Cards */}
        <div className="space-y-12 mb-24">
          {siteData.services.map((service, index) => (
            <div
              key={service.title}
              id={`service-detail-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-[#F5F2EC] border border-[#E8E3DA] p-8 sm:p-12 rounded-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-start hover:border-[#9E6938]/40 transition-colors"
            >
              {/* Left Column: Icon, Title, Description */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#FAF8F5] border border-[#E8E3DA] rounded-xs">
                    {getServiceIcon(service.icon)}
                  </div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#9E6938]">
                    Service 0{index + 1}
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#1C1917]">
                  {service.title}
                </h2>

                <p className="text-sm sm:text-base text-[#615B56] leading-relaxed font-light">
                  {service.description}
                </p>

                {service.idealFor && (
                  <div className="pt-2 text-xs text-[#78716C] border-l-2 border-[#C59B6D] pl-3 italic">
                    <strong className="font-semibold text-[#1C1917] not-italic">Ideal for:</strong> {service.idealFor}
                  </div>
                )}

                {service.timeline && (
                  <p className="text-xs uppercase tracking-wider text-[#78716C]">
                    Typical Project Timeline: <span className="text-[#1C1917] font-medium">{service.timeline}</span>
                  </p>
                )}

                <div className="pt-4">
                  <button
                    onClick={() => onNavigate('quote')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#1C1917] text-[#FAF8F5] hover:bg-[#9E6938] text-xs uppercase tracking-widest font-medium transition-colors rounded-xs cursor-pointer"
                  >
                    <span>Request Quotation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: Deliverables Checklist */}
              <div className="lg:col-span-6 bg-[#FAF8F5] p-6 sm:p-8 border border-[#E8E3DA] rounded-xs space-y-4">
                <h4 className="text-xs uppercase tracking-[0.2em] text-[#1C1917] font-medium pb-2 border-b border-[#E8E3DA]">
                  What's Included
                </h4>

                <ul className="space-y-3">
                  {(service.deliverables || [
                    "Full technical architectural drawings & specifications",
                    "Dedicated site engineer and daily progress logging",
                    "Custom 3D photorealistic renderings",
                    "Material sample boards and physical mockups"
                  ]).map((item, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-3 text-xs sm:text-sm text-[#615B56]">
                      <CheckCircle2 className="w-4 h-4 text-[#9E6938] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Process Section */}
        <div className="py-16 border-t border-[#E8E3DA]">
          <div className="max-w-2xl mb-14">
            <span className="text-xs uppercase tracking-[0.25em] text-[#9E6938] font-medium">
              Transparent Methodology
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1917] mt-2">
              Our 5-Step Design Process
            </h2>
            <p className="text-sm text-[#78716C] mt-2">
              Structured from first blueprint to final key handover, ensuring zero surprises and complete peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="bg-[#FAF8F5] p-6 border-t-2 border-[#1C1917] hover:border-[#9E6938] transition-colors space-y-3"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-[#9E6938]">
                  Phase {step.step}
                </span>
                <h3 className="font-serif text-lg text-[#1C1917] leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs text-[#78716C] leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Bottom Quotation Callout */}
        <div className="mt-16 p-8 sm:p-12 bg-[#1C1917] text-[#FAF8F5] rounded-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif text-2xl sm:text-3xl">Have a unique blueprint or commercial space?</h3>
            <p className="text-xs sm:text-sm text-[#A8A29E]">
              Our design director offers personal 30-minute discovery calls for new projects.
            </p>
          </div>
          <button
            onClick={() => onNavigate('quote')}
            className="shrink-0 px-8 py-4 bg-[#FAF8F5] text-[#1C1917] hover:bg-[#9E6938] hover:text-white text-xs uppercase tracking-widest font-medium transition-colors rounded-xs cursor-pointer inline-flex items-center gap-2"
          >
            <span>Get a Custom Quote</span>
            <ArrowUpRight className="w-4 h-4 text-[#C59B6D]" />
          </button>
        </div>
      </div>
    </div>
  );
};
