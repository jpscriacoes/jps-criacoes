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
      {/* Container da Imagem com aspect ratio ajustado */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[3/3] md:aspect-[4/3] lg:aspect-[3/4] overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100 dark:from-gray-700 dark:to-gray-600">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 animate-pulse flex items-center justify-center">
            <div className="text-gray-400 text-xs">Carregando...</div>
          </div>
        )}
        
        {imageError ? (
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
            <div className="text-center text-gray-500 dark:text-gray-400 p-4">
              <div className="text-2xl mb-2">🖼️</div>
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
        
        {/* Badge da Categoria */}
        <div className="absolute top-2 left-2">
          <Badge className="bg-white/95 text-gray-700 border-0 text-xs px-2 py-1 shadow-sm backdrop-blur-sm">
            {product.category}
          </Badge>
        </div>
        
        {/* Botões de Ação */}
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            size="sm"
            variant="secondary"
            className="w-8 h-8 p-0 bg-white/95 hover:bg-white border-0 shadow-md backdrop-blur-sm"
            onClick={handleShare}
          >
            <Share className="w-3.5 h-3.5" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className={`w-8 h-8 p-0 border-0 shadow-md backdrop-blur-sm transition-all duration-200 ${
              isFavorite 
                ? 'bg-pink-500 text-white hover:bg-pink-600' 
                : 'bg-white/95 hover:bg-white text-gray-600'
            }`}
            onClick={handleFavorite}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
        </div>
        
        {/* Badge de Destaque */}
        {product.featured && (
          <div className="absolute bottom-2 left-2">
            <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0 text-xs px-2 py-1 shadow-md">
              ✨ Destaque
            </Badge>
          </div>
        )}
      </div>
      
      {/* Conteúdo do Card - Compacto */}
      <CardContent className="p-2 sm:p-3 md:p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-xs sm:text-sm md:text-base mb-1 sm:mb-2 line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] leading-tight">
          {product.name}
        </h3>
        
        <div className="flex flex-wrap gap-1 mb-2">
          <Badge variant="outline" className="text-[10px] sm:text-xs border-pink-200 text-pink-700 dark:border-pink-800 dark:text-pink-300 px-1.5 py-0.5">
            {product.material}
          </Badge>
          <Badge variant="outline" className="text-[10px] sm:text-xs border-purple-200 text-purple-700 dark:border-purple-800 dark:text-purple-300 px-1.5 py-0.5">
            {product.theme}
          </Badge>
        </div>
        
        <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mt-auto leading-relaxed line-clamp-2">
          {product.occasion}
        </p>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
