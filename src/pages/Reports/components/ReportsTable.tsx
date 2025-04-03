
import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Report } from '@/components/PhotoReport/types';
import ReportRow from './ReportRow';

interface ReportsTableProps {
  reports: Report[];
  sortField?: keyof Report;
  sortDirection?: 'asc' | 'desc';
  handleSort?: (field: keyof Report) => void;
  isLoading?: boolean;
}

const ReportsTable: React.FC<ReportsTableProps> = ({ 
  reports, 
  sortField, 
  sortDirection, 
  handleSort,
  isLoading = false
}) => {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort && handleSort('clientName')} className={handleSort ? "cursor-pointer" : ""}>
              Client 
              {sortField === 'clientName' && (
                <ArrowUpDown className="ml-1 h-4 w-4 inline" />
              )}
            </TableHead>
            <TableHead onClick={() => handleSort && handleSort('dateCreated')} className={handleSort ? "cursor-pointer" : ""}>
              Date 
              {sortField === 'dateCreated' && (
                <ArrowUpDown className="ml-1 h-4 w-4 inline" />
              )}
            </TableHead>
            <TableHead onClick={() => handleSort && handleSort('photoCount')} className={handleSort ? "cursor-pointer" : ""}>
              Photos 
              {sortField === 'photoCount' && (
                <ArrowUpDown className="ml-1 h-4 w-4 inline" />
              )}
            </TableHead>
            <TableHead onClick={() => handleSort && handleSort('status')} className={handleSort ? "cursor-pointer" : ""}>
              Status 
              {sortField === 'status' && (
                <ArrowUpDown className="ml-1 h-4 w-4 inline" />
              )}
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6">
                Loading reports...
              </TableCell>
            </TableRow>
          ) : reports.length > 0 ? (
            reports.map((report) => (
              <ReportRow key={report.id} report={report} />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6">
                No reports found matching your search criteria
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReportsTable;
