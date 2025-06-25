import { useState } from 'react';
import { Bookmark, Share, ZoomIn, ZoomOut } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TransformedProduct } from "@/types";
import { toast } from "@/hooks/use-toast";

interface ProductDetailModalProps {
  product: TransformedProduct | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
}

const ProductDetailModal = ({ 
  product, 
  isOpen, 
  onClose, 
  isFavorite, 
  onToggleFavorite 
}: ProductDetailModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!product) return null;

  const handleShare = () => {
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

  const handleFavorite = () => {
    onToggleFavorite(product.id);
    toast({
      title: isFavorite ? "Removido dos favoritos" : "Adicionado aos favoritos",
      description: `${product.name} ${isFavorite ? 'foi removido dos' : 'foi adicionado aos'} seus favoritos.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-slate-100 pr-8">
            {product.name}
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-slate-300">
            {product.description}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-slate-700">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-300 ${
                  isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              />
              
              <Button
                size="sm"
                variant="secondary"
                className="absolute top-3 right-3 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-700 text-gray-700 dark:text-slate-100 border-0 dark:border-slate-600"
                onClick={() => setIsZoomed(!isZoomed)}
              >
                {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
              </Button>
            </div>

            {/* Image Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                      currentImageIndex === index 
                        ? 'border-pink-500 dark:border-pink-400' 
                        : 'border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category and Price */}
            <div className="flex items-center justify-between">
              <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                {product.category}
              </Badge>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-slate-100 mb-2">Detalhes do Produto</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-sm text-gray-500 dark:text-slate-400">Material:</span>
                    <Badge variant="outline" className="ml-2 border-pink-200 dark:border-pink-600 text-pink-700 dark:text-pink-300 bg-pink-50/50 dark:bg-pink-900/20">
                      {product.material}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 dark:text-slate-400">Ocasião:</span>
                    <Badge variant="outline" className="ml-2 border-purple-200 dark:border-purple-600 text-purple-700 dark:text-purple-300 bg-purple-50/50 dark:bg-purple-900/20">
                      {product.occasion}
                    </Badge>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm text-gray-500 dark:text-slate-400">Tema:</span>
                    <Badge variant="outline" className="ml-2 border-pink-200 dark:border-pink-600 text-pink-700 dark:text-pink-300 bg-pink-50/50 dark:bg-pink-900/20">
                      {product.theme}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Creation Date */}
              <div>
                <span className="text-sm text-gray-500 dark:text-slate-400">Criado em:</span>
                <p className="text-sm font-medium text-gray-900 dark:text-slate-100">
                  {new Date(product.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleFavorite}
                variant={isFavorite ? "default" : "outline"}
                className={`flex-1 transition-all duration-200 ${
                  isFavorite
                    ? 'bg-pink-500 hover:bg-pink-600 text-white'
                    : 'border-pink-200 dark:border-pink-600 hover:bg-pink-50 dark:hover:bg-pink-900/20 text-pink-700 dark:text-pink-300'
                }`}
              >
                <Bookmark className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                {isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
              </Button>
              
              <Button
                onClick={handleShare}
                variant="outline"
                className="border-purple-200 dark:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-purple-700 dark:text-purple-300"
              >
                <Share className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>
            </div>

            {product.featured && (
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 p-4 rounded-lg border border-pink-100 dark:border-pink-800">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">✨</span>
                  <h4 className="font-semibold text-pink-700 dark:text-pink-300">Produto em Destaque</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-slate-300">
                  Este produto faz parte da nossa seleção especial de trabalhos em destaque!
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
