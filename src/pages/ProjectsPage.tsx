import React, { useState, useEffect, useMemo } from 'react';
import { ArrowUpRight, Filter } from 'lucide-react';
import { siteData } from '../siteData';
import { getAllProjects } from '../lib/queries';
import { Project } from '../types';

interface ProjectsPageProps {
  onSelectProject: (slug: string) => void;
  onNavigate: (route: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onSelectProject, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [projects, setProjects] = useState<Project[]>(siteData.projects);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const categories: string[] = ['All', 'Residential', 'Commercial', 'Modular Kitchen', 'Office'];

  useEffect(() => {
    let isMounted = true;
    async function loadProjects() {
      try {
        const data = await getAllProjects();
        if (isMounted && data && data.length > 0) {
          setProjects(data);
        }
      } catch (err) {
        console.warn('Failed loading projects from Supabase:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadProjects();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return projects;
    return projects.filter(p => p.category === selectedCategory);
  }, [projects, selectedCategory]);

  return (
    <div id="projects-page" className="w-full py-12 sm:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#9E6938] font-medium">
            <span>Portfolio Catalog</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1C1917] font-normal leading-tight">
            Selected Architectural Works
          </h1>
          <p className="text-sm sm:text-base text-[#78716C] max-w-2xl font-light leading-relaxed">
            Explore our curated residential residences, sculptural modular kitchens, and contemporary commercial creative workspaces.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-12 pb-6 border-b border-[#E8E3DA] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
            <span className="text-xs uppercase tracking-widest text-[#78716C] flex items-center gap-1.5 mr-2">
              <Filter className="w-3.5 h-3.5 text-[#9E6938]" />
              <span>Filter:</span>
            </span>

            {categories.map((cat) => {
              const count = cat === 'All' 
                ? projects.length 
                : projects.filter(p => p.category === cat).length;
              const isActive = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  id={`filter-btn-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider rounded-xs transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#1C1917] text-[#FAF8F5] shadow-xs font-medium'
                      : 'bg-[#F5F2EC] text-[#615B56] hover:bg-[#E8E3DA] hover:text-[#1C1917]'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-[#9E6938] text-white' : 'bg-[#E8E3DA] text-[#78716C]'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="text-xs text-[#78716C]">
            Showing <span className="font-medium text-[#1C1917]">{filteredProjects.length}</span> commissions
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredProjects.map((project) => (
            <div
              key={project.slug}
              id={`project-card-${project.slug}`}
              onClick={() => onSelectProject(project.slug)}
              className="group cursor-pointer flex flex-col bg-[#F5F2EC] border border-[#E8E3DA] overflow-hidden rounded-xs transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Image with zoom on hover */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-[#E8E3DA]">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#1C1917]/85 backdrop-blur-xs text-[#FAF8F5] text-[11px] uppercase tracking-widest font-medium rounded-xs">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Card Meta & Content */}
              <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#78716C] uppercase tracking-wider">
                    <span>{project.city}</span>
                    <span>{project.area}</span>
                  </div>
                  <h3 className="font-serif text-2xl text-[#1C1917] group-hover:text-[#9E6938] transition-colors leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#615B56] line-clamp-2 font-light leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8E3DA] flex items-center justify-between text-xs">
                  <span className="text-[#78716C]">
                    Duration: <span className="font-medium text-[#1C1917]">{project.duration}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium text-[#9E6938] group-hover:translate-x-0.5 transition-transform uppercase tracking-wider text-[11px]">
                    <span>View Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-20 p-8 sm:p-12 bg-[#F5F2EC] border border-[#E8E3DA] rounded-xs flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1917]">
              Have a distinct floor plan or property in mind?
            </h3>
            <p className="text-xs sm:text-sm text-[#78716C] max-w-xl">
              We design bespoke spaces starting with our preliminary 3D concept walk-through.
            </p>
          </div>
          <button
            onClick={() => onNavigate('quote')}
            className="px-8 py-3.5 bg-[#1C1917] text-[#FAF8F5] hover:bg-[#9E6938] text-xs uppercase tracking-widest font-medium transition-colors rounded-xs shrink-0 cursor-pointer shadow-xs"
          >
            Request a Consultation
          </button>
        </div>
      </div>
    </div>
  );
};
