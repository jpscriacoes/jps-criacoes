
import { Button } from "@/components/ui/button";
import { useCategories } from '@/hooks/useCategories';
import CategoryIcon from '@/components/CategoryIcon';

interface CategoryPillsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryPills = ({ selectedCategory, onCategoryChange }: CategoryPillsProps) => {
  const { data: categories } = useCategories();

  return (
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
  );
};

export default CategoryPills;
