
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';

interface CategoryCarouselProps {
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
  favorites: string[];
  onToggleFavorite: (productId: string) => void;
  onProductClick: (product: any) => void;
}

const CategoryCarousel = ({ 
  categoryId, 
  categoryName, 
  categoryIcon, 
  favorites, 
  onToggleFavorite, 
  onProductClick 
}: CategoryCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: products } = useProducts();

  const categoryProducts = products?.filter(product => 
    product.category_id === categoryId
  ).slice(0, 20).map(product => ({
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

  if (!categoryProducts.length) {
    return null;
  }

  // Responsivo: diferentes quantidades de itens por tela
  const getItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1; // mobile
      if (window.innerWidth < 768) return 2; // tablet small
      if (window.innerWidth < 1024) return 3; // tablet
      return 4; // desktop
    }
    return 4;
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());

  // Atualizar itemsPerView quando a tela redimensionar
  React.useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, categoryProducts.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <Card className="overflow-hidden bg-white/90 dark:bg-gray-800/90 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <span className="text-2xl">{categoryIcon}</span>
          {categoryName}
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            ({categoryProducts.length} produtos)
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="relative px-4 pb-6">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Botão Anterior - escondido no mobile se não necessário */}
          {categoryProducts.length > itemsPerView && (
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 bg-white/80 hover:bg-white dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          )}

          {/* Container do Carrossel */}
          <div className="overflow-hidden flex-1">
            <div 
              className="flex gap-2 sm:gap-4 transition-transform duration-300 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                width: `${Math.ceil(categoryProducts.length / itemsPerView) * 100}%`
              }}
            >
              {categoryProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="flex-shrink-0"
                  style={{ 
                    width: `${100 / categoryProducts.length}%`,
                    minWidth: `${100 / itemsPerView}%`
                  }}
                >
                  <div className="px-1">
                    <ProductCard
                      product={product}
                      isFavorite={favorites.includes(product.id)}
                      onToggleFavorite={onToggleFavorite}
                      onClick={onProductClick}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botão Próximo - escondido no mobile se não necessário */}
          {categoryProducts.length > itemsPerView && (
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 bg-white/80 hover:bg-white dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          )}
        </div>

        {/* Indicadores - apenas quando há múltiplas páginas */}
        {categoryProducts.length > itemsPerView && maxIndex > 0 && (
          <div className="flex justify-center mt-4 gap-1">
            {Array.from({ length: maxIndex + 1 }, (_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex 
                    ? 'bg-pink-500' 
                    : 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CategoryCarousel;
