
import React from 'react';
import { FileText, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ReportGenerationSectionProps {
  email: string;
  setEmail: (email: string) => void;
  generateReport: () => void;
  emailReport: () => void;
  hasPhotos: boolean;
}

const ReportGenerationSection: React.FC<ReportGenerationSectionProps> = ({
  email,
  setEmail,
  generateReport,
  emailReport,
  hasPhotos
}) => {
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
            disabled={!hasPhotos || !email}
          >
            <Mail className="mr-2 h-4 w-4" />
            Email Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerationSection;
