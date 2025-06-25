import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import CategoryCarousel from '@/components/CategoryCarousel';
import { useProducts, useTransformedProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import { TransformedProduct } from '@/types';
import CategoryIcon from '@/components/CategoryIcon';
import PWALifecycle from '@/components/PWALifecycle';

const Index = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<TransformedProduct | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<string[]>(
    JSON.parse(localStorage.getItem('cake-toppers-favorites') || '[]')
  );

  // ✅ SIMPLIFICAR para debug
  const { data: products, isLoading: productsLoading, error: productsError } = useProducts();
  const { data: transformedProducts, isLoading: transformedLoading, error: transformedError } = useTransformedProducts();
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useCategories();

  // ✅ USAR dados transformados quando disponíveis, senão usar transformação manual
  const finalProducts = useMemo(() => {
    if (transformedProducts && transformedProducts.length > 0) {
      return transformedProducts;
    }
    
    // ✅ FALLBACK para transformação manual (compatibilidade)
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

  const featuredProducts = finalProducts.filter(product => product.featured);
  const recentProducts = finalProducts
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  const toggleFavorite = (productId: string) => {
    const newFavorites = favorites.includes(productId)
      ? favorites.filter(id => id !== productId)
      : [...favorites, productId];
    
    setFavorites(newFavorites);
    localStorage.setItem('cake-toppers-favorites', JSON.stringify(newFavorites));
  };

  const handleSearch = () => {
    navigate(`/catalog?search=${encodeURIComponent(searchTerm)}`);
  };

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/catalog?category=${categoryName}`);
  };

  const handleFavoritesClick = () => {
    navigate('/favorites');
  };

  // ✅ MELHORAR loading state
  if (productsLoading || categoriesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">✨</div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Carregando...</h3>
          <p className="text-sm text-gray-500 mt-2">Preparando sua experiência mágica</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Transforme sua festa em um
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent block">
              momento mágico ✨
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Descubra nossa coleção exclusiva de topos de bolo e decorações artesanais 
            personalizadas para tornar sua celebração única e especial.
          </p>
          
          {/* Search Bar */}
          <div className="flex gap-2 max-w-md mx-auto">
            <Input
              placeholder="Buscar por tema, ocasião..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/70 border-pink-200 focus:border-pink-400 dark:bg-gray-800/70 dark:border-pink-800"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button 
              onClick={handleSearch}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600"
            >
              Buscar
            </Button>
          </div>
        </section>

        {/* PWA Lifecycle Status - Mobile Only */}
        <div className="block md:hidden mb-8">
          <PWALifecycle />
        </div>

        {/* Featured Categories */}
        {categories && categories.length > 0 && (
          <section>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Explore por Categoria</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map((category) => (
                <Card
                  key={category.id}
                  className="gradient-card hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105"
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <CardContent className="p-6 text-center flex flex-col items-center justify-center">
                    <CategoryIcon icon={category.icon} className="mb-3 h-10 w-10 text-3xl" />
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">{category.name}</h4>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Products by Category */}
        {finalProducts.length > 0 && (
          <section>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Produtos Disponíveis</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {finalProducts.slice(0, 8).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={favorites.includes(product.id)}
                  onToggleFavorite={toggleFavorite}
                  onClick={setSelectedProduct}
                />
              ))}
            </div>
          </section>
        )}

        {/* PWA Lifecycle Status - Desktop Only */}
        <div className="hidden md:block mb-8">
          <div className="flex justify-center">
            <PWALifecycle />
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Product Detail Modal */}
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

export default Index;
