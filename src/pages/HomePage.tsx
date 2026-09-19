import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowUpRight, Compass, ShieldCheck, Clock, Eye, Sparkles, Home, LayoutGrid, Building2 } from 'lucide-react';
import { motion } from 'motion/react';
import { siteData } from '../siteData';
import { getFeaturedProjects, getSiteContent } from '../lib/queries';
import { TestimonialsCarousel } from '../components/TestimonialsCarousel';
import { Project } from '../types';

interface HomePageProps {
  onNavigate: (route: string, slug?: string) => void;
  onSelectProject: (slug: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectProject }) => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>(siteData.projects.slice(0, 4));
  const [siteContent, setSiteContent] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const [projects, content] = await Promise.all([
          getFeaturedProjects(),
          getSiteContent(),
        ]);
        if (isMounted) {
          if (projects && projects.length > 0) setFeaturedProjects(projects);
          if (content) setSiteContent(content);
        }
      } catch (err) {
        console.warn('Failed loading home data from Supabase:', err);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home':
        return <Home className="w-6 h-6 text-[#9E6938]" />;
      case 'LayoutGrid':
        return <LayoutGrid className="w-6 h-6 text-[#9E6938]" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-[#9E6938]" />;
      case 'Compass':
      default:
        return <Compass className="w-6 h-6 text-[#9E6938]" />;
    }
  };

  return (
    <div className="w-full">
      {/* 1. Hero Section: Full-bleed signature project showcase */}
      <section id="home-hero" className="relative min-h-[90vh] flex items-center justify-center bg-[#1C1917] overflow-hidden">
        {/* Background Image with warm architectural overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
            alt="Signature Interior Project by Atelier Veda"
            className="w-full h-full object-cover object-center scale-105 transform animate-pulse duration-[10000ms] opacity-60"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-[#141210]/45 to-[#141210]/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center text-[#FAF8F5] py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#FAF8F5]/20 bg-[#1C1917]/40 backdrop-blur-xs text-xs tracking-[0.25em] uppercase text-[#E7C79A]">
              <span>Bespoke Interior Architecture</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#FAF8F5] leading-[1.05]">
              {siteData.studio.name}
            </h1>

            <p className="max-w-2xl mx-auto font-sans text-base sm:text-xl text-[#D6CEBE] font-light tracking-wide leading-relaxed">
              {siteData.studio.tagline}
            </p>

            {/* CTAs */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                id="hero-view-work-btn"
                onClick={() => {
                  onNavigate('projects');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-4 bg-[#FAF8F5] text-[#1C1917] hover:bg-[#9E6938] hover:text-white text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-xs cursor-pointer shadow-lg inline-flex items-center justify-center gap-2 group"
              >
                <span>View Our Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-get-quote-btn"
                onClick={() => {
                  onNavigate('quote');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-[#FAF8F5]/40 text-[#FAF8F5] hover:bg-[#FAF8F5]/10 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-xs cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <span>Get a Quote</span>
                <ArrowUpRight className="w-4 h-4 text-[#C59B6D]" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom subtle specs strip */}
        <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-[#FAF8F5]/10 bg-[#141210]/60 backdrop-blur-xs py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between text-xs text-[#A8A29E] tracking-widest uppercase gap-4">
            <span>Bengaluru • Mumbai • Goa</span>
            <span className="hidden sm:inline">12+ Years Of Architectural Excellence</span>
            <span>140+ Turnkey Sanctuaries Completed</span>
          </div>
        </div>
      </section>

      {/* 2. Intro Strip: Studio Philosophy Statement */}
      <section id="home-intro" className="py-24 sm:py-28 bg-[#FAF8F5] border-b border-[#E8E3DA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] text-[#9E6938] font-medium">
            Studio Philosophy
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1C1917] leading-relaxed font-normal">
            "We believe true luxury is not ornamentation, but the quiet resonance of raw stone, honest joinery, and sunlight unfolding across a room."
          </h2>
          <div className="w-16 h-[1.5px] bg-[#9E6938] mx-auto mt-6" />
          <p className="text-sm sm:text-base text-[#78716C] max-w-2xl mx-auto leading-relaxed pt-2">
            Every home we design begins with an empathetic study of how you move, rest, and congregate. We strip away the unnecessary, crafting spaces where light, texture, and silence create a profound sense of calm.
          </p>
        </div>
      </section>

      {/* 3. Featured Projects */}
      <section id="home-featured-projects" className="py-24 bg-[#FAF8F5] border-b border-[#E8E3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#9E6938] font-medium">
                Portfolio Selection
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1917] font-normal">
                Featured Projects
              </h2>
            </div>
            <button
              id="featured-view-all-btn"
              onClick={() => {
                onNavigate('projects');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#1C1917] hover:text-[#9E6938] font-medium transition-colors cursor-pointer self-start md:self-auto"
            >
              <span>View All Projects ({siteData.projects.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {featuredProjects.map((project: Project, index: number) => (
              <div
                key={project.slug}
                id={`featured-card-${project.slug}`}
                onClick={() => onSelectProject(project.slug)}
                className="group cursor-pointer flex flex-col space-y-4"
              >
                {/* Image Frame */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#E8E3DA] rounded-xs">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    loading={index < 2 ? "eager" : "lazy"}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#FAF8F5]/90 backdrop-blur-xs text-[11px] uppercase tracking-wider text-[#1C1917] font-medium rounded-xs shadow-xs">
                      {project.category}
                    </span>
                  </div>

                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="px-3 py-1.5 bg-[#1C1917] text-[#FAF8F5] text-xs uppercase tracking-widest flex items-center gap-1 shadow-md">
                      <span>Explore</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#C59B6D]" />
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif text-2xl text-[#1C1917] group-hover:text-[#9E6938] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs uppercase tracking-wider text-[#78716C] mt-1">
                      {project.city} • {project.area}
                    </p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-[#A8A29E] group-hover:text-[#9E6938] transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Services Overview */}
      <section id="home-services-overview" className="py-24 bg-[#F5F2EC] border-b border-[#E8E3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs uppercase tracking-[0.25em] text-[#9E6938] font-medium">
              Bespoke Capabilities
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1917] font-normal mt-2">
              Holistic Design & Execution
            </h2>
            <p className="text-sm sm:text-base text-[#78716C] mt-3">
              We handle every step of your project from conceptual blueprints through on-site execution and white-glove handover.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteData.services.map((service) => (
              <div
                key={service.title}
                id={`service-card-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-[#FAF8F5] p-8 border border-[#E8E3DA] rounded-xs flex flex-col justify-between hover:border-[#9E6938]/50 hover:shadow-sm transition-all duration-300 group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xs bg-[#F5F2EC] flex items-center justify-center mb-6 group-hover:bg-[#1C1917] transition-colors">
                    {getServiceIcon(service.icon)}
                  </div>
                  <h3 className="font-serif text-xl text-[#1C1917] mb-3">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed line-clamp-4">
                    {service.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E8E3DA]">
                  <button
                    onClick={() => {
                      onNavigate('services');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#9E6938] hover:text-[#1C1917] font-medium transition-colors cursor-pointer"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why Us: 4 Value Props */}
      <section id="home-why-us" className="py-24 bg-[#FAF8F5] border-b border-[#E8E3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[#9E6938] font-medium">
              The Atelier Standard
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1917] font-normal mt-2">
              Why Discerning Clients Trust Us
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 border-t border-[#E8E3DA] space-y-3">
              <span className="font-mono text-xs text-[#9E6938]">01</span>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#9E6938]" />
                <h4 className="font-serif text-xl text-[#1C1917]">12+ Years Experience</h4>
              </div>
              <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed">
                Over 140 bespoke luxury homes, penthouses, and design studios executed with architectural rigor and precision.
              </p>
            </div>

            <div className="p-6 border-t border-[#E8E3DA] space-y-3">
              <span className="font-mono text-xs text-[#9E6938]">02</span>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#9E6938]" />
                <h4 className="font-serif text-xl text-[#1C1917]">Guaranteed Timelines</h4>
              </div>
              <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed">
                Detailed weekly milestone tracking and penalty-backed handover schedules ensure zero unnecessary delays.
              </p>
            </div>

            <div className="p-6 border-t border-[#E8E3DA] space-y-3">
              <span className="font-mono text-xs text-[#9E6938]">03</span>
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#9E6938]" />
                <h4 className="font-serif text-xl text-[#1C1917]">Photoreal 3D Previews</h4>
              </div>
              <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed">
                What you see is what we build. High-fidelity renders, exact material samples, and 1:1 lighting mockups before ground execution.
              </p>
            </div>

            <div className="p-6 border-t border-[#E8E3DA] space-y-3">
              <span className="font-mono text-xs text-[#9E6938]">04</span>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#9E6938]" />
                <h4 className="font-serif text-xl text-[#1C1917]">10-Year Hardware Warranty</h4>
              </div>
              <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed">
                We partner only with verified European hardware suppliers like Blum and Hafele, paired with marine-grade calibrated plywood.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials Carousel */}
      <section id="home-testimonials" className="py-20 bg-[#F5F2EC] border-b border-[#E8E3DA]">
        <TestimonialsCarousel />
      </section>

      {/* 7. CTA Section: Ready to design your space? */}
      <section id="home-cta-banner" className="py-24 bg-[#1C1917] text-[#FAF8F5] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C59B6D]">
            Begin Your Project
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight">
            Ready to design your space?
          </h2>
          <p className="text-sm sm:text-base text-[#A8A29E] max-w-xl mx-auto font-light leading-relaxed">
            Tell us about your home, layout goals, and vision. We will prepare an initial architectural concept and realistic estimate within 48 hours.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="cta-request-quote-btn"
              onClick={() => {
                onNavigate('quote');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 bg-[#FAF8F5] text-[#1C1917] hover:bg-[#9E6938] hover:text-white text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-xs cursor-pointer shadow-lg inline-flex items-center justify-center gap-2"
            >
              <span>Get an Instant Quote Estimate</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="cta-view-gallery-btn"
              onClick={() => {
                onNavigate('gallery');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-[#3D3732] text-[#FAF8F5] hover:border-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium transition-colors rounded-xs cursor-pointer"
            >
              <span>Browse Room Archives</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
