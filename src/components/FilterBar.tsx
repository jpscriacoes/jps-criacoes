
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useCategories } from '@/hooks/useCategories';
import { useFilters } from '@/hooks/useFilters';
import CategoryIcon from '@/components/CategoryIcon';

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedFilters: {
    materials: string[];
    occasions: string[];
    themes: string[];
  };
  onFiltersChange: (filters: any) => void;
}

const FilterBar = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedFilters,
  onFiltersChange
}: FilterBarProps) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // ✅ USAR dados dinâmicos
  const { data: categories } = useCategories();
  const { materials, occasions, themes } = useFilters();

  const toggleFilter = (type: 'materials' | 'occasions' | 'themes', value: string) => {
    const currentFilters = selectedFilters[type];
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter(item => item !== value)
      : [...currentFilters, value];
    
    onFiltersChange({
      ...selectedFilters,
      [type]: newFilters
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      materials: [],
      occasions: [],
      themes: []
    });
    onCategoryChange('all');
    onSearchChange('');
  };

  const hasActiveFilters = selectedFilters.materials.length > 0 || 
                          selectedFilters.occasions.length > 0 || 
                          selectedFilters.themes.length > 0 ||
                          selectedCategory !== 'all' ||
                          searchTerm !== '';

  return (
    <div className="sticky top-[73px] z-40 glass-effect border-b border-pink-100/30 p-3 sm:p-4 space-y-3 sm:space-y-4">
      {/* Search Bar */}
      <Input
        placeholder="Buscar produtos..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="bg-white/70 border-pink-200 focus:border-pink-400 transition-colors text-sm sm:text-base"
      />

      {/* Category Pills - Melhorado para mobile */}
      <div className="overflow-x-auto">
        <div className="flex gap-1.5 sm:gap-2 pb-2 min-w-max">
          <Button
            variant={selectedCategory === 'all' ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange('all')}
            className={`whitespace-nowrap transition-all duration-200 text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 h-auto min-h-[32px] sm:min-h-[36px] ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md'
                : 'bg-white/70 border-pink-200 hover:bg-pink-50'
            }`}
          >
            <span className="text-sm sm:text-base mr-1">🎨</span>
            <span className="text-xs sm:text-sm">Todos</span>
          </Button>
          
          {categories?.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange(category.id)}
              className={`whitespace-nowrap transition-all duration-200 text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 h-auto min-h-[32px] sm:min-h-[36px] ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md'
                  : 'bg-white/70 border-pink-200 hover:bg-pink-50'
              }`}
            >
              <CategoryIcon icon={category.icon} className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-xs sm:text-sm flex-shrink-0" />
              <span className="text-xs sm:text-sm truncate max-w-[80px] sm:max-w-none">{category.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <Collapsible open={showAdvancedFilters} onOpenChange={setShowAdvancedFilters}>
        <div className="flex items-center justify-between">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="text-pink-600 hover:text-pink-700 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2">
              Filtros Avançados {showAdvancedFilters ? '↑' : '↓'}
            </Button>
          </CollapsibleTrigger>
          
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-gray-500 hover:text-gray-700 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
            >
              Limpar Filtros
            </Button>
          )}
        </div>
        
        <CollapsibleContent className="space-y-3 sm:space-y-4 pt-3 sm:pt-4">
          {/* Materials */}
          {materials.length > 0 && (
            <div>
              <h4 className="text-xs sm:text-sm font-medium mb-2 text-gray-700">Materiais</h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {materials.map((material) => (
                  <Badge
                    key={material}
                    variant={selectedFilters.materials.includes(material) ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-200 text-xs px-2 py-1 ${
                      selectedFilters.materials.includes(material)
                        ? 'bg-pink-500 text-white'
                        : 'border-pink-200 hover:bg-pink-50'
                    }`}
                    onClick={() => toggleFilter('materials', material)}
                  >
                    {material}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Occasions */}
          {occasions.length > 0 && (
            <div>
              <h4 className="text-xs sm:text-sm font-medium mb-2 text-gray-700">Ocasiões</h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {occasions.map((occasion) => (
                  <Badge
                    key={occasion}
                    variant={selectedFilters.occasions.includes(occasion) ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-200 text-xs px-2 py-1 ${
                      selectedFilters.occasions.includes(occasion)
                        ? 'bg-purple-500 text-white'
                        : 'border-purple-200 hover:bg-purple-50'
                    }`}
                    onClick={() => toggleFilter('occasions', occasion)}
                  >
                    {occasion}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Themes */}
          {themes.length > 0 && (
            <div>
              <h4 className="text-xs sm:text-sm font-medium mb-2 text-gray-700">Temas</h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {themes.map((theme) => (
                  <Badge
                    key={theme}
                    variant={selectedFilters.themes.includes(theme) ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-200 text-xs px-2 py-1 ${
                      selectedFilters.themes.includes(theme)
                        ? 'bg-pink-600 text-white'
                        : 'border-pink-200 hover:bg-pink-50'
                    }`}
                    onClick={() => toggleFilter('themes', theme)}
                  >
                    {theme}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default FilterBar;
