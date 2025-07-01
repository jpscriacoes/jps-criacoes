
import { Link } from 'react-router-dom';
import { Home, Grid3X3, Heart, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';

const DesktopNavigation = () => {
  const { user } = useAuth();
  const favorites = JSON.parse(localStorage.getItem('cake-toppers-favorites') || '[]');
  const favoritesCount = favorites.length;

  return (
    <nav className="hidden lg:flex items-center space-x-6">
      <Link to="/" className="flex items-center space-x-1 text-gray-700 hover:text-pink-600 transition-colors">
        <Home className="h-4 w-4" />
        <span>Início</span>
      </Link>
      <Link to="/catalog" className="flex items-center space-x-1 text-gray-700 hover:text-pink-600 transition-colors">
        <Grid3X3 className="h-4 w-4" />
        <span>Catálogo</span>
      </Link>
      <Link to="/favorites" className="flex items-center space-x-1 text-gray-700 hover:text-pink-600 transition-colors relative">
        <Heart className="h-4 w-4" />
        <span>Favoritos</span>
        {favoritesCount > 0 && (
          <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
            {favoritesCount}
          </Badge>
        )}
      </Link>
      {user?.role === 'admin' && (
        <Link to="/admin" className="flex items-center space-x-1 text-gray-700 hover:text-pink-600 transition-colors">
          <Users className="h-4 w-4" />
          <span>Admin</span>
        </Link>
      )}
    </nav>
  );
};

export default DesktopNavigation;
