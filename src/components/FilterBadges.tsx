
import { Badge } from "@/components/ui/badge";

interface FilterBadgesProps {
  title: string;
  items: string[];
  selectedItems: string[];
  onToggle: (value: string) => void;
  colorClass: string;
  hoverClass: string;
}

const FilterBadges = ({ 
  title, 
  items, 
  selectedItems, 
  onToggle, 
  colorClass, 
  hoverClass 
}: FilterBadgesProps) => {
  if (items.length === 0) return null;

  return (
    <div>
      <h4 className="text-xs sm:text-sm font-medium mb-2 text-gray-700">{title}</h4>
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {items.map((item) => (
          <Badge
            key={item}
            variant={selectedItems.includes(item) ? "default" : "outline"}
            className={`cursor-pointer transition-all duration-200 text-xs px-2 py-1 ${
              selectedItems.includes(item)
                ? `${colorClass} text-white`
                : `border-pink-200 ${hoverClass}`
            }`}
            onClick={() => onToggle(item)}
          >
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default FilterBadges;
