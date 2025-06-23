import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { DatabaseProduct, TransformedProduct } from '@/types';
import { transformProducts } from '@/lib/transformers';

export interface Product extends DatabaseProduct {}

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select(`
            *,
            categories (
              name,
              icon
            )
          `)
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Erro ao buscar produtos:', error);
          throw new Error('Falha ao carregar produtos');
        }
        
        return data as DatabaseProduct[];
      } catch (error) {
        console.error('Erro inesperado:', error);
        throw error;
      }
    },
    retry: 3,
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

export const useTransformedProducts = () => {
  const { data: products, isLoading, error } = useProducts();
  
  const transformedProducts = useMemo(() => {
    if (!products) return [];
    return transformProducts(products);
  }, [products]);

  return { 
    data: transformedProducts, 
    isLoading, 
    error,
    originalData: products 
  };
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (product: {
      name: string;
      description: string;
      category_id: string;
      material: string;
      occasion: string;
      theme: string;
      image_url?: string;
      featured?: boolean;
    }) => {
      try {
        const { data, error } = await supabase
          .from('products')
          .insert([{
            ...product,
            featured: product.featured || false
          }])
          .select()
          .single();
        
        if (error) {
          console.error('Erro ao criar produto:', error);
          throw new Error('Falha ao criar produto');
        }
        
        return data;
      } catch (error) {
        console.error('Erro inesperado:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error) => {
      console.error('Erro na mutação de criação:', error);
    }
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & Partial<DatabaseProduct>) => {
      try {
        const { data, error } = await supabase
          .from('products')
          .update({
            ...updates,
            updated_at: new Date().toISOString()
          })
          .eq('id', id)
          .select()
          .single();
        
        if (error) {
          console.error('Erro ao atualizar produto:', error);
          throw new Error('Falha ao atualizar produto');
        }
        
        return data;
      } catch (error) {
        console.error('Erro inesperado:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error) => {
      console.error('Erro na mutação de atualização:', error);
    }
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', id);
        
        if (error) {
          console.error('Erro ao excluir produto:', error);
          throw new Error('Falha ao excluir produto');
        }
      } catch (error) {
        console.error('Erro inesperado:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error) => {
      console.error('Erro na mutação de exclusão:', error);
    }
  });
};

export const useUploadProductImage = () => {
  return useMutation({
    mutationFn: async ({ file, productId }: { file: File; productId: string }) => {
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${productId}-${Date.now()}.${fileExt}`;
        
        const { data, error } = await supabase.storage
          .from('product-images')
          .upload(fileName, file);

        if (error) {
          console.error('Erro ao fazer upload:', error);
          throw new Error('Falha ao fazer upload da imagem');
        }

        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(fileName);

        return publicUrl;
      } catch (error) {
        console.error('Erro inesperado no upload:', error);
        throw error;
      }
    },
  });
};
