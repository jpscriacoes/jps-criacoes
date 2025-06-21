import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Cake, BookOpen, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <Cake className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">
              JPS CRIAÇÕES
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              to="/"
              className={`transition-colors hover:text-foreground/80 ${
                isActive('/') ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              Início
            </Link>
            <Link
              to="/catalog"
              className={`transition-colors hover:text-foreground/80 ${
                isActive('/catalog') ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              Catálogo
            </Link>
            <Link
              to="/favorites"
              className={`transition-colors hover:text-foreground/80 ${
                isActive('/favorites') ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              Favoritos
            </Link>
            <Link
              to="/admin"
              className={`transition-colors hover:text-foreground/80 ${
                isActive('/admin') ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              Admin
            </Link>
          </nav>
        </div>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          onClick={toggleMenu}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Espaço para futura barra de pesquisa */}
          </div>
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
          </nav>
        </div>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] w-full grid-flow-row auto-rows-max overflow-auto p-6 pb-16 shadow-md animate-in slide-in-from-bottom-80 md:hidden">
          <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
            <Link to="/" className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline">
              <Cake className="mr-2 h-4 w-4" />
              Início
            </Link>
            <Link to="/catalog" className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline">
              <BookOpen className="mr-2 h-4 w-4" />
              Catálogo
            </Link>
            <Link to="/favorites" className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline">
              <Heart className="mr-2 h-4 w-4" />
              Favoritos
            </Link>
            <Link to="/admin" className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline">
              <Settings className="mr-2 h-4 w-4" />
              Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
