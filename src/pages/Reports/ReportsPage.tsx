
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { PlusCircle, Filter, SortDesc } from "lucide-react";
import ReportsTable from "./components/ReportsTable";
import ReportsSearch from "./components/ReportsSearch";
import ReportsPagination from "./components/ReportsPagination";
import { mockReports } from "./data/mockReports";

const ReportsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      <main className="flex-1 container py-10 px-4 sm:px-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-semibold tracking-tight">Damage Reports</h1>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
              >
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
              >
                <SortDesc className="h-4 w-4" />
                <span className="hidden sm:inline">Sort</span>
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                className="flex items-center gap-1"
              >
                <PlusCircle className="h-4 w-4" />
                <span>New Report</span>
              </Button>
            </div>
          </div>
          
          <ReportsSearch 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <ReportsTable reports={mockReports} />
            <ReportsPagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              setCurrentPage={setCurrentPage} 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReportsPage;
