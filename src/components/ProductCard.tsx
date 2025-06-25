
import { useState } from 'react';
import { Bookmark, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TransformedProduct } from "@/types";
import { toast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: TransformedProduct;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
  onClick: (product: TransformedProduct) => void;
}

const ProductCard = ({ product, isFavorite, onToggleFavorite, onClick }: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copiado!",
        description: "O link do produto foi copiado para a área de transferência.",
      });
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(product.id);
    toast({
      title: isFavorite ? "Removido dos favoritos" : "Adicionado aos favoritos",
      description: `${product.name} ${isFavorite ? 'foi removido dos' : 'foi adicionado aos'} seus favoritos.`,
    });
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <Card 
      className="group gradient-card hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02] overflow-hidden h-full flex flex-col"
      onClick={() => onClick(product)}
    >
      {/* Container da Imagem - Ajustado para mobile */}
      <div className="relative w-full aspect-square sm:aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/5] overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100 dark:from-gray-700 dark:to-gray-600">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 animate-pulse flex items-center justify-center">
            <div className="text-gray-400 dark:text-gray-300 text-xs">Carregando...</div>
          </div>
        )}
        
        {imageError ? (
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
            <div className="text-center text-gray-500 dark:text-gray-300 p-2 sm:p-4">
              <div className="text-lg sm:text-2xl mb-1 sm:mb-2">🖼️</div>
              <div className="text-xs">Imagem não disponível</div>
            </div>
          </div>
        ) : (
          <img
            src={product.imageUrl}
            alt={product.name}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={handleImageError}
          />
        )}
        
        {/* Badge da Categoria - Ajustado para mobile */}
        <div className="absolute top-1 left-1 sm:top-2 sm:left-2">
          <Badge className="bg-white/95 dark:bg-slate-800/95 text-gray-700 dark:text-slate-100 border-0 dark:border-slate-600 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 shadow-sm backdrop-blur-sm">
            {product.category}
          </Badge>
        </div>
        
        {/* Botões de Ação - Melhorados para mobile */}
        <div className="absolute top-1 right-1 sm:top-2 sm:right-2 flex gap-0.5 sm:gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            size="sm"
            variant="secondary"
            className="w-6 h-6 sm:w-8 sm:h-8 p-0 bg-white/95 dark:bg-slate-800/95 hover:bg-white dark:hover:bg-slate-700 border-0 dark:border-slate-600 shadow-md backdrop-blur-sm text-gray-700 dark:text-slate-100"
            onClick={handleShare}
          >
            <Share className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className={`w-6 h-6 sm:w-8 sm:h-8 p-0 border-0 shadow-md backdrop-blur-sm transition-all duration-200 ${
              isFavorite 
                ? 'bg-pink-500 text-white hover:bg-pink-600' 
                : 'bg-white/95 dark:bg-slate-800/95 hover:bg-white dark:hover:bg-slate-700 text-gray-600 dark:text-slate-200 border-0 dark:border-slate-600'
            }`}
            onClick={handleFavorite}
          >
            <Bookmark className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
        </div>
        
        {/* Badge de Destaque - Ajustado para mobile */}
        {product.featured && (
          <div className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2">
            <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 shadow-md">
              ✨ Destaque
            </Badge>
          </div>
        )}
      </div>
      
      {/* Conteúdo do Card - Otimizado para mobile */}
      <CardContent className="p-2 sm:p-3 md:p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-xs sm:text-sm md:text-base mb-1 sm:mb-2 line-clamp-2 min-h-[1.5rem] sm:min-h-[2rem] md:min-h-[2.5rem] leading-tight text-gray-900 dark:text-slate-100">
          {product.name}
        </h3>
        
        <div className="flex flex-wrap gap-1 mb-2">
          <Badge variant="outline" className="text-[9px] sm:text-[10px] md:text-xs border-pink-200 dark:border-pink-600 text-pink-700 dark:text-pink-300 px-1 sm:px-1.5 py-0.5 bg-pink-50/50 dark:bg-pink-900/20">
            {product.material}
          </Badge>
          <Badge variant="outline" className="text-[9px] sm:text-[10px] md:text-xs border-purple-200 dark:border-purple-600 text-purple-700 dark:text-purple-300 px-1 sm:px-1.5 py-0.5 bg-purple-50/50 dark:bg-purple-900/20">
            {product.theme}
          </Badge>
        </div>
        
        <p className="text-[9px] sm:text-[10px] md:text-sm text-muted-foreground dark:text-slate-400 mt-auto leading-relaxed line-clamp-2">
          {product.occasion}
        </p>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
