
import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import FilterBar from '@/components/FilterBar';
import ProductCard from '@/components/ProductCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import { mockProducts, Product } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

const Catalog = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [favorites, setFavorites] = useState<string[]>(
    JSON.parse(localStorage.getItem('cake-toppers-favorites') || '[]')
  );
  const [selectedFilters, setSelectedFilters] = useState({
    materials: [] as string[],
    occasions: [] as string[],
    themes: [] as string[]
  });

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || 
                            product.category.toLowerCase() === selectedCategory.toLowerCase();
      
      const matchesMaterial = selectedFilters.materials.length === 0 || 
                            selectedFilters.materials.includes(product.material);
      
      const matchesOccasion = selectedFilters.occasions.length === 0 || 
                            selectedFilters.occasions.includes(product.occasion);
      
      const matchesTheme = selectedFilters.themes.length === 0 || 
                         selectedFilters.themes.includes(product.theme);

      return matchesSearch && matchesCategory && matchesMaterial && matchesOccasion && matchesTheme;
    });
  }, [searchTerm, selectedCategory, selectedFilters]);

  const toggleFavorite = (productId: string) => {
    const newFavorites = favorites.includes(productId)
      ? favorites.filter(id => id !== productId)
      : [...favorites, productId];
    
    setFavorites(newFavorites);
    localStorage.setItem('cake-toppers-favorites', JSON.stringify(newFavorites));
  };

  const handleFavoritesClick = () => {
    navigate('/favorites');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <Header 
        title="Catálogo" 
        showFavorites 
        onFavoritesClick={handleFavoritesClick}
        favoriteCount={favorites.length}
      />
      
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedFilters={selectedFilters}
        onFiltersChange={setSelectedFilters}
      />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-500">
              Tente ajustar os filtros ou termo de busca
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={favorites.includes(product.id)}
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

export default Catalog;
