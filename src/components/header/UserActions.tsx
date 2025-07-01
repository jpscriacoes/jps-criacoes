
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import PWAInstallButton from '../PWAInstallButton';

const UserActions = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center space-x-3">
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

      {/* Mobile PWA Install Button */}
      <div className="lg:hidden">
        <PWAInstallButton />
      </div>
    </div>
  );
};

export default UserActions;
