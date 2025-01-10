import { Search } from 'lucide-react';
import React from 'react';
import { SearchContainer, SearchIcon, SearchInput } from './styles/search';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
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
