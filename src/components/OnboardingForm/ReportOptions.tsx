
import React from 'react';
import { FileText, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";

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
    
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }
    
    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    emailReport();
  };

  return (
    <div className="animate-slide-in" style={{ animationDelay: "300ms" }}>
      <h2 className="text-xl font-medium mb-4">Generate Report</h2>
      
      <div className="bg-accent/50 rounded-xl p-6">
        <div className="mb-5">
          <label className="text-sm font-medium mb-1 block text-muted-foreground">
            Email Address
          </label>
          <Input
            type="email"
            placeholder="Enter email for report delivery"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="transition-all hover:border-primary/50 focus:border-primary"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={handleGenerateReport} 
            className="flex-1 transition-transform duration-300 hover:translate-y-[-2px]"
            disabled={!hasPhotos}
          >
            <FileText className="mr-2 h-4 w-4" />
            Generate PDF Report
          </Button>
          
          <Button 
            onClick={handleEmailReport}
            variant="outline"
            className="flex-1 transition-transform duration-300 hover:translate-y-[-2px]"
            disabled={!hasPhotos}
          >
            <Mail className="mr-2 h-4 w-4" />
            Email Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportOptions;
