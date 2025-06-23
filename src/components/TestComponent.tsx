import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useProducts, useTransformedProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';

const TestComponent = () => {
  const [testState, setTestState] = useState('Inicial');
  
  // ✅ TESTAR hooks básicos
  const { data: products, isLoading: productsLoading, error: productsError } = useProducts();
  const { data: transformedProducts, isLoading: transformedLoading, error: transformedError } = useTransformedProducts();
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useCategories();

  const runTest = () => {
    console.log('🧪 TESTE INICIADO');
    console.log('Products:', products);
    console.log('Transformed Products:', transformedProducts);
    console.log('Categories:', categories);
    console.log('Loading states:', { productsLoading, transformedLoading, categoriesLoading });
    console.log('Errors:', { productsError, transformedError, categoriesError });
    
    setTestState('Teste executado - verifique o console');
  };

  return (
    <Card className="w-80 bg-white/95 backdrop-blur-sm border-pink-200">
      <CardHeader>
        <CardTitle className="text-sm">🧪 Debug Component</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-xs space-y-1">
          <div>Status: {testState}</div>
          <div>Products: {productsLoading ? '🔄' : products?.length || 0}</div>
          <div>Transformed: {transformedLoading ? '🔄' : transformedProducts?.length || 0}</div>
          <div>Categories: {categoriesLoading ? '🔄' : categories?.length || 0}</div>
        </div>
        
        <Button size="sm" onClick={runTest} className="w-full">
          Executar Teste
        </Button>
        
        <div className="text-xs text-gray-500">
          {productsError && <div>❌ Products Error: {productsError.message}</div>}
          {transformedError && <div>❌ Transformed Error: {transformedError.message}</div>}
          {categoriesError && <div>❌ Categories Error: {categoriesError.message}</div>}
        </div>
      </CardContent>
    </Card>
  );
};

export default TestComponent; 