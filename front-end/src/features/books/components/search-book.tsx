import { ChangeEvent, FC } from 'react';
import { useState } from 'react';

type SearchBooksProps = {
  onSearch: (query: string) => void;
};

export const SearchBooks: FC<SearchBooksProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className=" w-3/5">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Buscar por título, autor o género"
        className="w-full p-1 border border-gray-300 rounded"
      />
    </div>
  );
};
