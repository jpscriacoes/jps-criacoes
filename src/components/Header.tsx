
import Logo from './header/Logo';
import DesktopNavigation from './header/DesktopNavigation';
import SearchBar from './header/SearchBar';
import UserActions from './header/UserActions';

const Header = () => {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <DesktopNavigation />
          <SearchBar variant="desktop" />
          <SearchBar variant="mobile" />
          <UserActions />
        </div>
      </div>
    </header>
  );
};

export default Header;
