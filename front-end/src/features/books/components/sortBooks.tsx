import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp01, ArrowDownWideNarrow } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';

type SortBooksProps = {
  onSortChange: (criteria: 'id' | 'lastEdited') => void;
  sortCriteria: 'id' | 'lastEdited';
};

export const SortBooks: FC<SortBooksProps> = ({
  onSortChange,
  sortCriteria,
}) => {
  const handleSortChange = () => {
    onSortChange(sortCriteria === 'id' ? 'lastEdited' : 'id');
  };

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleSortChange}
            className="ml-4 p-2 border border-gray-300 rounded flex items-center justify-center"
          >
            {sortCriteria === 'id' ? (
              <ArrowUp01 className="w-4 h-4" />
            ) : (
              <ArrowDownWideNarrow className="w-4 h-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-white text-sm text-gray-700 p-2 rounded shadow m-2">
          {sortCriteria === 'id'
            ? 'Ordenar por ID'
            : 'Ordenar por última edición'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
