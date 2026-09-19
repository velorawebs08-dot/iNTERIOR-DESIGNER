export type ProjectCategory = 'Residential' | 'Commercial' | 'Modular Kitchen' | 'Office';

export type RoomType = 'Living Room' | 'Kitchen' | 'Bedroom' | 'Office' | 'Full Home' | 'Dining' | 'Bathroom' | 'Other';

export interface RoomImageGroup {
  roomType: string;
  images: string[];
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  city: string;
  area: string;
  duration: string;
  clientType?: string;
  coverImage: string;
  description: string;
  concept?: string;
  palette?: string[];
  rooms: RoomImageGroup[];
}

export interface Service {
  id?: string;
  title: string;
  description: string;
  icon: string;
  deliverables?: string[];
  timeline?: string;
  idealFor?: string;
}

export interface Testimonial {
  clientName: string;
  quote: string;
  rating: number;
  project?: string;
  location?: string;
}

export interface StudioInfo {
  name: string;
  tagline: string;
  about: string;
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  city: string;
  instagram: string;
  pinterest?: string;
  linkedin?: string;
  mapEmbedUrl: string;
  yearsOfExperience?: number;
  completedProjects?: number;
}

export interface SiteData {
  studio: StudioInfo;
  services: Service[];
  projects: Project[];
  testimonials: Testimonial[];
  budgetRanges: string[];
  roomTypes: string[];
}

export interface QuotationRequest {
  id: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  city: string;
  roomTypes: string[];
  budgetRange: string;
  timeline: string;
  message?: string;
  createdAt: string;
}
