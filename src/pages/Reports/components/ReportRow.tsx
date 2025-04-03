
import React from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Report } from '@/components/PhotoReport/types';
import { toast } from 'sonner';

interface ReportRowProps {
  report: Report;
}

const ReportRow: React.FC<ReportRowProps> = ({ report }) => {
  const handleDownload = (reportId: string) => {
    toast.success(`Report #${reportId} download started`);
  };

  const handleEmail = (reportId: string) => {
    toast.success(`Report #${reportId} emailed successfully`);
  };

  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">{report.clientName}</div>
        <div className="text-sm text-muted-foreground truncate max-w-[200px]">
          {report.address}
        </div>
        <div className="text-xs text-muted-foreground">
          Claim #: {report.claimNumber}
        </div>
      </TableCell>
      <TableCell>
        <div>Created: {report.dateCreated}</div>
        <div className="text-sm text-muted-foreground">
          Incident: {report.dateOfIncident}
        </div>
        <div className="text-xs mt-1">
          <Badge variant="outline">{report.typeOfDamage} damage</Badge>
        </div>
      </TableCell>
      <TableCell>
        <div className="text-center font-medium">{report.photoCount}</div>
      </TableCell>
      <TableCell>
        {report.status === 'completed' && (
          <Badge className="bg-green-600">
            <CheckCircle className="mr-1 h-3 w-3" /> Completed
          </Badge>
        )}
        {report.status === 'processing' && (
          <Badge variant="secondary">
            <Clock className="mr-1 h-3 w-3" /> Processing
          </Badge>
        )}
        {report.status === 'failed' && (
          <Badge variant="destructive">
            <AlertCircle className="mr-1 h-3 w-3" /> Failed
          </Badge>
        )}
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleDownload(report.id)}
            disabled={report.status !== 'completed'}
          >
            Download
          </Button>
          <Button 
            size="sm"
            onClick={() => handleEmail(report.id)}
            disabled={report.status !== 'completed'}
          >
            Email
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ReportRow;
