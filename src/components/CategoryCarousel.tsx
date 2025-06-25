
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
      categoryId: product.category_id,
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
      if (window.innerWidth < 480) return 2; // Mobile muito pequeno
      if (window.innerWidth < 640) return 2; // Mobile
      if (window.innerWidth < 768) return 3; // Tablet pequeno
      if (window.innerWidth < 1024) return 4; // Tablet
      if (window.innerWidth < 1280) return 5; // Desktop pequeno
      return 6; // Desktop grande
    }
    return 2;
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
    <Card className="overflow-hidden bg-white/90 dark:bg-slate-800/90 shadow-lg border-0 dark:border-slate-700 mb-6">
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg text-gray-900 dark:text-slate-100">
          <CategoryIcon icon={categoryIcon} className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          <span className="text-sm sm:text-base md:text-lg">{categoryName}</span>
          <span className="text-xs sm:text-sm font-normal text-gray-500 dark:text-gray-400">
            ({categoryProducts.length} produtos)
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="relative px-2 sm:px-4 md:px-6 pb-4 sm:pb-6">
        <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
          {categoryProducts.length > itemsPerView && (
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="flex-shrink-0 h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 bg-white/80 hover:bg-white dark:bg-slate-700/80 dark:hover:bg-slate-600 shadow-md border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200"
            >
              <ChevronLeft className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />
            </Button>
          )}

          <div className="overflow-hidden flex-1">
            <div 
              className="flex gap-1 sm:gap-2 md:gap-3 transition-transform duration-300 ease-in-out"
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
                  <div className="px-0.5 sm:px-1">
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
              className="flex-shrink-0 h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 bg-white/80 hover:bg-white dark:bg-slate-700/80 dark:hover:bg-slate-600 shadow-md border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200"
            >
              <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />
            </Button>
          )}
        </div>

        {categoryProducts.length > itemsPerView && maxIndex > 0 && (
          <div className="flex justify-center mt-3 sm:mt-4 gap-1 sm:gap-1.5">
            {Array.from({ length: maxIndex + 1 }, (_, index) => (
              <button
                key={index}
                className={`w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex 
                    ? 'bg-pink-500 w-3 sm:w-4 md:w-6' 
                    : 'bg-gray-300 hover:bg-gray-400 dark:bg-slate-600 dark:hover:bg-slate-500'
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
