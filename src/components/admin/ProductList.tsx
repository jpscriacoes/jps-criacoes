
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
    if (confirm(`Tem certeza que deseja excluir o produto "${name}"?`)) {
      try {
        await deleteProduct.mutateAsync(id);
        toast({
          title: "Produto excluído!",
          description: "O produto foi excluído com sucesso.",
        });
      } catch (error) {
        toast({
          title: "Erro ao excluir produto",
          description: "Ocorreu um erro ao excluir o produto.",
          variant: "destructive",
        });
      }
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
            <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                {product.image_url && (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{product.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline">
                      {product.categories?.icon} {product.categories?.name}
                    </Badge>
                    <Badge variant="outline">{product.material}</Badge>
                    <Badge variant="outline">{product.theme}</Badge>
                    {product.featured && (
                      <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                        ✨ Destaque
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit?.(product)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:bg-red-50"
                  onClick={() => handleDelete(product.id, product.name)}
                  disabled={deleteProduct.isPending}
                >
                  <Trash2 className="w-4 h-4" />
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
