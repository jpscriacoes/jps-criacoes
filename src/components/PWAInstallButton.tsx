
import { Button } from '@/components/ui/button';
import { Download, Smartphone } from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';

const PWAInstallButton = () => {
  const { isInstallable, isInstalled, installApp } = usePWA();

  if (isInstalled) {
    return (
      <Button variant="outline" size="sm" className="gap-2" disabled>
        <Smartphone className="h-4 w-4" />
        App Instalado
      </Button>
    );
  }

  if (!isInstallable) {
    return null;
  }

  return (
    <Button 
      onClick={installApp}
      variant="outline" 
      size="sm" 
      className="gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0 hover:from-pink-600 hover:to-purple-600"
    >
      <Download className="h-4 w-4" />
      Instalar App
    </Button>
  );
};

export default PWAInstallButton;
