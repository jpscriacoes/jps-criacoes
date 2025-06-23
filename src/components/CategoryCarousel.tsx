import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { useProducts, useTransformedProducts } from '@/hooks/useProducts';
import { TransformedProduct } from '@/types';
import CategoryIcon from '@/components/CategoryIcon';

interface CategoryCarouselProps {
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
  favorites: string[];
  onToggleFavorite: (productId: string) => void;
  onProductClick: (product: TransformedProduct) => void;
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
  const { data: transformedProducts } = useTransformedProducts();

  const categoryProducts = useMemo(() => {
    if (transformedProducts && transformedProducts.length > 0) {
      return transformedProducts.filter(product => 
        product.category.toLowerCase() === categoryName.toLowerCase()
      ).slice(0, 20);
    }
    
    return products?.filter(product => 
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
  }, [transformedProducts, products, categoryId, categoryName]);

  if (!categoryProducts.length) {
    return null;
  }

  const getItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 2;
      if (window.innerWidth < 768) return 3;
      if (window.innerWidth < 1024) return 4;
      if (window.innerWidth < 1280) return 5;
      return 6;
    }
    return 5;
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());

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
          <CategoryIcon icon={categoryIcon} className="w-7 h-7" />
          {categoryName}
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            ({categoryProducts.length} produtos)
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="relative px-4 sm:px-6 pb-6">
        <div className="flex items-center gap-2 sm:gap-4">
          {categoryProducts.length > itemsPerView && (
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 bg-white/80 hover:bg-white dark:bg-gray-700 dark:hover:bg-gray-600 shadow-md"
            >
              <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          )}

          <div className="overflow-hidden flex-1">
            <div 
              className="flex gap-2 sm:gap-3 transition-transform duration-300 ease-in-out"
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

          {categoryProducts.length > itemsPerView && (
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 bg-white/80 hover:bg-white dark:bg-gray-700 dark:hover:bg-gray-600 shadow-md"
            >
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          )}
        </div>

        {categoryProducts.length > itemsPerView && maxIndex > 0 && (
          <div className="flex justify-center mt-4 gap-1.5">
            {Array.from({ length: maxIndex + 1 }, (_, index) => (
              <button
                key={index}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex 
                    ? 'bg-pink-500 w-4 sm:w-6' 
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
