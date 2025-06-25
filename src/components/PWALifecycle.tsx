
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wifi, WifiOff, Download, RefreshCw, Smartphone, Globe } from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';

const PWALifecycle = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const { isInstallable, isInstalled, installApp } = usePWA();

  useEffect(() => {
    // Monitor online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check for service worker updates
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((reg) => {
        setRegistration(reg);
        
        // Check for updates
        const checkForUpdates = () => {
          reg.update().then(() => {
            if (reg.waiting) {
              setUpdateAvailable(true);
            }
          });
        };

        // Check for updates every 30 seconds
        const updateInterval = setInterval(checkForUpdates, 30000);

        // Listen for new service worker
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setUpdateAvailable(true);
              }
            });
          }
        });

        return () => clearInterval(updateInterval);
      });
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleUpdate = () => {
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  };

  const getConnectionStatus = () => {
    if (isOnline) {
      return (
        <Badge variant="default" className="gap-1 bg-green-100 text-green-800 border-green-200">
          <Wifi className="h-3 w-3" />
          Online
        </Badge>
      );
    } else {
      return (
        <Badge variant="destructive" className="gap-1">
          <WifiOff className="h-3 w-3" />
          Offline
        </Badge>
      );
    }
  };

  const getInstallStatus = () => {
    if (isInstalled) {
      return (
        <Badge variant="default" className="gap-1 bg-blue-100 text-blue-800 border-blue-200">
          <Smartphone className="h-3 w-3" />
          Instalado
        </Badge>
      );
    } else if (isInstallable) {
      return (
        <Badge variant="outline" className="gap-1">
          <Download className="h-3 w-3" />
          Pode Instalar
        </Badge>
      );
    } else {
      return (
        <Badge variant="secondary" className="gap-1">
          <Globe className="h-3 w-3" />
          Navegador
        </Badge>
      );
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Smartphone className="h-5 w-5 text-pink-600" />
          Status do App
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Conexão:</span>
          {getConnectionStatus()}
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Instalação:</span>
          {getInstallStatus()}
        </div>

        {updateAvailable && (
          <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-orange-600" />
              <span className="text-sm text-orange-800">Atualização disponível</span>
            </div>
            <Button 
              onClick={handleUpdate}
              size="sm" 
              variant="outline"
              className="text-orange-600 border-orange-300 hover:bg-orange-100"
            >
              Atualizar
            </Button>
          </div>
        )}

        {isInstallable && !isInstalled && (
          <div className="pt-2">
            <Button 
              onClick={installApp}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
            >
              <Download className="h-4 w-4 mr-2" />
              Instalar App
            </Button>
          </div>
        )}

        {!isOnline && (
          <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">
              Você está offline. O app ainda funciona graças ao cache!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PWALifecycle;
