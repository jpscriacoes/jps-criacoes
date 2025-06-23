import { DatabaseProduct, TransformedProduct } from '@/types';

export const transformProduct = (product: DatabaseProduct): TransformedProduct => {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.categories?.name || '',
    material: product.material,
    occasion: product.occasion,
    theme: product.theme,
    imageUrl: product.image_url || '/placeholder.svg',
    images: [product.image_url || '/placeholder.svg'],
    featured: product.featured,
    createdAt: product.created_at
  };
};

export const transformProducts = (products: DatabaseProduct[]): TransformedProduct[] => {
  return products.map(transformProduct);
}; 