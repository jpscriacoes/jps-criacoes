import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FilterBar from '@/components/FilterBar';
import ProductCard from '@/components/ProductCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import { useNavigate } from 'react-router-dom';
import { useProducts, useTransformedProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';

const Catalog = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorites, setFavorites] = useState<string[]>(
    JSON.parse(localStorage.getItem('cake-toppers-favorites') || '[]')
  );
  const [selectedFilters, setSelectedFilters] = useState({
    materials: [] as string[],
    occasions: [] as string[],
    themes: [] as string[]
  });

  const { data: products, isLoading } = useProducts();
  const { data: transformedProducts } = useTransformedProducts();
  const { data: categories } = useCategories();

  const finalProducts = useMemo(() => {
    if (transformedProducts && transformedProducts.length > 0) {
      return transformedProducts;
    }
    
    return products?.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      category: product.categories?.name || '',
      categoryId: product.category_id,
      material: product.material,
      occasion: product.occasion,
      theme: product.theme,
      imageUrl: product.image_url || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      images: [product.image_url || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'],
      featured: product.featured,
      createdAt: product.created_at
    })) || [];
  }, [transformedProducts, products]);

  const filteredProducts = useMemo(() => {
    if (!finalProducts) return [];
    
    return finalProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || 
                            product.categoryId === selectedCategory;
      
      const matchesMaterial = selectedFilters.materials.length === 0 || 
                            selectedFilters.materials.includes(product.material);
      
      const matchesOccasion = selectedFilters.occasions.length === 0 || 
                            selectedFilters.occasions.includes(product.occasion);
      
      const matchesTheme = selectedFilters.themes.length === 0 || 
                         selectedFilters.themes.includes(product.theme);

      return matchesSearch && matchesCategory && matchesMaterial && matchesOccasion && matchesTheme;
    });
  }, [finalProducts, searchTerm, selectedCategory, selectedFilters]);

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎨</div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Carregando produtos...</h3>
          <p className="text-sm text-gray-500 mt-2">Preparando seu catálogo personalizado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col">
      <Header />
      
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedFilters={selectedFilters}
        onFiltersChange={setSelectedFilters}
      />

      <main className="max-w-7xl mx-auto px-4 py-6 flex-1">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Tente ajustar os filtros ou termo de busca
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
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

      <Footer />

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
