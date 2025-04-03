
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ReportsSearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const ReportsSearch: React.FC<ReportsSearchProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex items-center mb-6">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by client, address or claim #"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>
    </div>
  );
};

export default ReportsSearch;
