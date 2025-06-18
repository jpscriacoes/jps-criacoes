
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Category {
  id: string;
  name: string;
  icon: string;
  created_at: string;
}

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      console.log('Buscando categorias...');
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Erro ao buscar categorias:', error);
        throw error;
      }
      
      console.log('Categorias carregadas:', data);
      return data as Category[];
    },
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (category: { name: string; icon: string }) => {
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
        throw error;
      }
      
      console.log('Categoria criada:', data);
      return data;
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
        throw error;
      }
      
      console.log('Categoria atualizada:', data);
      return data;
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
      console.log('Excluindo categoria:', id);
      
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Erro ao excluir categoria:', error);
        throw error;
      }
      
      console.log('Categoria excluída com sucesso');
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
