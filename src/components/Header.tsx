
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Heart, User, ShoppingBag, Search, Home, Grid3X3, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import PWAInstallButton from './PWAInstallButton';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
      setIsMenuOpen(false);
    }
  };

  const favorites = JSON.parse(localStorage.getItem('cake-toppers-favorites') || '[]');
  const favoritesCount = favorites.length;

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src="/logo.png" alt="JPS Criações" className="h-10 w-10 rounded-full" />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                JPS Criações
              </h1>
              <p className="text-xs text-gray-500">Papelaria Personalizada</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
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

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center space-x-2">
            <Input
              type="search"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 bg-gray-50 border-gray-200 focus:border-pink-400"
            />
            <Button type="submit" size="sm" variant="outline">
              <Search className="h-4 w-4" />
            </Button>
          </form>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <PWAInstallButton />
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Olá, {user.email?.split('@')[0]}</span>
                <Button onClick={logout} variant="outline" size="sm">
                  Sair
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm" className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>Entrar</span>
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-pink-100 py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="flex space-x-2">
              <Input
                type="search"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-gray-50 border-gray-200 focus:border-pink-400"
              />
              <Button type="submit" size="sm" variant="outline">
                <Search className="h-4 w-4" />
              </Button>
            </form>

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              <Link 
                to="/" 
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-pink-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-5 w-5 text-pink-600" />
                <span>Início</span>
              </Link>
              <Link 
                to="/catalog" 
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-pink-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Grid3X3 className="h-5 w-5 text-pink-600" />
                <span>Catálogo</span>
              </Link>
              <Link 
                to="/favorites" 
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-pink-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart className="h-5 w-5 text-pink-600" />
                <span>Favoritos</span>
                {favoritesCount > 0 && (
                  <Badge variant="destructive" className="ml-auto">
                    {favoritesCount}
                  </Badge>
                )}
              </Link>
              {user?.role === 'admin' && (
                <Link 
                  to="/admin" 
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-pink-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Users className="h-5 w-5 text-pink-600" />
                  <span>Admin</span>
                </Link>
              )}
            </nav>

            {/* Mobile Actions */}
            <div className="space-y-2 pt-2 border-t border-pink-100">
              <PWAInstallButton />
              {user ? (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Olá, {user.email?.split('@')[0]}</p>
                  <Button onClick={logout} variant="outline" size="sm" className="w-full">
                    Sair
                  </Button>
                </div>
              ) : (
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full flex items-center justify-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>Entrar</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
