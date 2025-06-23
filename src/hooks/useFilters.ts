import { useMemo } from 'react';
import { useProducts } from './useProducts';
import { FilterOptions } from '@/types';

export const useFilters = (): FilterOptions => {
  const { data: products } = useProducts();
  
  const filters = useMemo(() => {
    if (!products || products.length === 0) {
      return { materials: [], occasions: [], themes: [] };
    }
    
    const materials = [...new Set(products.map(p => p.material))].sort();
    const occasions = [...new Set(products.map(p => p.occasion))].sort();
    const themes = [...new Set(products.map(p => p.theme))].sort();
    
    return { materials, occasions, themes };
  }, [products]);

  return filters;
}; 