
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useFilters } from '@/hooks/useFilters';
import FilterBadges from './FilterBadges';

interface AdvancedFiltersProps {
  showAdvancedFilters: boolean;
  onToggleAdvancedFilters: (show: boolean) => void;
  selectedFilters: {
    materials: string[];
    occasions: string[];
    themes: string[];
  };
  onFiltersChange: (filters: any) => void;
  hasActiveFilters: boolean;
  onClearAllFilters: () => void;
}

const AdvancedFilters = ({
  showAdvancedFilters,
  onToggleAdvancedFilters,
  selectedFilters,
  onFiltersChange,
  hasActiveFilters,
  onClearAllFilters
}: AdvancedFiltersProps) => {
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

  return (
    <Collapsible open={showAdvancedFilters} onOpenChange={onToggleAdvancedFilters}>
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
            onClick={onClearAllFilters}
            className="text-gray-500 hover:text-gray-700 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
          >
            Limpar Filtros
          </Button>
        )}
      </div>
      
      <CollapsibleContent className="space-y-3 sm:space-y-4 pt-3 sm:pt-4">
        <FilterBadges
          title="Materiais"
          items={materials}
          selectedItems={selectedFilters.materials}
          onToggle={(value) => toggleFilter('materials', value)}
          colorClass="bg-pink-500"
          hoverClass="hover:bg-pink-50"
        />

        <FilterBadges
          title="Ocasiões"
          items={occasions}
          selectedItems={selectedFilters.occasions}
          onToggle={(value) => toggleFilter('occasions', value)}
          colorClass="bg-purple-500"
          hoverClass="hover:bg-purple-50"
        />

        <FilterBadges
          title="Temas"
          items={themes}
          selectedItems={selectedFilters.themes}
          onToggle={(value) => toggleFilter('themes', value)}
          colorClass="bg-pink-600"
          hoverClass="hover:bg-pink-50"
        />
      </CollapsibleContent>
    </Collapsible>
  );
};

export default AdvancedFilters;
