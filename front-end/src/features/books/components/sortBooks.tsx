import { ChangeEvent, FC } from 'react';

type SortBooksProps = {
  onSortChange: (criteria: 'id' | 'lastEdited') => void;
};

export const SortBooks: FC<SortBooksProps> = ({ onSortChange }) => {
  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value as 'id' | 'lastEdited');
  };

  return (
    <div className="mb-4">
      <select
        onChange={handleSortChange}
        className="p-2 border border-gray-300 rounded"
      >
        <option value="id">Ordenar por ID</option>
        <option value="lastEdited">Ordenar por Última Edición</option>
      </select>
    </div>
  );
};
