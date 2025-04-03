
import React from 'react';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

interface ReportsPaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const ReportsPagination: React.FC<ReportsPaginationProps> = ({ 
  currentPage, 
  totalPages, 
  setCurrentPage 
}) => {
  return (
    <div className="mt-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {currentPage > 1 ? (
              <PaginationPrevious 
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                className={cn(currentPage <= 1 && "pointer-events-none opacity-50")}
              />
            ) : (
              <PaginationPrevious 
                onClick={() => {}} 
                className="pointer-events-none opacity-50"
              />
            )}
          </PaginationItem>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={currentPage === page}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          
          <PaginationItem>
            {currentPage < totalPages ? (
              <PaginationNext
                onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                className={cn(currentPage >= totalPages && "pointer-events-none opacity-50")}
              />
            ) : (
              <PaginationNext
                onClick={() => {}}
                className="pointer-events-none opacity-50"
              />
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ReportsPagination;
