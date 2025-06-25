
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchInput = ({ searchTerm, onSearchChange }: SearchInputProps) => {
  return (
    <Input
      placeholder="Buscar produtos..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className="bg-white/70 border-pink-200 focus:border-pink-400 transition-colors text-sm sm:text-base"
    />
  );
};

export default SearchInput;
