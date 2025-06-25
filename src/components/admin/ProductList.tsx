import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Eye } from 'lucide-react';
import { useProducts, useDeleteProduct } from '@/hooks/useProducts';
import { toast } from '@/hooks/use-toast';

interface ProductListProps {
  onEdit?: (product: any) => void;
}

const ProductList = ({ onEdit }: ProductListProps) => {
  const { data: products, isLoading } = useProducts();
  const deleteProduct = useDeleteProduct();

  const handleDelete = async (id: string, name: string) => {
    console.log('Tentando deletar produto:', { id, name });
    
    if (confirm(`Tem certeza que deseja excluir o produto "${name}"?`)) {
      try {
        console.log('Confirmado, executando delete...');
        await deleteProduct.mutateAsync(id);
        console.log('Produto deletado com sucesso');
        toast({
          title: "Produto excluído!",
          description: "O produto foi excluído com sucesso.",
        });
      } catch (error) {
        console.error('Erro ao deletar produto:', error);
        toast({
          title: "Erro ao excluir produto",
          description: "Ocorreu um erro ao excluir o produto.",
          variant: "destructive",
        });
      }
    } else {
      console.log('Deleção cancelada pelo usuário');
    }
  };

  if (isLoading) {
    return <div>Carregando produtos...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Produtos Cadastrados ({products?.length || 0})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products?.map((product) => (
            <div key={product.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors gap-4 relative">
              <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                {product.image_url && (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 truncate">{product.name}</h4>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline" className="text-xs">
                      {product.categories?.icon} {product.categories?.name}
                    </Badge>
                    <Badge variant="outline" className="text-xs">{product.material}</Badge>
                    <Badge variant="outline" className="text-xs">{product.theme}</Badge>
                    {product.featured && (
                      <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs">
                        ✨ Destaque
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 relative z-10">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit?.(product)}
                  className="min-w-[40px] h-9 px-2 sm:px-3 action-button"
                  data-size="sm"
                >
                  <Edit className="w-4 h-4" />
                  <span className="sr-only">Editar</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:bg-red-50 hover:text-red-700 min-w-[40px] h-9 px-2 sm:px-3 action-button delete-button"
                  onClick={() => handleDelete(product.id, product.name)}
                  disabled={deleteProduct.isPending}
                  data-size="sm"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="sr-only">Excluir</span>
                </Button>
              </div>
            </div>
          ))}
          
          {products?.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhum produto cadastrado ainda.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductList;
