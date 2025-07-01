
import { Link, useLocation } from 'react-router-dom';
import { Home, Grid3X3, Heart, User, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';

const BottomNavigation = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const favorites = JSON.parse(localStorage.getItem('cake-toppers-favorites') || '[]');
  const favoritesCount = favorites.length;

  const isActive = (path: string) => location.pathname === path;

  const handleAuthAction = () => {
    if (user) {
      logout();
    }
  };

  const navItems = [
    {
      path: '/',
      icon: Home,
      label: 'Início',
      isActive: isActive('/'),
    },
    {
      path: '/catalog',
      icon: Grid3X3,
      label: 'Catálogo',
      isActive: isActive('/catalog'),
    },
    {
      path: '/favorites',
      icon: Heart,
      label: 'Favoritos',
      isActive: isActive('/favorites'),
      badge: favoritesCount > 0 ? favoritesCount : null,
    },
    {
      path: user ? null : '/login',
      icon: User,
      label: user ? 'Sair' : 'Entrar',
      isActive: isActive('/login'),
      onClick: user ? handleAuthAction : undefined,
    },
    ...(user?.role === 'admin' ? [{
      path: '/admin',
      icon: Users,
      label: 'Admin',
      isActive: isActive('/admin'),
    }] : []),
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-pink-100 px-4 py-2 shadow-lg">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item, index) => (
          <div key={index} className="relative">
            {item.path ? (
              <Link
                to={item.path}
                className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
                  item.isActive
                    ? 'text-pink-600 bg-pink-50'
                    : 'text-gray-600 hover:text-pink-500 hover:bg-pink-25'
                }`}
              >
                <div className="relative">
                  <item.icon className={`h-6 w-6 ${item.isActive ? 'text-pink-600' : 'text-gray-600'}`} />
                  {item.badge && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <span className={`text-xs mt-1 font-medium ${
                  item.isActive ? 'text-pink-600' : 'text-gray-600'
                }`}>
                  {item.label}
                </span>
              </Link>
            ) : (
              <button
                onClick={item.onClick}
                className="flex flex-col items-center p-2 rounded-lg transition-all duration-200 text-gray-600 hover:text-pink-500 hover:bg-pink-25"
              >
                <item.icon className="h-6 w-6 text-gray-600" />
                <span className="text-xs mt-1 font-medium text-gray-600">
                  {item.label}
                </span>
              </button>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
