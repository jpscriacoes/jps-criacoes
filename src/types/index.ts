export interface DatabaseProduct {
  id: string;
  name: string;
  description: string;
  category_id: string;
  material: string;
  occasion: string;
  theme: string;
  image_url: string | null;
  featured: boolean;
  created_at: string;
  updated_at: string;
  categories?: {
    name: string;
    icon: string;
  };
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  created_at: string;
}

export interface TransformedProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  categoryId: string;
  material: string;
  occasion: string;
  theme: string;
  imageUrl: string;
  images: string[];
  featured: boolean;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

export interface FilterOptions {
  materials: string[];
  occasions: string[];
  themes: string[];
} 