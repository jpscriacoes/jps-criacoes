
import { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Package, Users, BarChart3, Settings, Plus, Edit, Trash2 } from 'lucide-react';

const Admin = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<string[]>(
    JSON.parse(localStorage.getItem('cake-toppers-favorites') || '[]')
  );

  const handleFavoritesClick = () => {
    navigate('/favorites');
  };

  const stats = [
    {
      title: 'Total de Produtos',
      value: '156',
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
      title: 'Pedidos Este Mês',
      value: '42',
      icon: BarChart3,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Categorias Ativas',
      value: '8',
      icon: Settings,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const recentProducts = [
    { id: 1, name: 'Topo Unicórnio Rosa', category: 'Infantil', status: 'Ativo', created: '2 dias atrás' },
    { id: 2, name: 'Decoração Casamento Elegante', category: 'Casamento', status: 'Ativo', created: '3 dias atrás' },
    { id: 3, name: 'Topo Aniversário Tropical', category: 'Aniversário', status: 'Inativo', created: '5 dias atrás' },
    { id: 4, name: 'Kit Festa Superhéis', category: 'Infantil', status: 'Ativo', created: '1 semana atrás' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <Header 
        title="Painel Administrativo"
        showFavorites 
        onFavoritesClick={handleFavoritesClick}
        favoriteCount={favorites.length}
      />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h2>
          <p className="text-gray-600">Gerencie seus produtos e acompanhe o desempenho da loja</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
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
              <Button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Produto
              </Button>
              <Button variant="outline" className="border-pink-200 text-pink-600 hover:bg-pink-50">
                <Edit className="w-4 h-4 mr-2" />
                Editar Categorias
              </Button>
              <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
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
              <Button variant="outline" size="sm">
                Ver Todos
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{product.name}</h4>
                    <p className="text-sm text-gray-600">{product.category} • {product.created}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={product.status === 'Ativo' ? 'default' : 'secondary'}>
                      {product.status}
                    </Badge>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Admin;
