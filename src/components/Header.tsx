
import { Bookmark, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
  title: string;
  showFavorites?: boolean;
  onFavoritesClick?: () => void;
  favoriteCount?: number;
}

const Header = ({ title, showFavorites = false, onFavoritesClick, favoriteCount = 0 }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Início', path: '/' },
    { name: 'Catálogo', path: '/catalog' },
    { name: 'Favoritos', path: '/favorites' },
    { name: 'Admin', path: '/admin' }
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-pink-100/30 px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-xs text-muted-foreground">Personalizando Sonhos</p>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-pink-600 ${
                isActivePath(item.path) 
                  ? 'text-pink-600 border-b-2 border-pink-600 pb-1' 
                  : 'text-gray-600'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-3">
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

          {/* Mobile Menu Button */}
          <Button
            variant="outline"
            size="sm"
            className="md:hidden bg-white/50 border-pink-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-pink-100/30">
          <nav className="flex flex-col space-y-2 mt-4">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActivePath(item.path)
                    ? 'bg-pink-100 text-pink-700'
                    : 'text-gray-600 hover:bg-pink-50 hover:text-pink-600'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
