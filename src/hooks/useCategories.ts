import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Category } from '@/types';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      try {
        console.log('Buscando categorias...');
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('name');
        
        if (error) {
          console.error('Erro ao buscar categorias:', error);
          throw new Error('Falha ao carregar categorias');
        }
        
        console.log('Categorias carregadas:', data);
        return data as Category[];
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

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (category: { name: string; icon: string }) => {
      try {
        console.log('Criando categoria:', category);
        
        const { data, error } = await supabase
          .from('categories')
          .insert([{
            name: category.name.trim(),
            icon: category.icon.trim()
          }])
          .select()
          .single();
        
        if (error) {
          console.error('Erro ao criar categoria:', error);
          throw new Error('Falha ao criar categoria');
        }
        
        console.log('Categoria criada:', data);
        return data;
      } catch (error) {
        console.error('Erro inesperado:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error) => {
      console.error('Erro na mutação de criação:', error);
    }
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, name, icon }: { id: string; name: string; icon: string }) => {
      try {
        console.log('Atualizando categoria:', { id, name, icon });
        
        const updates = {
          name: name.trim(),
          icon: icon.trim()
        };
        
        const { data, error } = await supabase
          .from('categories')
          .update(updates)
          .eq('id', id)
          .select()
          .single();
        
        if (error) {
          console.error('Erro ao atualizar categoria:', error);
          throw new Error('Falha ao atualizar categoria');
        }
        
        console.log('Categoria atualizada:', data);
        return data;
      } catch (error) {
        console.error('Erro inesperado:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error) => {
      console.error('Erro na mutação de atualização:', error);
    }
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        console.log('Excluindo categoria:', id);
        
        const { error } = await supabase
          .from('categories')
          .delete()
          .eq('id', id);
        
        if (error) {
          console.error('Erro ao excluir categoria:', error);
          throw new Error('Falha ao excluir categoria');
        }
        
        console.log('Categoria excluída com sucesso');
      } catch (error) {
        console.error('Erro inesperado:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error) => {
      console.error('Erro na mutação de exclusão:', error);
    }
  });
};

export const useUploadCategoryImage = () => {
  return useMutation({
    mutationFn: async ({ file, categoryId }: { file: File; categoryId?: string }) => {
      try {
        const fileExt = file.name.split('.').pop();
        // Garante um nome único para a imagem
        const fileName = `${categoryId || 'new'}-${Date.now()}.${fileExt}`;
        
        const { data, error } = await supabase.storage
          .from('category-icons')
          .upload(fileName, file);

        if (error) {
          console.error('Erro detalhado do Supabase ao fazer upload:', error);
          throw new Error(`Falha no upload: ${error.message}`);
        }

        const { data: { publicUrl } } = supabase.storage
          .from('category-icons')
          .getPublicUrl(fileName);

        return publicUrl;
      } catch (error) {
        console.error('Erro inesperado no upload do ícone:', error);
        throw error;
      }
    },
  });
};
