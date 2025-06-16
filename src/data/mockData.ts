
export interface Product {
  id: string;
  name: string;
  category: string;
  theme: string;
  material: string;
  occasion: string;
  imageUrl: string;
  images: string[];
  description: string;
  price?: number;
  featured: boolean;
  createdAt: string;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Topo Super-Heróis Personalizado',
    category: 'Infantil',
    theme: 'Super-Heróis',
    material: 'Acrílico',
    occasion: 'Aniversário',
    imageUrl: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&h=600&fit=crop'
    ],
    description: 'Topo de bolo temático dos super-heróis em acrílico premium com acabamento personalizado.',
    price: 45,
    featured: true,
    createdAt: '2024-06-15'
  },
  {
    id: '2',
    name: 'Decoração Romântica Casamento',
    category: 'Casamento',
    theme: 'Romântico',
    material: 'Biscuit',
    occasion: 'Casamento',
    imageUrl: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop'
    ],
    description: 'Delicada decoração em biscuit para casamentos com detalhes românticos e elegantes.',
    price: 85,
    featured: true,
    createdAt: '2024-06-14'
  },
  {
    id: '3',
    name: 'Topo Princesas Disney',
    category: 'Infantil',
    theme: 'Princesas',
    material: 'Acrílico',
    occasion: 'Aniversário',
    imageUrl: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&h=600&fit=crop'
    ],
    description: 'Topo encantado das princesas Disney em acrílico colorido com glitter especial.',
    price: 50,
    featured: false,
    createdAt: '2024-06-13'
  },
  {
    id: '4',
    name: 'Decoração Batizado Anjo',
    category: 'Religioso',
    theme: 'Anjo',
    material: 'Biscuit',
    occasion: 'Batizado',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop'
    ],
    description: 'Conjunto delicado para batizado com anjos em biscuit e detalhes em dourado.',
    price: 60,
    featured: false,
    createdAt: '2024-06-12'
  },
  {
    id: '5',
    name: 'Topo Festa Tropical',
    category: 'Festa',
    theme: 'Tropical',
    material: 'Acrílico',
    occasion: 'Aniversário',
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop'
    ],
    description: 'Topo vibrante com tema tropical, perfeito para festas de verão e poolparty.',
    price: 40,
    featured: true,
    createdAt: '2024-06-11'
  },
  {
    id: '6',
    name: 'Decoração Vintage Noivado',
    category: 'Casamento',
    theme: 'Vintage',
    material: 'Biscuit',
    occasion: 'Noivado',
    imageUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop'
    ],
    description: 'Decoração clássica vintage para noivados com acabamento artesanal em biscuit.',
    price: 70,
    featured: false,
    createdAt: '2024-06-10'
  }
];

export const categories = [
  { id: 'all', name: 'Todos', icon: '🎨' },
  { id: 'infantil', name: 'Infantil', icon: '🧸' },
  { id: 'casamento', name: 'Casamento', icon: '💍' },
  { id: 'religioso', name: 'Religioso', icon: '⛪' },
  { id: 'festa', name: 'Festa', icon: '🎉' }
];

export const materials = ['Acrílico', 'Biscuit', 'Papel', 'Madeira'];
export const occasions = ['Aniversário', 'Casamento', 'Batizado', 'Noivado', 'Festa'];
export const themes = ['Super-Heróis', 'Princesas', 'Romântico', 'Vintage', 'Tropical', 'Anjo'];
