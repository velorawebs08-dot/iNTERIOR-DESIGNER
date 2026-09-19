import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { GalleryPage } from './pages/GalleryPage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { QuotePage } from './pages/QuotePage';
import { ContactPage } from './pages/ContactPage';
import { siteData } from './siteData';
import { getProjectBySlug, getSiteContent } from './lib/queries';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [currentSlug, setCurrentSlug] = useState<string>('');

  // Synchronize route with URL hash & pathname
  const parseRouteFromLocation = useCallback(() => {
    // Check hash first (e.g. #/projects/the-wabi-residence)
    const hash = window.location.hash.replace(/^#\/?/, '');
    const path = window.location.pathname.replace(/^\//, '');

    const target = hash || path;

    if (!target || target === '' || target === 'home') {
      setCurrentRoute('home');
      setCurrentSlug('');
    } else if (target.startsWith('projects/')) {
      const slug = target.replace('projects/', '');
      setCurrentRoute('project-detail');
      setCurrentSlug(slug);
    } else if (target === 'projects') {
      setCurrentRoute('projects');
      setCurrentSlug('');
    } else if (target === 'gallery' || target === 'rooms') {
      setCurrentRoute('gallery');
      setCurrentSlug('');
    } else if (target === 'services') {
      setCurrentRoute('services');
      setCurrentSlug('');
    } else if (target === 'about') {
      setCurrentRoute('about');
      setCurrentSlug('');
    } else if (target === 'quote' || target === 'quotation') {
      setCurrentRoute('quote');
      setCurrentSlug('');
    } else if (target === 'contact') {
      setCurrentRoute('contact');
      setCurrentSlug('');
    } else {
      setCurrentRoute('home');
      setCurrentSlug('');
    }
  }, []);

  useEffect(() => {
    parseRouteFromLocation();
    window.addEventListener('hashchange', parseRouteFromLocation);
    window.addEventListener('popstate', parseRouteFromLocation);
    return () => {
      window.removeEventListener('hashchange', parseRouteFromLocation);
      window.removeEventListener('popstate', parseRouteFromLocation);
    };
  }, [parseRouteFromLocation]);

  // Navigate handler
  const handleNavigate = (route: string, slug?: string) => {
    setCurrentRoute(route);
    if (slug) {
      setCurrentSlug(slug);
      window.location.hash = `/projects/${slug}`;
    } else {
      setCurrentSlug('');
      window.location.hash = route === 'home' ? '' : `/${route}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProject = (slug: string) => {
    handleNavigate('project-detail', slug);
  };

  // SEO & Document Meta Synchronization
  useEffect(() => {
    let isMounted = true;

    async function syncMeta() {
      let title = `${siteData.studio.name} | Bespoke Interior Architecture`;
      let description = siteData.studio.about.slice(0, 150) + '...';
      let ogImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80";

      if (currentRoute === 'projects') {
        title = `Portfolio of Interior Works | ${siteData.studio.name}`;
        description = "Browse our residential, commercial, modular kitchen, and luxury penthouse interior architectural commissions.";
      } else if (currentRoute === 'project-detail' && currentSlug) {
        const proj = await getProjectBySlug(currentSlug);
        if (proj && isMounted) {
          title = `${proj.title} (${proj.city}) | ${siteData.studio.name}`;
          description = proj.description.slice(0, 150) + '...';
          ogImage = proj.coverImage;
        }
      } else if (currentRoute === 'gallery') {
        title = `Master Room Galleries & Spatial Archive | ${siteData.studio.name}`;
        description = "Filter and explore rooms across all projects: living lounges, custom modular kitchens, master suites, and stone bathrooms.";
      } else if (currentRoute === 'services') {
        title = `Design Services & Turnkey Practice | ${siteData.studio.name}`;
        description = "Full home turnkey design, modular kitchen engineering, office spaces, and architectural 3D styling.";
      } else if (currentRoute === 'about') {
        title = `About Our Atelier & Philosophy | ${siteData.studio.name}`;
        description = "Learn about our 12+ years of architectural practice, design tenets, and principal architect Maya Veda.";
      } else if (currentRoute === 'quote') {
        title = `Request an Interior Quotation & Cost Breakdown | ${siteData.studio.name}`;
        description = "Estimate your space: select room types, budget range, and timeline to receive an architectural estimate.";
      } else if (currentRoute === 'contact') {
        title = `Visit Our Studio & Concierge | ${siteData.studio.name}`;
        description = "Atelier Veda studio location in Lavelle Road, Bengaluru. Telephone concierge, WhatsApp link, and visiting details.";
      }

      if (!isMounted) return;

      document.title = title;

      // Update OpenGraph tags
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', description);

      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', title);

      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', description);

      let ogImgTag = document.querySelector('meta[property="og:image"]');
      if (!ogImgTag) {
        ogImgTag = document.createElement('meta');
        ogImgTag.setAttribute('property', 'og:image');
        document.head.appendChild(ogImgTag);
      }
      ogImgTag.setAttribute('content', ogImage);
    }

    syncMeta();

    return () => {
      isMounted = false;
    };
  }, [currentRoute, currentSlug]);


  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1917]">
      {/* Editorial Navigation Header */}
      <Header
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area with Route Transitions */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRoute + (currentSlug ? `-${currentSlug}` : '')}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {currentRoute === 'home' && (
              <HomePage
                onNavigate={handleNavigate}
                onSelectProject={handleSelectProject}
              />
            )}

            {currentRoute === 'projects' && (
              <ProjectsPage
                onSelectProject={handleSelectProject}
                onNavigate={handleNavigate}
              />
            )}

            {currentRoute === 'project-detail' && (
              <ProjectDetailPage
                slug={currentSlug || siteData.projects[0].slug}
                onNavigate={handleNavigate}
                onSelectProject={handleSelectProject}
              />
            )}

            {currentRoute === 'gallery' && (
              <GalleryPage
                onSelectProject={handleSelectProject}
                onNavigate={handleNavigate}
              />
            )}

            {currentRoute === 'services' && (
              <ServicesPage
                onNavigate={handleNavigate}
              />
            )}

            {currentRoute === 'about' && (
              <AboutPage
                onNavigate={handleNavigate}
              />
            )}

            {currentRoute === 'quote' && (
              <QuotePage
                onNavigate={handleNavigate}
              />
            )}

            {currentRoute === 'contact' && (
              <ContactPage
                onNavigate={handleNavigate}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating WhatsApp Action Pill */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          id="floating-whatsapp-btn"
          href={`https://wa.me/${siteData.studio.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent("Hello Atelier Veda, I would like to consult about an interior design project.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 px-4 py-3 bg-[#1C1917] text-[#FAF8F5] hover:bg-[#25D366] hover:text-white rounded-full shadow-xl transition-all duration-300 border border-[#FAF8F5]/10"
          aria-label="Direct WhatsApp Concierge"
        >
          <MessageCircle className="w-5 h-5 text-[#25D366] group-hover:text-white transition-colors" />
          <span className="text-xs uppercase tracking-wider font-medium hidden sm:inline">
            WhatsApp Studio
          </span>
        </a>
      </div>

      {/* Editorial Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
