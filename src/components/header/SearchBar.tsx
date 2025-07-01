
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  variant: 'desktop' | 'mobile';
}

const SearchBar = ({ variant }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    }
  };

  if (variant === 'desktop') {
    return (
      <form onSubmit={handleSearch} className="hidden md:flex items-center space-x-2">
        <Input
          type="search"
          placeholder="Buscar produtos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64 bg-gray-50 border-gray-200 focus:border-pink-400"
        />
        <Button type="submit" size="sm" variant="outline">
          <Search className="h-4 w-4" />
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSearch} className="flex md:hidden items-center space-x-2 flex-1 max-w-xs mx-4">
      <Input
        type="search"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-gray-50 border-gray-200 focus:border-pink-400 text-sm"
      />
      <Button type="submit" size="sm" variant="outline">
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default SearchBar;
