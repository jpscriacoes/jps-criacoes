import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { Package, Users, BarChart3, Settings, Plus, Edit, LogOut } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import { useAuth } from '@/hooks/useAuth';
import ProductForm from '@/components/admin/ProductForm';
import CategoryManager from '@/components/admin/CategoryManager';
import ProductList from '@/components/admin/ProductList';

const Admin = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>(
    JSON.parse(localStorage.getItem('cake-toppers-favorites') || '[]')
  );
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const { data: products } = useProducts();
  const { data: categories } = useCategories();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const stats = [
    {
      title: 'Total de Produtos',
      value: products?.length?.toString() || '0',
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Favoritos dos Usuários', 
      value: favorites.length.toString(),
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Produtos em Destaque',
      value: products?.filter(p => p.featured)?.length?.toString() || '0',
      icon: BarChart3,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Categorias Ativas',
      value: categories?.length?.toString() || '0',
      icon: Settings,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const recentProducts = products?.slice(0, 4) || [];

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setShowProductForm(true);
    setActiveTab('products');
  };

  const handleProductFormSuccess = () => {
    setShowProductForm(false);
    setEditingProduct(null);
  };

  if (showProductForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-6 flex-1">
          <ProductForm
            product={editingProduct}
            onSuccess={handleProductFormSuccess}
            onCancel={() => setShowProductForm(false)}
          />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6 flex-1">
        {/* Admin Header com logout */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Painel Administrativo</h1>
            <p className="text-gray-600 dark:text-gray-400">Bem-vindo, {user?.email}</p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="products">Produtos</TabsTrigger>
            <TabsTrigger value="categories">Categorias</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Dashboard</h2>
              <p className="text-gray-600 dark:text-gray-400">Gerencie seus produtos e acompanhe o desempenho da loja</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-full ${stat.bgColor}`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Ações Rápidas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600"
                    onClick={() => setShowProductForm(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Produto
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-pink-200 text-pink-600 hover:bg-pink-50 dark:border-pink-800 dark:text-pink-400 dark:hover:bg-pink-950"
                    onClick={() => setActiveTab('categories')}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Editar Categorias
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-purple-200 text-purple-600 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-400 dark:hover:bg-purple-950"
                    onClick={() => setActiveTab('reports')}
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Ver Relatórios
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Products */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Produtos Recentes
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setActiveTab('products')}
                  >
                    Ver Todos
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">{product.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {product.categories?.name} • {new Date(product.created_at).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={product.featured ? 'default' : 'secondary'}>
                          {product.featured ? 'Destaque' : 'Regular'}
                        </Badge>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {recentProducts.length === 0 && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      Nenhum produto cadastrado ainda.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Gerenciar Produtos</h2>
              <Button 
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600"
                onClick={() => setShowProductForm(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Novo Produto
              </Button>
            </div>
            <ProductList onEdit={handleEditProduct} />
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Gerenciar Categorias</h2>
            <CategoryManager />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Relatórios</h2>
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Relatórios em Desenvolvimento
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Esta funcionalidade estará disponível em breve.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
