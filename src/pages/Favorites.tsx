
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import { useProducts } from '@/hooks/useProducts';

const Favorites = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorites, setFavorites] = useState<string[]>(
    JSON.parse(localStorage.getItem('cake-toppers-favorites') || '[]')
  );

  const { data: products, isLoading } = useProducts();

  // Transform and filter favorite products
  const favoriteProducts = products?.filter(product => 
    favorites.includes(product.id)
  ).map(product => ({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.categories?.name || '',
    material: product.material,
    occasion: product.occasion,
    theme: product.theme,
    imageUrl: product.image_url || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    images: [product.image_url || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'],
    featured: product.featured,
    createdAt: product.created_at
  })) || [];

  const toggleFavorite = (productId: string) => {
    const newFavorites = favorites.filter(id => id !== productId);
    setFavorites(newFavorites);
    localStorage.setItem('cake-toppers-favorites', JSON.stringify(newFavorites));
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    localStorage.setItem('cake-toppers-favorites', JSON.stringify([]));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">💖</div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Carregando favoritos...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {favoriteProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💖</div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Nenhum favorito ainda
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Explore nosso catálogo e adicione produtos aos seus favoritos!
            </p>
            <Button
              onClick={() => navigate('/catalog')}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600"
            >
              Explorar Catálogo
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {favoriteProducts.length} produto{favoriteProducts.length !== 1 ? 's' : ''} favorito{favoriteProducts.length !== 1 ? 's' : ''}
              </h2>
              
              <Button
                variant="outline"
                onClick={clearAllFavorites}
                className="border-pink-200 text-pink-600 hover:bg-pink-50 dark:border-pink-800 dark:text-pink-400 dark:hover:bg-pink-950"
              >
                Limpar Todos
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {favoriteProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={true}
                  onToggleFavorite={toggleFavorite}
                  onClick={setSelectedProduct}
                />
              ))}
            </div>
          </>
        )}
      </main>

      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        isFavorite={selectedProduct ? favorites.includes(selectedProduct.id) : false}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
};

export default Favorites;
