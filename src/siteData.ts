import { SiteData } from './types';

export const siteData: SiteData = {
  studio: {
    name: "Atelier Veda",
    tagline: "Warm, mindful spaces crafted for timeless living.",
    about: "Atelier Veda is an architectural interior design studio dedicated to calm, tactile, and light-filled spaces. We unite honest natural materials—raw travertine, warm white oak, micro-cement, and fluted glass—with bespoke millwork and quiet elegance. With over a decade of design practice, our philosophy centers on creating sensory homes that nurture tranquility and effortless everyday living.",
    phone: "+91 98450 18234",
    email: "concierge@atelierveda.com",
    whatsapp: "+919845018234",
    address: "14/B, Design Quarter, Lavelle Road",
    city: "Bengaluru, Karnataka 560001",
    instagram: "https://instagram.com/atelierveda.interiors",
    pinterest: "https://pinterest.com/atelierveda",
    linkedin: "https://linkedin.com/company/atelier-veda",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.985448377852!2d77.59600127598858!3d12.972793214856755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae167990c88383%3A0xe7a5059639537bc2!2sLavelle%20Road%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin",
    yearsOfExperience: 12,
    completedProjects: 140,
  },
  services: [
    {
      id: "full-home",
      title: "Full Home Design",
      description: "End-to-end turnkey architectural interior transformations for apartments, penthouses, and villas. From structural space planning to custom bespoke millwork, curated lighting, and soft styling.",
      icon: "Home",
      timeline: "12–16 Weeks",
      idealFor: "New homeowners and complete gut renovations wanting seamless single-point accountability.",
      deliverables: [
        "Comprehensive 2D architectural space planning & MEP layouts",
        "Photorealistic 3D visualizations & VR walkthroughs",
        "Custom joinery, modular storage & bespoke furniture production",
        "Curated material palettes (stone, wood, linen, brass)",
        "On-site project execution, vendor management & final styling"
      ]
    },
    {
      id: "modular-kitchen",
      title: "Modular Kitchen & Joinery",
      description: "Ergonomically engineered culinary spaces and precision wardrobe systems crafted with European hardware, moisture-resistant substrates, and tactile tactile veneers.",
      icon: "LayoutGrid",
      timeline: "4–6 Weeks",
      idealFor: "Clients wanting a high-performance kitchen with architectural elegance and zero wasted space.",
      deliverables: [
        "Golden work-triangle layout optimization & pantry engineering",
        "Anti-fingerprint matte laminates, fluted oak or lacquered glass shutters",
        "Austrian Blum/Hafele soft-close runners, organizers & pull-outs",
        "Heat & stain-resistant quartz or sintered stone countertops",
        "Integrated task lighting, hidden appliances & downdraft ducting"
      ]
    },
    {
      id: "commercial-interiors",
      title: "Commercial & Office Spaces",
      description: "Brand-elevating workplace interiors, boutique retail studios, and lifestyle cafes that foster creativity, acoustic comfort, and collaborative culture.",
      icon: "Building2",
      timeline: "8–12 Weeks",
      idealFor: "Creative agencies, executive suites, tech studios, and boutique retail flagships.",
      deliverables: [
        "Acoustic zoning, biophilic design & natural daylight routing",
        "Executive boardrooms, private pods & open collaborative hot-desks",
        "Statement reception lounges with custom sculptural desks",
        "Commercial-grade HVAC, cabling & smart automated lighting systems",
        "Brand narrative integration through architectural art & textures"
      ]
    },
    {
      id: "design-consultation",
      title: "Design Consultation & 3D Styling",
      description: "Focused advisory sessions for clients who need expert architectural direction, lighting schemes, paint schedules, or high-fidelity 3D visualization before construction.",
      icon: "Compass",
      timeline: "2–3 Weeks",
      idealFor: "Homeowners seeking professional design blueprints and shopping curation to execute independently.",
      deliverables: [
        "In-depth 90-minute design discovery & space audit",
        "Curated color, moodboard & material sample specification",
        "2D furniture placement layout with exact dimensions",
        "Lighting temperature & fixture placement roadmap",
        "Direct trade vendor shopping directory with exclusive designer pricing"
      ]
    }
  ],
  projects: [
    {
      slug: "the-wabi-residence",
      title: "The Wabi Residence",
      category: "Residential",
      city: "Bengaluru",
      area: "3,800 sq ft",
      duration: "14 Weeks",
      clientType: "Private Residential",
      coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
      description: "A serene 4-bedroom sanctuary conceived around the Japanese philosophy of Wabi-Sabi. The project embraces natural imperfections with lime-plastered walls, reclaimed teak wood beams, custom low-slung linen seating, and floor-to-ceiling sheer drapery filtering tropical morning light.",
      concept: "Warm minimalism layered with organic textures and continuous sightlines.",
      palette: ["#E6E0D4", "#C8B9A6", "#8F7D6B", "#2B2623"],
      rooms: [
        {
          roomType: "Living Room",
          images: [
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
          ]
        },
        {
          roomType: "Kitchen",
          images: [
            "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1200&q=80"
          ]
        },
        {
          roomType: "Bedroom",
          images: [
            "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80"
          ]
        },
        {
          roomType: "Bathroom",
          images: [
            "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
          ]
        }
      ]
    },
    {
      slug: "terracotta-loft",
      title: "Terracotta Loft Penthouse",
      category: "Residential",
      city: "Mumbai",
      area: "2,950 sq ft",
      duration: "12 Weeks",
      clientType: "Creative Director",
      coverImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
      description: "Perched high above the Arabian Sea, this penthouse marries Mediterranean warmth with modern industrial lines. Hand-pressed terracotta tiles, fluted walnut cabinetry, and warm travertine countertops establish a grounded, sun-drenched coastal retreat.",
      concept: "Sunlit coastal earthiness accented with patinated brass and sculptured alcoves.",
      palette: ["#D48C68", "#F3ECE1", "#5C3D2E", "#22201D"],
      rooms: [
        {
          roomType: "Living Room",
          images: [
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
          ]
        },
        {
          roomType: "Kitchen",
          images: [
            "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80"
          ]
        },
        {
          roomType: "Bedroom",
          images: [
            "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?auto=format&fit=crop&w=1200&q=80"
          ]
        }
      ]
    },
    {
      slug: "the-lumina-kitchen",
      title: "The Lumina Culinary Suite",
      category: "Modular Kitchen",
      city: "Bengaluru",
      area: "480 sq ft",
      duration: "5 Weeks",
      clientType: "Culinary Enthusiast",
      coverImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1400&q=80",
      description: "An architectural showcase kitchen engineered for both gourmet entertaining and quiet family mornings. Features seamlessly integrated German appliances, smoked oak veneer panels, a 12-foot waterfall Calacatta island, and hidden walk-in butler's pantry.",
      concept: "Sculptural precision where culinary utility disappears behind monolithic surfaces.",
      palette: ["#3D3A37", "#EFECE6", "#A58C73", "#1A1918"],
      rooms: [
        {
          roomType: "Kitchen",
          images: [
            "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80"
          ]
        },
        {
          roomType: "Dining",
          images: [
            "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80"
          ]
        }
      ]
    },
    {
      slug: "kanvas-creative-studio",
      title: "Kanvas Creative Studio",
      category: "Commercial",
      city: "Hyderabad",
      area: "4,500 sq ft",
      duration: "10 Weeks",
      clientType: "Architecture & Branding Agency",
      coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80",
      description: "A conversion of an old warehouse into a light-flooded design studio. Preserved concrete columns contrast against acoustic felt ceilings, arched acoustic telephone booths, custom birch plywood desks, and a sunken presentation pit.",
      concept: "Flexible biophilic workspace designed to spark creative friction and flow.",
      palette: ["#D8D3CD", "#7D827A", "#4A4D49", "#C27D56"],
      rooms: [
        {
          roomType: "Office",
          images: [
            "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80"
          ]
        }
      ]
    },
    {
      slug: "solace-executive-office",
      title: "Solace Family Office",
      category: "Office",
      city: "Delhi NCR",
      area: "3,200 sq ft",
      duration: "8 Weeks",
      clientType: "Investment Advisory",
      coverImage: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1400&q=80",
      description: "A private wealth management suite balancing rigorous security with hospitality-grade luxury. Deep smoked eucalyptus wall paneling, sound-damped double-glazed partitions, custom saddle-leather boardroom chairs, and private whiskey library.",
      concept: "Understated executive grandeur grounded in tailored craftsmanship.",
      palette: ["#232120", "#B2977D", "#EBE7DF", "#4A3F35"],
      rooms: [
        {
          roomType: "Office",
          images: [
            "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80"
          ]
        }
      ]
    },
    {
      slug: "the-zenith-villa",
      title: "The Zenith Tropical Villa",
      category: "Residential",
      city: "Goa",
      area: "5,400 sq ft",
      duration: "18 Weeks",
      clientType: "Vacation Estate",
      coverImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80",
      description: "An open-air contemporary villa nestled amidst coconut groves. Featuring seamless indoor-outdoor terrazzo flooring, louvered teak screens, open-sky courtyard showers, and customized hand-cast bronze lighting.",
      concept: "Tropical modernism celebrating monsoon breezes, natural stones, and filtered shadows.",
      palette: ["#ECE7DF", "#A79D8E", "#3B4136", "#7B5738"],
      rooms: [
        {
          roomType: "Living Room",
          images: [
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80"
          ]
        },
        {
          roomType: "Bedroom",
          images: [
            "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80"
          ]
        },
        {
          roomType: "Bathroom",
          images: [
            "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
          ]
        }
      ]
    }
  ],
  testimonials: [
    {
      clientName: "Ananya & Rohan Deshmukh",
      quote: "Atelier Veda turned our duplex into an absolute sanctuary. What stood out the most was their obsession with tactile materials and how carefully they listened. The project was handed over two days ahead of schedule, exactly matching the 3D renders.",
      rating: 5,
      project: "The Wabi Residence",
      location: "Bengaluru"
    },
    {
      clientName: "Vikram Singhania",
      quote: "Our creative studio required a space that wasn't a standard corporate office. Maya and her team engineered an environment that our team actually loves coming to every single morning. The acoustic zoning and custom joinery are world-class.",
      rating: 5,
      project: "Kanvas Creative Studio",
      location: "Hyderabad"
    },
    {
      clientName: "Dr. Priyamvada Sen",
      quote: "The modular kitchen they designed for our penthouse is nothing short of an architectural marvel. Every drawer has a purpose, the lighting is museum-grade, and the sintered stone island is the heart of all our dinners.",
      rating: 5,
      project: "The Lumina Culinary Suite",
      location: "Bengaluru"
    },
    {
      clientName: "Sameer & Tanvi Mehra",
      quote: "From the initial moodboards to the final cushion placed on handover day, the transparency and craftsmanship were impeccable. They treated our budget with complete respect and delivered a home that feels like an art piece.",
      rating: 5,
      project: "Terracotta Loft Penthouse",
      location: "Mumbai"
    }
  ],
  budgetRanges: ["Under ₹2L", "₹2L–5L", "₹5L–10L", "₹10L+"],
  roomTypes: ["Living Room", "Kitchen", "Bedroom", "Office", "Full Home", "Other"]
};
