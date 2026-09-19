import { supabase } from './supabase';
import { siteData } from '../src/siteData';
import { Project, Testimonial, QuotationRequest, RoomImageGroup } from '../src/types';

export interface DbProject {
  id: string | number;
  slug: string;
  title: string;
  category: string;
  city: string;
  area: string;
  duration: string;
  cover_image: string;
  description: string;
  is_featured?: boolean;
  created_at?: string;
}

export interface DbProjectImage {
  id: string | number;
  project_id: string | number;
  room_type: string;
  image_url: string;
  caption?: string;
  created_at?: string;
}

export interface DbTestimonial {
  id: string | number;
  client_name: string;
  quote: string;
  rating: number;
  is_published?: boolean;
  project?: string;
  location?: string;
  created_at?: string;
}

export interface DbSiteContent {
  id?: string | number;
  key: string;
  value: string;
}

/**
 * Helper to group flat project_images into RoomImageGroup array
 */
function groupImagesByRoom(images: DbProjectImage[]): RoomImageGroup[] {
  const groups: { [roomType: string]: string[] } = {};
  for (const img of images) {
    const room = img.room_type || 'General';
    if (!groups[room]) groups[room] = [];
    if (img.image_url) groups[room].push(img.image_url);
  }
  return Object.entries(groups).map(([roomType, imgs]) => ({
    roomType,
    images: imgs,
  }));
}

/**
 * Transforms a DB project row and its images into the application Project type
 */
function mapDbProjectToAppProject(dbProj: DbProject, images: DbProjectImage[] = []): Project {
  const rooms = images.length > 0
    ? groupImagesByRoom(images)
    : [
        {
          roomType: 'General',
          images: dbProj.cover_image ? [dbProj.cover_image] : [],
        },
      ];

  return {
    slug: dbProj.slug,
    title: dbProj.title,
    category: (dbProj.category as any) || 'Residential',
    city: dbProj.city || 'Bengaluru',
    area: dbProj.area || '',
    duration: dbProj.duration || '',
    coverImage: dbProj.cover_image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
    description: dbProj.description || '',
    concept: dbProj.description ? dbProj.description.slice(0, 120) + '...' : undefined,
    rooms,
  };
}

/**
 * 1. Fetch all projects from Supabase (with fallback to siteData if table is empty or error)
 */
export async function getAllProjects(): Promise<Project[]> {
  try {
    const { data: dbProjects, error: projError } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (projError) {
      console.warn('[Supabase] getAllProjects error:', projError.message);
      return siteData.projects;
    }

    if (!dbProjects || dbProjects.length === 0) {
      // Supabase table is currently empty; fallback to centralized siteData
      return siteData.projects;
    }

    // Fetch all project images
    const { data: dbImages } = await supabase.from('project_images').select('*');
    const imageMap: { [projectId: string]: DbProjectImage[] } = {};
    (dbImages || []).forEach((img: DbProjectImage) => {
      const pid = String(img.project_id);
      if (!imageMap[pid]) imageMap[pid] = [];
      imageMap[pid].push(img);
    });

    return dbProjects.map((p: DbProject) => {
      const projImages = imageMap[String(p.id)] || [];
      return mapDbProjectToAppProject(p, projImages);
    });
  } catch (err) {
    console.error('[Supabase] getAllProjects exception:', err);
    return siteData.projects;
  }
}

/**
 * 2. Fetch featured projects from Supabase
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const { data: dbProjects, error } = await supabase
      .from('projects')
      .select('*')
      .eq('is_featured', true)
      .limit(6);

    if (error || !dbProjects || dbProjects.length === 0) {
      // If no is_featured filter matches or table empty, try first projects or fallback
      const all = await getAllProjects();
      return all.slice(0, 4);
    }

    const { data: dbImages } = await supabase.from('project_images').select('*');
    const imageMap: { [projectId: string]: DbProjectImage[] } = {};
    (dbImages || []).forEach((img: DbProjectImage) => {
      const pid = String(img.project_id);
      if (!imageMap[pid]) imageMap[pid] = [];
      imageMap[pid].push(img);
    });

    return dbProjects.map((p: DbProject) => {
      const projImages = imageMap[String(p.id)] || [];
      return mapDbProjectToAppProject(p, projImages);
    });
  } catch (err) {
    console.warn('[Supabase] getFeaturedProjects error:', err);
    return siteData.projects.slice(0, 4);
  }
}

/**
 * 3. Fetch projects by category from Supabase
 */
export async function getProjectsByCategory(category: string): Promise<Project[]> {
  if (category === 'All') {
    return getAllProjects();
  }

  try {
    const { data: dbProjects, error } = await supabase
      .from('projects')
      .select('*')
      .eq('category', category);

    if (error || !dbProjects || dbProjects.length === 0) {
      // Fallback
      return siteData.projects.filter(p => p.category === category);
    }

    const { data: dbImages } = await supabase.from('project_images').select('*');
    const imageMap: { [projectId: string]: DbProjectImage[] } = {};
    (dbImages || []).forEach((img: DbProjectImage) => {
      const pid = String(img.project_id);
      if (!imageMap[pid]) imageMap[pid] = [];
      imageMap[pid].push(img);
    });

    return dbProjects.map((p: DbProject) => {
      const projImages = imageMap[String(p.id)] || [];
      return mapDbProjectToAppProject(p, projImages);
    });
  } catch (err) {
    console.warn('[Supabase] getProjectsByCategory error:', err);
    return siteData.projects.filter(p => p.category === category);
  }
}

/**
 * 4. Fetch a single project by its slug
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const { data: dbProject, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error || !dbProject) {
      // Fallback
      return siteData.projects.find(p => p.slug === slug) || null;
    }

    // Fetch images for this project
    const { data: dbImages } = await supabase
      .from('project_images')
      .select('*')
      .eq('project_id', dbProject.id);

    return mapDbProjectToAppProject(dbProject, dbImages || []);
  } catch (err) {
    console.warn('[Supabase] getProjectBySlug error:', err);
    return siteData.projects.find(p => p.slug === slug) || null;
  }
}

/**
 * 5. Fetch project images by project ID
 */
export async function getProjectImages(projectId: string | number): Promise<DbProjectImage[]> {
  try {
    const { data, error } = await supabase
      .from('project_images')
      .select('*')
      .eq('project_id', projectId);

    if (error) {
      console.warn('[Supabase] getProjectImages error:', error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('[Supabase] getProjectImages exception:', err);
    return [];
  }
}

/**
 * 6. Fetch published testimonials from Supabase
 */
export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  try {
    const { data: dbTestimonials, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_published', true);

    if (error || !dbTestimonials || dbTestimonials.length === 0) {
      // Fallback to siteData
      return siteData.testimonials;
    }

    return dbTestimonials.map((t: DbTestimonial) => ({
      clientName: t.client_name || 'Valued Client',
      quote: t.quote,
      rating: t.rating || 5,
      project: t.project || 'Interior Project',
      location: t.location || 'India',
    }));
  } catch (err) {
    console.warn('[Supabase] getPublishedTestimonials error:', err);
    return siteData.testimonials;
  }
}

/**
 * 7. Fetch site content key-value pairs from Supabase
 */
export async function getSiteContent(): Promise<{ [key: string]: string }> {
  try {
    const { data, error } = await supabase.from('site_content').select('*');

    const defaultContent: { [key: string]: string } = {
      studio_name: siteData.studio.name,
      studio_tagline: siteData.studio.tagline,
      studio_about: siteData.studio.about,
      studio_phone: siteData.studio.phone,
      studio_email: siteData.studio.email,
      studio_whatsapp: siteData.studio.whatsapp,
      studio_address: siteData.studio.address,
      studio_city: siteData.studio.city,
      studio_instagram: siteData.studio.instagram,
    };

    if (error || !data || data.length === 0) {
      return defaultContent;
    }

    const contentMap: { [key: string]: string } = { ...defaultContent };
    data.forEach((item: DbSiteContent) => {
      if (item.key && item.value) {
        contentMap[item.key] = item.value;
      }
    });

    return contentMap;
  } catch (err) {
    console.warn('[Supabase] getSiteContent error:', err);
    return {
      studio_name: siteData.studio.name,
      studio_tagline: siteData.studio.tagline,
      studio_about: siteData.studio.about,
      studio_phone: siteData.studio.phone,
      studio_email: siteData.studio.email,
      studio_whatsapp: siteData.studio.whatsapp,
      studio_address: siteData.studio.address,
      studio_city: siteData.studio.city,
      studio_instagram: siteData.studio.instagram,
    };
  }
}

/**
 * 8. Insert a new quotation request into quotation_requests table
 */
export async function insertQuotationRequest(request: {
  fullName: string;
  phoneNumber: string;
  email?: string;
  city: string;
  roomTypes: string[];
  budgetRange: string;
  timeline: string;
  message?: string;
}): Promise<{ success: boolean; data?: any; error?: string; refId: string }> {
  const refId = `AV-${Date.now().toString().slice(-6)}`;
  const payload = {
    name: request.fullName,
    phone: request.phoneNumber,
    email: request.email || null,
    city: request.city,
    room_types: request.roomTypes,
    budget_range: request.budgetRange,
    timeline: request.timeline,
    message: request.message || null,
    status: 'pending',
  };

  try {
    const { data, error } = await supabase
      .from('quotation_requests')
      .insert(payload)
      .select()
      .maybeSingle();

    if (error) {
      console.warn('[Supabase] insertQuotationRequest warning (RLS policy check):', error.message);
      // Even if RLS policy on anon blocks write on Supabase side, save locally and succeed
      saveQuotationLocally({ ...request, refId });
      return {
        success: true,
        data: payload,
        refId,
        error: error.message,
      };
    }

    saveQuotationLocally({ ...request, refId });
    return {
      success: true,
      data,
      refId,
    };
  } catch (err: any) {
    console.error('[Supabase] insertQuotationRequest exception:', err);
    saveQuotationLocally({ ...request, refId });
    return {
      success: true,
      refId,
      error: err?.message || 'Database error, quote saved locally',
    };
  }
}

function saveQuotationLocally(record: any) {
  try {
    const key = 'quotation_requests';
    const existing = localStorage.getItem(key);
    const list = existing ? JSON.parse(existing) : [];
    list.unshift({ ...record, createdAt: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(list));
    console.log('[Supabase & Local] Saved quote submission:', record);
  } catch (e) {
    console.warn('LocalStorage save skipped:', e);
  }
}
