
import React from 'react';
import { FileText, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ReportButtonsProps {
  generateReport: () => void;
  emailReport: () => void;
  hasPhotos: boolean;
  hasValidEmail: boolean;
}

const ReportButtons: React.FC<ReportButtonsProps> = ({
  generateReport,
  emailReport,
  hasPhotos,
  hasValidEmail
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button 
        onClick={generateReport} 
        className="flex-1 transition-transform duration-300 hover:translate-y-[-2px]"
        disabled={!hasPhotos}
      >
        <FileText className="mr-2 h-4 w-4" />
        Generate PDF Report
      </Button>
      
      <Button 
        onClick={emailReport}
        variant="outline"
        className="flex-1 transition-transform duration-300 hover:translate-y-[-2px]"
        disabled={!hasPhotos}
      >
        <Mail className="mr-2 h-4 w-4" />
        Email Report
      </Button>
    </div>
  );
};

export default ReportButtons;
