
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import { mockProducts, Product, categories } from '@/data/mockData';

const Index = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<string[]>(
    JSON.parse(localStorage.getItem('cake-toppers-favorites') || '[]')
  );

  const featuredProducts = mockProducts.filter(product => product.featured);
  const recentProducts = mockProducts
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

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/catalog?category=${categoryId}`);
  };

  const handleFavoritesClick = () => {
    navigate('/favorites');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <Header 
        title="Doce Arte"
        showFavorites 
        onFavoritesClick={handleFavoritesClick}
        favoriteCount={favorites.length}
      />

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Hero Section */}
        <section className="text-center py-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Transforme sua festa em um
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent block">
              momento mágico ✨
            </span>
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Descubra nossa coleção exclusiva de topos de bolo e decorações artesanais 
            personalizadas para tornar sua celebração única e especial.
          </p>
          
          {/* Search Bar */}
          <div className="flex gap-2 max-w-md mx-auto">
            <Input
              placeholder="Buscar por tema, ocasião..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/70 border-pink-200 focus:border-pink-400"
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
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Explore por Categoria</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.filter(cat => cat.id !== 'all').map((category) => (
              <Card
                key={category.id}
                className="gradient-card hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105"
                onClick={() => handleCategoryClick(category.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">{category.icon}</div>
                  <h4 className="font-semibold text-gray-800">{category.name}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">✨ Produtos em Destaque</h3>
              <Button
                variant="outline"
                onClick={() => navigate('/catalog')}
                className="border-pink-200 text-pink-600 hover:bg-pink-50"
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
            <h3 className="text-xl font-semibold text-gray-800">🆕 Novidades</h3>
            <Button
              variant="outline"
              onClick={() => navigate('/catalog')}
              className="border-purple-200 text-purple-600 hover:bg-purple-50"
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
        <section className="text-center py-12 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Encontrou algo que amou? 💝
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
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
