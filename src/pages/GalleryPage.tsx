import React, { useState, useEffect, useMemo } from 'react';
import { Filter, Eye, ArrowUpRight } from 'lucide-react';
import { siteData } from '../siteData';
import { getAllProjects } from '../lib/queries';
import { Project } from '../types';
import { Lightbox, LightboxImage } from '../components/Lightbox';

interface GalleryPageProps {
  onSelectProject: (slug: string) => void;
  onNavigate: (route: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onSelectProject, onNavigate }) => {
  const [selectedRoom, setSelectedRoom] = useState<string>('All');
  const [projects, setProjects] = useState<Project[]>(siteData.projects);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    async function loadProjects() {
      try {
        const data = await getAllProjects();
        if (isMounted && data && data.length > 0) {
          setProjects(data);
        }
      } catch (err) {
        console.warn('Failed loading gallery projects from Supabase:', err);
      }
    }
    loadProjects();
    return () => {
      isMounted = false;
    };
  }, []);

  // Extract all distinct room types across all projects
  const roomTypes = useMemo(() => {
    const set = new Set<string>();
    projects.forEach(p => {
      p.rooms?.forEach(r => set.add(r.roomType));
    });
    return ['All', ...Array.from(set)];
  }, [projects]);

  // Aggregate all room images with project associations
  const allGalleryItems = useMemo<LightboxImage[]>(() => {
    const items: LightboxImage[] = [];
    projects.forEach(project => {
      project.rooms?.forEach(roomGroup => {
        roomGroup.images?.forEach(imgUrl => {
          items.push({
            url: imgUrl,
            roomType: roomGroup.roomType,
            projectTitle: project.title,
            projectSlug: project.slug,
          });
        });
      });
    });
    return items;
  }, [projects]);

  // Filtered gallery items based on room selection
  const filteredItems = useMemo(() => {
    if (selectedRoom === 'All') return allGalleryItems;
    return allGalleryItems.filter(item => item.roomType === selectedRoom);
  }, [selectedRoom, allGalleryItems]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div id="master-gallery-page" className="w-full py-12 sm:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#9E6938] font-medium">
            <span>Spatial Archive</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1C1917] font-normal leading-tight">
            Master Room Galleries
          </h1>
          <p className="text-sm sm:text-base text-[#78716C] max-w-2xl font-light leading-relaxed">
            A comprehensive visual index of residential living spaces, bespoke culinary kitchens, bedroom sanctuaries, and luxury master baths across our finished projects.
          </p>
        </div>

        {/* Room Type Filters */}
        <div className="mb-12 pb-6 border-b border-[#E8E3DA] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
            <span className="text-xs uppercase tracking-widest text-[#78716C] flex items-center gap-1.5 mr-2">
              <Filter className="w-3.5 h-3.5 text-[#9E6938]" />
              <span>Room Type:</span>
            </span>

            {roomTypes.map((room) => {
              const count = room === 'All' 
                ? allGalleryItems.length 
                : allGalleryItems.filter(item => item.roomType === room).length;
              const isActive = selectedRoom === room;

              return (
                <button
                  key={room}
                  id={`room-filter-btn-${room.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setSelectedRoom(room)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider rounded-xs transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#1C1917] text-[#FAF8F5] shadow-xs font-medium'
                      : 'bg-[#F5F2EC] text-[#615B56] hover:bg-[#E8E3DA] hover:text-[#1C1917]'
                  }`}
                >
                  <span>{room}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-[#9E6938] text-white' : 'bg-[#E8E3DA] text-[#78716C]'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="text-xs text-[#78716C]">
            Displaying <span className="font-medium text-[#1C1917]">{filteredItems.length}</span> photographs
          </div>
        </div>

        {/* Gallery Masonry/Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={`${item.projectSlug}-${index}`}
              id={`gallery-item-${index}`}
              className="group relative overflow-hidden bg-[#E8E3DA] border border-[#E8E3DA] rounded-xs cursor-pointer aspect-4/3"
              onClick={() => openLightbox(index)}
            >
              <img
                src={item.url}
                alt={`${item.projectTitle} - ${item.roomType}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Hover Overlay with badges */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/85 via-[#141210]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 p-6 flex flex-col justify-between">
                <div className="flex justify-end">
                  <span className="px-3 py-1 bg-[#FAF8F5]/90 backdrop-blur-xs text-[#1C1917] text-[10px] uppercase tracking-widest font-medium rounded-xs">
                    {item.roomType}
                  </span>
                </div>

                <div className="space-y-1 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <p className="text-[11px] uppercase tracking-widest text-[#C59B6D]">
                    Project Commission
                  </p>
                  <h4 className="font-serif text-xl text-[#FAF8F5]">
                    {item.projectTitle}
                  </h4>
                  {item.projectSlug && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(item.projectSlug!);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-xs text-[#FAF8F5]/80 hover:text-white inline-flex items-center gap-1 pt-1 underline underline-offset-4 cursor-pointer"
                    >
                      <span>View full project</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Estimate Banner */}
        <div className="mt-20 p-8 sm:p-12 bg-[#F5F2EC] border border-[#E8E3DA] rounded-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1917]">
              Want a similar room aesthetic designed for your home?
            </h3>
            <p className="text-xs sm:text-sm text-[#78716C]">
              Select specific rooms and get an itemized budget estimate.
            </p>
          </div>
          <button
            onClick={() => onNavigate('quote')}
            className="px-8 py-3.5 bg-[#1C1917] text-[#FAF8F5] hover:bg-[#9E6938] text-xs uppercase tracking-widest font-medium transition-colors rounded-xs shrink-0 cursor-pointer shadow-xs"
          >
            Calculate Quote
          </button>
        </div>
      </div>

      {/* Lightbox Viewer */}
      <Lightbox
        isOpen={lightboxOpen}
        images={filteredItems}
        initialIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
};
