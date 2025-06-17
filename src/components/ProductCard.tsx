
import { useState } from 'react';
import { Bookmark, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
  onClick: (product: Product) => void;
}

const ProductCard = ({ product, isFavorite, onToggleFavorite, onClick }: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

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

  return (
    <Card 
      className="group gradient-card hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.02] overflow-hidden"
      onClick={() => onClick(product)}
    >
      <div className="relative aspect-square overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100 animate-pulse" />
        )}
        <img
          src={product.imageUrl}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        <div className="absolute top-3 left-3">
          <Badge className="bg-white/90 text-gray-700 border-0">
            {product.category}
          </Badge>
        </div>
        
        <div className="absolute top-3 right-3 flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="w-8 h-8 p-0 bg-white/90 hover:bg-white border-0 shadow-md"
            onClick={handleShare}
          >
            <Share className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className={`w-8 h-8 p-0 border-0 shadow-md transition-colors ${
              isFavorite 
                ? 'bg-pink-500 text-white hover:bg-pink-600' 
                : 'bg-white/90 hover:bg-white text-gray-600'
            }`}
            onClick={handleFavorite}
          >
            <Bookmark className={`w-3 h-3 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
        </div>
        
        {product.featured && (
          <div className="absolute bottom-3 left-3">
            <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0">
              ✨ Destaque
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        
        <div className="flex flex-wrap gap-1 mb-3">
          <Badge variant="outline" className="text-xs border-pink-200 text-pink-700">
            {product.material}
          </Badge>
          <Badge variant="outline" className="text-xs border-purple-200 text-purple-700">
            {product.theme}
          </Badge>
        </div>
        
        <p className="text-xs text-muted-foreground">
          {product.occasion}
        </p>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
