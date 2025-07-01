
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import ErrorBoundary from "@/components/ErrorBoundary";
import BottomNavigation from "@/components/BottomNavigation";
import { useEffect } from "react";
import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import Favorites from "./pages/Favorites";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: 1000,
      staleTime: 5 * 60 * 1000, // 5 minutos
    },
  },
});

const App = () => {
  // Garantir que o tema claro seja aplicado na inicialização
  useEffect(() => {
    // Limpar qualquer tema salvo e forçar o tema claro
    localStorage.setItem("confeitaria-theme", "light");
    
    // Remover classes de tema do documento
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" storageKey="confeitaria-theme">
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <div className="pb-20 lg:pb-0">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/login" element={<Login />} />
                    <Route 
                      path="/admin" 
                      element={
                        <ProtectedRoute>
                          <Admin />
                        </ProtectedRoute>
                      } 
                    />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
                <BottomNavigation />
              </BrowserRouter>
            </TooltipProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
