
import { useState } from 'react';
import SearchInput from './SearchInput';
import CategoryPills from './CategoryPills';
import AdvancedFilters from './AdvancedFilters';

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
      <SearchInput 
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
      />

      <CategoryPills
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />

      <AdvancedFilters
        showAdvancedFilters={showAdvancedFilters}
        onToggleAdvancedFilters={setShowAdvancedFilters}
        selectedFilters={selectedFilters}
        onFiltersChange={onFiltersChange}
        hasActiveFilters={hasActiveFilters}
        onClearAllFilters={clearAllFilters}
      />
    </div>
  );
};

export default FilterBar;
