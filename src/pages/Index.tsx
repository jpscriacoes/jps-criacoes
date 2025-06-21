
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import CategoryCarousel from '@/components/CategoryCarousel';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';

const Index = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<string[]>(
    JSON.parse(localStorage.getItem('cake-toppers-favorites') || '[]')
  );

  const { data: products, isLoading: productsLoading } = useProducts();
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  // Transform database products to match existing component structure
  const transformedProducts = products?.map(product => ({
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

  const featuredProducts = transformedProducts.filter(product => product.featured);
  const recentProducts = transformedProducts
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

  if (productsLoading || categoriesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">✨</div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Carregando...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">
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

        {/* Categories Section */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Explore por Categoria</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories?.map((category) => (
              <Card
                key={category.id}
                className="gradient-card hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105"
                onClick={() => handleCategoryClick(category.name)}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">{category.icon}</div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">{category.name}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Category Carousels */}
        <section className="space-y-8">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Produtos por Categoria</h3>
          {categories?.map((category) => (
            <CategoryCarousel
              key={category.id}
              categoryId={category.id}
              categoryName={category.name}
              categoryIcon={category.icon}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onProductClick={setSelectedProduct}
            />
          ))}
        </section>

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">✨ Produtos em Destaque</h3>
              <Button
                variant="outline"
                onClick={() => navigate('/catalog')}
                className="border-pink-200 text-pink-600 hover:bg-pink-50 dark:border-pink-800 dark:text-pink-400 dark:hover:bg-pink-950"
              >
                Ver Todos
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {featuredProducts.slice(0, 4).map((product) => (
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

        {/* Recent Products */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">🆕 Novidades</h3>
            <Button
              variant="outline"
              onClick={() => navigate('/catalog')}
              className="border-purple-200 text-purple-600 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-400 dark:hover:bg-purple-950"
            >
              Ver Catálogo Completo
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {recentProducts.map((product) => (
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

        {/* Call to Action */}
        <section className="text-center py-12 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-2xl">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Encontrou algo que amou? 💝
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            Salve seus produtos favoritos e tenha acesso rápido às suas inspirações preferidas.
          </p>
          <Button
            onClick={() => navigate('/catalog')}
            size="lg"
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 px-8"
          >
            Explorar Catálogo Completo
          </Button>
        </section>
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

export default Index;
