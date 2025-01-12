import { Search } from 'lucide-react';
import { SearchContainer, SearchIcon, SearchInput } from './SearchBar.styles';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <SearchContainer>
      <SearchIcon>
        <Search size={16} />
      </SearchIcon>
      <SearchInput
        type="text"
        placeholder="Search tasks..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </SearchContainer>
  );
};

export default SearchBar;
