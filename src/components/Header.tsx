
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
  showFavorites?: boolean;
  onFavoritesClick?: () => void;
  favoriteCount?: number;
}

const Header = ({ title, showFavorites = false, onFavoritesClick, favoriteCount = 0 }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-pink-100/30 px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-xs text-muted-foreground">Personalizando Sonhos</p>
        </div>
        
        {showFavorites && (
          <Button
            variant="outline"
            size="sm"
            onClick={onFavoritesClick}
            className="relative bg-white/50 border-pink-200 hover:bg-pink-50 transition-all duration-200"
          >
            <Bookmark className="w-4 h-4 mr-2" />
            Favoritos
            {favoriteCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {favoriteCount}
              </span>
            )}
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
