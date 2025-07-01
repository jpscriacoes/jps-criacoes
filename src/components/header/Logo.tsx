
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-3">
      <img src="/logo.png" alt="JPS Criações" className="h-10 w-10 rounded-full" />
      <div className="hidden sm:block">
        <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          JPS Criações
        </h1>
        <p className="text-xs text-gray-500">Papelaria Personalizada</p>
      </div>
    </Link>
  );
};

export default Logo;
