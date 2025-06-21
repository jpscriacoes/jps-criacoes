
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-slate-900/95 dark:border-slate-700/50">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-3">
            <img 
              src="/lovable-uploads/b6c7b51c-0e55-462b-b021-0fdba9d0bd55.png" 
              alt="JPS CRIAÇÕES Logo" 
              className="h-10 w-10 rounded-full object-cover border-2 border-pink-200 shadow-sm dark:border-pink-400/50 dark:shadow-pink-500/20"
            />
            <span className="hidden font-bold text-lg sm:inline-block bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent dark:from-pink-400 dark:to-purple-400">
              JPS CRIAÇÕES
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              to="/"
              className={`transition-colors hover:text-foreground/80 ${
                isActive('/') ? 'text-foreground dark:text-slate-100' : 'text-foreground/60 dark:text-slate-300'
              }`}
            >
              Início
            </Link>
            <Link
              to="/catalog"
              className={`transition-colors hover:text-foreground/80 ${
                isActive('/catalog') ? 'text-foreground dark:text-slate-100' : 'text-foreground/60 dark:text-slate-300'
              }`}
            >
              Catálogo
            </Link>
            <Link
              to="/favorites"
              className={`transition-colors hover:text-foreground/80 ${
                isActive('/favorites') ? 'text-foreground dark:text-slate-100' : 'text-foreground/60 dark:text-slate-300'
              }`}
            >
              Favoritos
            </Link>
            <Link
              to="/admin"
              className={`transition-colors hover:text-foreground/80 ${
                isActive('/admin') ? 'text-foreground dark:text-slate-100' : 'text-foreground/60 dark:text-slate-300'
              }`}
            >
              Admin
            </Link>
          </nav>
        </div>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden dark:text-slate-200"
          onClick={toggleMenu}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Mobile logo for smaller screens */}
            <Link to="/" className="flex items-center space-x-2 md:hidden">
              <img 
                src="/lovable-uploads/b6c7b51c-0e55-462b-b021-0fdba9d0bd55.png" 
                alt="JPS CRIAÇÕES Logo" 
                className="h-8 w-8 rounded-full object-cover border border-pink-200 dark:border-pink-400/50"
              />
              <span className="font-bold text-sm bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent dark:from-pink-400 dark:to-purple-400">
                JPS CRIAÇÕES
              </span>
            </Link>
          </div>
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
          </nav>
        </div>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] w-full grid-flow-row auto-rows-max overflow-auto p-6 pb-16 shadow-md animate-in slide-in-from-bottom-80 md:hidden dark:bg-slate-900/95">
          <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md dark:bg-slate-800 dark:border dark:border-slate-600/50">
            <Link to="/" className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline dark:text-slate-200 dark:hover:bg-slate-700/50">
              <Cake className="mr-2 h-4 w-4" />
              Início
            </Link>
            <Link to="/catalog" className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline dark:text-slate-200 dark:hover:bg-slate-700/50">
              <BookOpen className="mr-2 h-4 w-4" />
              Catálogo
            </Link>
            <Link to="/favorites" className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline dark:text-slate-200 dark:hover:bg-slate-700/50">
              <Heart className="mr-2 h-4 w-4" />
              Favoritos
            </Link>
            <Link to="/admin" className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline dark:text-slate-200 dark:hover:bg-slate-700/50">
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
