
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

  const itemsPerView = 4;
  const maxIndex = Math.max(0, categoryProducts.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <span className="text-2xl">{categoryIcon}</span>
          {categoryName}
          <span className="text-sm font-normal text-gray-500">
            ({categoryProducts.length} produtos)
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="relative">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="flex-shrink-0 h-10 w-10"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div className="overflow-hidden flex-1">
            <div 
              className="flex gap-4 transition-transform duration-300 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                width: `${(categoryProducts.length / itemsPerView) * 100}%`
              }}
            >
              {categoryProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="flex-shrink-0"
                  style={{ width: `${100 / categoryProducts.length}%` }}
                >
                  <ProductCard
                    product={product}
                    isFavorite={favorites.includes(product.id)}
                    onToggleFavorite={onToggleFavorite}
                    onClick={onProductClick}
                  />
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className="flex-shrink-0 h-10 w-10"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {categoryProducts.length > itemsPerView && (
          <div className="flex justify-center mt-4 gap-1">
            {Array.from({ length: maxIndex + 1 }, (_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex 
                    ? 'bg-pink-500' 
                    : 'bg-gray-300 hover:bg-gray-400'
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
