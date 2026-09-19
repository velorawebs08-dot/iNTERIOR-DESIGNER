import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, MapPin, Maximize2, Clock, Layers, User, Eye, Check } from 'lucide-react';
import { siteData } from '../siteData';
import { getProjectBySlug, getAllProjects } from '../lib/queries';
import { Project } from '../types';
import { Lightbox, LightboxImage } from '../components/Lightbox';

interface ProjectDetailPageProps {
  slug: string;
  onNavigate: (route: string, slug?: string) => void;
  onSelectProject: (slug: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  slug,
  onNavigate,
  onSelectProject
}) => {
  const initialProject = siteData.projects.find(p => p.slug === slug) || siteData.projects[0];
  const [project, setProject] = useState<Project>(initialProject);
  const [allProjects, setAllProjects] = useState<Project[]>(siteData.projects);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    async function loadProjectData() {
      setIsLoading(true);
      try {
        const [fetchedProject, allList] = await Promise.all([
          getProjectBySlug(slug),
          getAllProjects(),
        ]);
        if (isMounted) {
          if (fetchedProject) setProject(fetchedProject);
          if (allList && allList.length > 0) setAllProjects(allList);
        }
      } catch (err) {
        console.warn('Failed loading project detail from Supabase:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadProjectData();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Flatten all room images into a single array for smooth lightbox browsing
  const allProjectImages: LightboxImage[] = React.useMemo(() => {
    const list: LightboxImage[] = [];
    if (!project || !project.rooms) return list;
    project.rooms.forEach(roomGroup => {
      roomGroup.images.forEach(imgUrl => {
        list.push({
          url: imgUrl,
          roomType: roomGroup.roomType,
          projectTitle: project.title,
          projectSlug: project.slug,
        });
      });
    });
    return list;
  }, [project]);

  const openLightbox = (imageUrl: string) => {
    const idx = allProjectImages.findIndex(img => img.url === imageUrl);
    setLightboxIndex(idx >= 0 ? idx : 0);
    setLightboxOpen(true);
  };

  // Related projects (same category or others, excluding this one)
  const relatedProjects = allProjects
    .filter(p => p.slug !== project.slug)
    .slice(0, 3);

  return (
    <div id="project-detail-view" className="w-full bg-[#FAF8F5] pb-24">
      {/* Top back banner */}
      <div className="border-b border-[#E8E3DA] bg-[#FAF8F5]/80 backdrop-blur-xs py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            id="detail-back-btn"
            onClick={() => {
              onNavigate('projects');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#78716C] hover:text-[#1C1917] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Works</span>
          </button>

          <span className="text-xs uppercase tracking-widest text-[#9E6938] font-medium hidden sm:inline">
            Commission / {project.category}
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden bg-[#1C1917]">
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-[#141210]/30 to-transparent" />

        <div className="absolute bottom-0 inset-x-0 p-6 sm:p-12 lg:p-16">
          <div className="max-w-7xl mx-auto space-y-3">
            <span className="inline-block px-3 py-1 bg-[#FAF8F5] text-[#1C1917] text-xs uppercase tracking-widest font-medium rounded-xs">
              {project.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FAF8F5] font-normal leading-tight max-w-4xl">
              {project.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#D6CEBE] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#C59B6D]" />
              <span>{project.city}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Project Meta Strip & Spatial Specifications */}
      <div className="border-b border-[#E8E3DA] bg-[#F5F2EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center sm:text-left divide-y sm:divide-y-0 sm:divide-x divide-[#E8E3DA]">
            <div className="pt-3 sm:pt-0 sm:pr-6">
              <span className="block text-[11px] uppercase tracking-widest text-[#78716C] mb-1">
                Spatial Footprint
              </span>
              <span className="font-serif text-xl sm:text-2xl text-[#1C1917]">
                {project.area || 'Bespoke Area'}
              </span>
            </div>

            <div className="pt-3 sm:pt-0 sm:px-6">
              <span className="block text-[11px] uppercase tracking-widest text-[#78716C] mb-1">
                Execution Timeline
              </span>
              <span className="font-serif text-xl sm:text-2xl text-[#1C1917]">
                {project.duration || 'Complete Turnkey'}
              </span>
            </div>

            <div className="pt-3 sm:pt-0 sm:px-6">
              <span className="block text-[11px] uppercase tracking-widest text-[#78716C] mb-1">
                Client Classification
              </span>
              <span className="font-serif text-xl sm:text-2xl text-[#1C1917]">
                Private Residence
              </span>
            </div>

            <div className="pt-3 sm:pt-0 sm:pl-6">
              <span className="block text-[11px] uppercase tracking-widest text-[#78716C] mb-1">
                Design Lead
              </span>
              <span className="font-serif text-xl sm:text-2xl text-[#1C1917]">
                Atelier Veda
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Narrative & Philosophy Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Narrative (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#9E6938] font-medium block mb-2">
                Spatial Narrative & Intent
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] leading-tight">
                Refining Light, Texture, and Spatial Continuity
              </h2>
            </div>

            <p className="text-base sm:text-lg text-[#615B56] font-light leading-relaxed">
              {project.description}
            </p>

            {/* Architectural Highlights checklist */}
            <div className="p-8 bg-[#F5F2EC] border border-[#E8E3DA] rounded-xs space-y-4">
              <h3 className="font-serif text-xl text-[#1C1917]">Key Architectural Interventions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#44403C]">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#FAF8F5] border border-[#D6CEBE] flex items-center justify-center shrink-0 text-[#9E6938] mt-0.5">
                    <Check className="w-3 h-3" />
                  </span>
                  <span>Concealed architectural lighting with 2700K warm glow</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#FAF8F5] border border-[#D6CEBE] flex items-center justify-center shrink-0 text-[#9E6938] mt-0.5">
                    <Check className="w-3 h-3" />
                  </span>
                  <span>Custom fluted oak and walnut millwork cabinetry</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#FAF8F5] border border-[#D6CEBE] flex items-center justify-center shrink-0 text-[#9E6938] mt-0.5">
                    <Check className="w-3 h-3" />
                  </span>
                  <span>Handcrafted lime plaster & micro-cement wall finishes</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#FAF8F5] border border-[#D6CEBE] flex items-center justify-center shrink-0 text-[#9E6938] mt-0.5">
                    <Check className="w-3 h-3" />
                  </span>
                  <span>Custom acoustic baffle ceiling integration</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Palette & Quick Contact (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 bg-[#F5F2EC] border border-[#E8E3DA] rounded-xs space-y-4">
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#1C1917] font-medium">
                Material & Texture Palette
              </h4>
              <p className="text-xs text-[#78716C]">
                A sensory interplay of natural stone, bleached wood grains, and woven tactile textiles.
              </p>

              <div className="grid grid-cols-4 gap-2 pt-2">
                <div className="space-y-1.5 text-center">
                  <div className="w-full aspect-square rounded-xs bg-[#EAE5DC] border border-[#D6CEBE]" />
                  <span className="text-[10px] uppercase text-[#78716C] block">Travertine</span>
                </div>
                <div className="space-y-1.5 text-center">
                  <div className="w-full aspect-square rounded-xs bg-[#B89F82] border border-[#D6CEBE]" />
                  <span className="text-[10px] uppercase text-[#78716C] block">White Oak</span>
                </div>
                <div className="space-y-1.5 text-center">
                  <div className="w-full aspect-square rounded-xs bg-[#403934] border border-[#D6CEBE]" />
                  <span className="text-[10px] uppercase text-[#78716C] block">Charcoal</span>
                </div>
                <div className="space-y-1.5 text-center">
                  <div className="w-full aspect-square rounded-xs bg-[#C2A378] border border-[#D6CEBE]" />
                  <span className="text-[10px] uppercase text-[#78716C] block">Aged Brass</span>
                </div>
              </div>
            </div>

            <div className="p-6 border border-[#E8E3DA] rounded-xs bg-[#FAF8F5] space-y-4">
              <h4 className="font-serif text-xl text-[#1C1917]">
                Inspired by this project?
              </h4>
              <p className="text-xs text-[#78716C] leading-relaxed">
                Connect with our architects to understand budget estimates and feasibility for your space.
              </p>
              <button
                onClick={() => onNavigate('quote')}
                className="w-full py-3 bg-[#1C1917] text-[#FAF8F5] hover:bg-[#9E6938] text-xs uppercase tracking-widest font-medium transition-colors rounded-xs cursor-pointer shadow-xs inline-flex items-center justify-center gap-1.5"
              >
                <span>Request Quotation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Room by Room Photographic Showcase */}
        <div className="mt-24 space-y-16">
          <div className="border-b border-[#E8E3DA] pb-4">
            <span className="text-xs uppercase tracking-[0.25em] text-[#9E6938] font-medium block">
              Photographic Documentation
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] mt-1">
              Room-by-Room Spatial Tour
            </h2>
          </div>

          {project.rooms.map((roomGroup, idx) => (
            <div key={idx} className="space-y-6">
              <div className="flex items-center justify-between border-l-2 border-[#9E6938] pl-4">
                <div>
                  <h3 className="font-serif text-2xl text-[#1C1917]">
                    {roomGroup.roomType}
                  </h3>
                  <p className="text-xs text-[#78716C] uppercase tracking-wider">
                    {roomGroup.images.length} Captured Perspectives
                  </p>
                </div>
                <span className="text-xs text-[#78716C] italic hidden sm:inline">
                  Click any frame to expand
                </span>
              </div>

              {/* Photo grid for this specific room */}
              <div className={`grid gap-6 ${
                roomGroup.images.length === 1 
                  ? 'grid-cols-1 max-w-4xl' 
                  : roomGroup.images.length === 2 
                    ? 'grid-cols-1 sm:grid-cols-2' 
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              }`}>
                {roomGroup.images.map((imgUrl, imgIdx) => (
                  <div
                    key={imgIdx}
                    onClick={() => openLightbox(imgUrl)}
                    className="group relative aspect-4/3 overflow-hidden bg-[#E8E3DA] rounded-xs cursor-pointer border border-[#E8E3DA]"
                  >
                    <img
                      src={imgUrl}
                      alt={`${project.title} - ${roomGroup.roomType} frame ${imgIdx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[#1C1917]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="p-3 rounded-full bg-[#FAF8F5]/90 text-[#1C1917] shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                        <Maximize2 className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Related Projects Section */}
        {relatedProjects.length > 0 && (
          <div className="mt-28 pt-16 border-t border-[#E8E3DA] space-y-10">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#9E6938] font-medium block">
                  More From Atelier Veda
                </span>
                <h3 className="font-serif text-3xl text-[#1C1917] mt-1">
                  Explore Related Commissions
                </h3>
              </div>
              <button
                onClick={() => onNavigate('projects')}
                className="text-xs uppercase tracking-widest text-[#9E6938] hover:underline underline-offset-4 hidden sm:inline cursor-pointer"
              >
                View Full Index →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((rel) => (
                <div
                  key={rel.slug}
                  onClick={() => {
                    onSelectProject(rel.slug);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group cursor-pointer bg-[#F5F2EC] border border-[#E8E3DA] overflow-hidden rounded-xs transition-all hover:shadow-md"
                >
                  <div className="aspect-4/3 w-full overflow-hidden bg-[#E8E3DA]">
                    <img
                      src={rel.coverImage}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 space-y-1">
                    <span className="text-[11px] uppercase tracking-wider text-[#78716C]">{rel.city}</span>
                    <h4 className="font-serif text-xl text-[#1C1917] group-hover:text-[#9E6938] transition-colors">{rel.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Accessible Lightbox Modal */}
      <Lightbox
        isOpen={lightboxOpen}
        images={allProjectImages}
        initialIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
};
