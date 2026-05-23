export type ProjectCategory = 'film' | 'real-estate' | 'events' | 'commercial' | 'construction';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  location: string;
  images: number[];
  video?: number;
  featured?: boolean;
}

export const categories: { key: ProjectCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'film', label: 'Film' },
  { key: 'real-estate', label: 'Real Estate' },
  { key: 'events', label: 'Events' },
  { key: 'commercial', label: 'Commercial' },
  { key: 'construction', label: 'Construction' },
];

export const projects: Project[] = [
  {
    id: 'uptown-skyline',
    title: 'Uptown Skyline',
    category: 'film',
    description: 'Sweeping aerial coverage of Charlotte\'s uptown skyline at golden hour. Captured for a documentary exploring the city\'s rapid growth.',
    location: 'Charlotte, NC',
    images: [0, 1, 2],
    video: 0,
  },
  {
    id: 'lakefront-estate',
    title: 'Lakefront Estate',
    category: 'real-estate',
    description: 'Full property showcase for a luxury lakefront listing. Aerial perspectives highlighting waterfront access, landscaping, and neighborhood context.',
    location: 'Lake Norman, NC',
    images: [3, 4, 5],
    video: 1,
  },
  {
    id: 'mountain-vista',
    title: 'Mountain Vista',
    category: 'film',
    description: 'Epic mountain range coverage for an outdoor adventure brand campaign. Dawn-to-dusk shoots capturing shifting light across the ridgeline.',
    location: 'Blue Ridge, NC',
    images: [6, 7, 8],
    video: 2,
    featured: true,
  },
  {
    id: 'corporate-campus',
    title: 'Corporate Campus',
    category: 'commercial',
    description: 'Aerial documentation of a Fortune 500 campus expansion. Used in investor presentations and internal communications.',
    location: 'Charlotte, NC',
    images: [9, 10, 11],
  },
  {
    id: 'garden-wedding',
    title: 'Garden Wedding',
    category: 'events',
    description: 'Aerial highlight reel for an outdoor garden ceremony. Cinematic overhead coverage of the venue, procession, and reception.',
    location: 'Asheville, NC',
    images: [12, 13, 14],
    video: 3,
  },
  {
    id: 'site-progress',
    title: 'Site Progress',
    category: 'construction',
    description: 'Monthly aerial progress documentation for a mixed-use development. Consistent angles and altitude for timeline comparison.',
    location: 'South End, Charlotte',
    images: [15, 16, 17],
  },
  {
    id: 'stadium-flyover',
    title: 'Stadium Flyover',
    category: 'commercial',
    description: 'Pre-event aerial coverage of a major sports venue. Dramatic low-altitude orbits and pull-away reveals for broadcast open.',
    location: 'Charlotte, NC',
    images: [18, 19, 20],
    video: 4,
    featured: true,
  },
];
