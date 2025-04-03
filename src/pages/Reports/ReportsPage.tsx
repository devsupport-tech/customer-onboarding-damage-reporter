
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import NavBar from '@/components/NavBar';
import { mockReports, fetchReports } from './data/mockReports';
import ReportsSearch from './components/ReportsSearch';
import ReportsTable from './components/ReportsTable';
import ReportsPagination from './components/ReportsPagination';

const ReportsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 5;

  const { data, isLoading } = useQuery({
    queryKey: ['reports'],
    queryFn: fetchReports
  });

  // Filter reports based on search term
  const filteredReports = data ? data.filter(report => 
    report.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.claimNumber.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  // Calculate pagination
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      <main className="flex-1 container py-10 px-4 sm:px-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Damage Customer Reports</h1>
        
        <ReportsSearch 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
        />
        
        <ReportsTable 
          reports={currentReports}
          isLoading={isLoading}
        />
        
        {totalPages > 1 && (
          <ReportsPagination 
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        )}
      </main>
    </div>
  );
};

export default ReportsPage;
