export interface Profile {
  id: string;
  full_name: string;
  avatar_url?: string;
  bio?: string;
  title?: string;
  updated_at: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  order_index: number;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  thumbnail_url: string;
  demo_url?: string;
  technologies: string[];
  is_featured: boolean;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_role: string;
  content: string;
  avatar_url?: string;
  rating: number;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service_requested?: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author_id: string;
  cover_image: string;
  category: string;
  status: 'draft' | 'published';
  published_at: string;
  created_at: string;
  updated_at: string;
}
