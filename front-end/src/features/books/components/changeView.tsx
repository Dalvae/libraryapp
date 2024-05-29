// ChangeView.tsx
import { List, GalleryHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';

type ChangeViewProps = {
  view: 'table' | 'cards';
  onViewChange: (view: 'table' | 'cards') => void;
};

export const ChangeView = ({ view, onViewChange }: ChangeViewProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => onViewChange(view === 'table' ? 'cards' : 'table')}
            icon={
              view === 'table' ? (
                <List className="w-4 h-4" />
              ) : (
                <GalleryHorizontal className="w-4 h-4" />
              )
            }
            variant="default"
            className="ml-4"
          />
        </TooltipTrigger>
        <TooltipContent className="bg-white text-sm text-gray-700 p-2 rounded shadow">
          Cambiar Vista
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
