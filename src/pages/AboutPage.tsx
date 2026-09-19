import React from 'react';
import { Award, Check, Sparkles, Building, ArrowUpRight } from 'lucide-react';
import { siteData } from '../siteData';

interface AboutPageProps {
  onNavigate: (route: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const awards = [
    { year: "2025", title: "Architectural Digest Top 50", org: "AD India", note: "Recognized for Residential Excellence in Tropical Modernism" },
    { year: "2024", title: "Elle Decor Design Award", org: "EDIDA India", note: "Best Modular Kitchen & Spatial Craft" },
    { year: "2023", title: "India Design ID Distinction", org: "ID Honours", note: "Sustainable Material Selection in Residential Architecture" },
    { year: "2022", title: "Commercial Space of the Year", org: "Design Benchmark Awards", note: "Kanvas Creative Studio Workspace" }
  ];

  return (
    <div id="about-page" className="w-full py-12 sm:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#9E6938] font-medium">
            <span>Our Origin & Philosophy</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1C1917] font-normal leading-tight">
            Crafting Spaces of Quiet Elegance
          </h1>
          <p className="text-sm sm:text-base text-[#78716C] max-w-2xl font-light leading-relaxed">
            Founded in 2014, Atelier Veda bridges architectural discipline with emotional resonance. We curate homes that slow down the pulse of modern life.
          </p>
        </div>

        {/* 1. Main Story Section with Studio Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917]">
              "Architecture is not about filling a room with objects. It is about sculpting how shadows fall and how morning light wakes you."
            </h2>

            <div className="prose text-[#615B56] leading-relaxed space-y-4 text-sm sm:text-base font-light">
              <p>
                {siteData.studio.about}
              </p>
              <p>
                Under the creative leadership of Principal Architect Maya Veda, our Bangalore-based atelier has grown from a boutique practice into a multidisciplinary studio commanding turnkey residential estates and bespoke commercial projects across India.
              </p>
              <p>
                We collaborate directly with generational stone masons, handloom weavers, and precision CNC joineries. By eliminating intermediaries, every line drawn on paper translates faithfully into tactile physical reality.
              </p>
            </div>

            {/* Core Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#E8E3DA]">
              <div>
                <span className="font-serif text-3xl sm:text-4xl text-[#1C1917]">12+</span>
                <p className="text-xs uppercase tracking-wider text-[#78716C] mt-1">Years of Practice</p>
              </div>
              <div>
                <span className="font-serif text-3xl sm:text-4xl text-[#1C1917]">140+</span>
                <p className="text-xs uppercase tracking-wider text-[#78716C] mt-1">Completed Homes</p>
              </div>
              <div>
                <span className="font-serif text-3xl sm:text-4xl text-[#1C1917]">450K+</span>
                <p className="text-xs uppercase tracking-wider text-[#78716C] mt-1">Sq Ft Transformed</p>
              </div>
            </div>
          </div>

          {/* Right Image: Studio Principal & Team Workspace */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] overflow-hidden rounded-xs bg-[#E8E3DA] shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80"
                alt="Maya Veda, Principal Architect & Founder"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#FAF8F5] p-5 border border-[#E8E3DA] rounded-xs shadow-md max-w-xs hidden sm:block">
              <p className="font-serif text-lg text-[#1C1917]">Maya Veda</p>
              <p className="text-xs uppercase tracking-wider text-[#9E6938]">Principal Architect & Founder</p>
              <p className="text-[11px] text-[#78716C] mt-1">B.Arch, CEPT University • Master of Interior Architecture</p>
            </div>
          </div>
        </div>

        {/* 2. Studio Values */}
        <div className="py-16 border-t border-[#E8E3DA] mb-20">
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#9E6938] font-medium">
              Guiding Principles
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] mt-2">
              The Tenets of Our Craft
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-[#F5F2EC] border border-[#E8E3DA] rounded-xs space-y-3">
              <span className="text-xs font-mono text-[#9E6938]">01</span>
              <h3 className="font-serif text-2xl text-[#1C1917]">Honest Materials</h3>
              <p className="text-xs sm:text-sm text-[#615B56] leading-relaxed font-light">
                We favor unlacquered brass that patinates naturally, fluted glass, raw travertine, and solid European oak that age with dignity over synthetic shortcuts.
              </p>
            </div>

            <div className="p-8 bg-[#F5F2EC] border border-[#E8E3DA] rounded-xs space-y-3">
              <span className="text-xs font-mono text-[#9E6938]">02</span>
              <h3 className="font-serif text-2xl text-[#1C1917]">Sensory Stillness</h3>
              <p className="text-xs sm:text-sm text-[#615B56] leading-relaxed font-light">
                A home should soothe your nervous system. We meticulously design acoustic absorption, glare-free indirect lighting, and hidden storage so spaces breathe.
              </p>
            </div>

            <div className="p-8 bg-[#F5F2EC] border border-[#E8E3DA] rounded-xs space-y-3">
              <span className="text-xs font-mono text-[#9E6938]">03</span>
              <h3 className="font-serif text-2xl text-[#1C1917]">Zero-Compromise Engineering</h3>
              <p className="text-xs sm:text-sm text-[#615B56] leading-relaxed font-light">
                Beauty without structural endurance is fleeting. We build internal carcases with water-resistant birch and European soft-close systems designed for 25+ years of operation.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Awards & Recognition */}
        <div className="py-16 border-t border-[#E8E3DA] mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#9E6938] font-medium">
                Accolades
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] mt-2">
                Press & Recognition
              </h2>
            </div>
            <p className="text-xs text-[#78716C] uppercase tracking-wider font-mono">
              Featured in Architectural Digest, Elle Decor & Design ID
            </p>
          </div>

          <div className="divide-y divide-[#E8E3DA]">
            {awards.map((award, idx) => (
              <div
                key={idx}
                className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start sm:items-center gap-6">
                  <span className="font-mono text-sm text-[#9E6938] shrink-0">{award.year}</span>
                  <div>
                    <h4 className="font-serif text-xl text-[#1C1917] group-hover:text-[#9E6938] transition-colors">
                      {award.title}
                    </h4>
                    <p className="text-xs text-[#78716C] mt-0.5">{award.note}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#C59B6D]" />
                  <span className="text-xs uppercase tracking-widest text-[#1C1917] font-medium">
                    {award.org}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 sm:p-12 bg-[#F5F2EC] border border-[#E8E3DA] rounded-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1917]">
              Want to visit our design atelier in Lavelle Road?
            </h3>
            <p className="text-xs sm:text-sm text-[#78716C] mt-1">
              Touch our physical material library and discuss your upcoming project over espresso.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 border border-[#1C1917] text-[#1C1917] hover:bg-[#1C1917] hover:text-[#FAF8F5] text-xs uppercase tracking-widest font-medium transition-colors rounded-xs cursor-pointer"
            >
              Studio Directions
            </button>
            <button
              onClick={() => onNavigate('quote')}
              className="px-6 py-3 bg-[#1C1917] text-[#FAF8F5] hover:bg-[#9E6938] text-xs uppercase tracking-widest font-medium transition-colors rounded-xs cursor-pointer"
            >
              Get a Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
