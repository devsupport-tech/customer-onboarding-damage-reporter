
import React from 'react';
import { toast } from "sonner";
import EmailInput from './EmailInput';
import ReportButtons from './ReportButtons';
import { validateEmailForReport } from './utils/emailValidation';

interface ReportOptionsProps {
  email: string;
  setEmail: (email: string) => void;
  generateReport: () => void;
  emailReport: () => void;
  hasPhotos: boolean;
}

const ReportOptions: React.FC<ReportOptionsProps> = ({
  email,
  setEmail,
  generateReport,
  emailReport,
  hasPhotos
}) => {
  const handleGenerateReport = () => {
    if (!hasPhotos) {
      toast.error("Please upload at least one photo before generating a report");
      return;
    }
    generateReport();
  };

  const handleEmailReport = () => {
    if (!hasPhotos) {
      toast.error("Please upload at least one photo before emailing a report");
      return;
    }
    
    if (!validateEmailForReport(email)) {
      return;
    }
    
    emailReport();
  };

  return (
    <div className="animate-slide-in" style={{ animationDelay: "300ms" }}>
      <h2 className="text-xl font-medium mb-4">Generate Report</h2>
      
      <div className="bg-accent/50 rounded-xl p-6">
        <EmailInput email={email} setEmail={setEmail} />
        <ReportButtons 
          generateReport={handleGenerateReport}
          emailReport={handleEmailReport}
          hasPhotos={hasPhotos}
          hasValidEmail={!!email}
        />
      </div>
    </div>
  );
};

export default ReportOptions;
