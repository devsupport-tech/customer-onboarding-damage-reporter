
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProjectDetails as ProjectDetailsType } from '@/components/PhotoReport/types';

interface ProjectDetailsFieldsProps {
  projectDetails: ProjectDetailsType;
  handleProjectDetailsChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

const ProjectDetailsFields: React.FC<ProjectDetailsFieldsProps> = ({
  projectDetails,
  handleProjectDetailsChange,
  handleSelectChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="space-y-5">
        <div>
          <label className="text-sm font-medium mb-1 block text-muted-foreground">
            Client Name
          </label>
          <Input
            name="clientName"
            placeholder="Enter client name"
            value={projectDetails.clientName}
            onChange={handleProjectDetailsChange}
            className="transition-all hover:border-primary/50 focus:border-primary"
            required
          />
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block text-muted-foreground">
            Date of Incident
          </label>
          <Input
            name="dateOfIncident"
            type="date"
            placeholder="Date of Incident"
            value={projectDetails.dateOfIncident}
            onChange={handleProjectDetailsChange}
            className="transition-all hover:border-primary/50 focus:border-primary"
            required
          />
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block text-muted-foreground">
            Type of Damage
          </label>
          <Select 
            onValueChange={(value) => handleSelectChange('typeOfDamage', value)}
            value={projectDetails.typeOfDamage}
          >
            <SelectTrigger className="transition-all hover:border-primary/50 focus:border-primary">
              <SelectValue placeholder="Select damage type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wind">Wind Damage</SelectItem>
              <SelectItem value="hail">Hail Damage</SelectItem>
              <SelectItem value="flood">Flood Damage</SelectItem>
              <SelectItem value="fire">Fire Damage</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block text-muted-foreground">
            Insurance Company
          </label>
          <Input
            name="insuranceCompany"
            placeholder="Enter insurance company"
            value={projectDetails.insuranceCompany}
            onChange={handleProjectDetailsChange}
            className="transition-all hover:border-primary/50 focus:border-primary"
          />
        </div>
      </div>
      
      <div className="space-y-5">
        <div>
          <label className="text-sm font-medium mb-1 block text-muted-foreground">
            Address
          </label>
          <Input
            name="address"
            placeholder="Enter property address"
            value={projectDetails.address}
            onChange={handleProjectDetailsChange}
            className="transition-all hover:border-primary/50 focus:border-primary"
            required
          />
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block text-muted-foreground">
            Estimated Severity
          </label>
          <Select 
            onValueChange={(value) => handleSelectChange('estimatedSeverity', value)}
            value={projectDetails.estimatedSeverity}
          >
            <SelectTrigger className="transition-all hover:border-primary/50 focus:border-primary">
              <SelectValue placeholder="Select severity level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="minor">Minor</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="severe">Severe</SelectItem>
              <SelectItem value="catastrophic">Catastrophic</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block text-muted-foreground">
            Claim Number
          </label>
          <Input
            name="claimNumber"
            placeholder="Enter claim number"
            value={projectDetails.claimNumber}
            onChange={handleProjectDetailsChange}
            className="transition-all hover:border-primary/50 focus:border-primary"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block text-muted-foreground">
            Additional Notes
          </label>
          <Textarea
            name="additionalNotes"
            placeholder="Enter any additional information"
            value={projectDetails.additionalNotes}
            onChange={handleProjectDetailsChange}
            className="resize-none transition-all hover:border-primary/50 focus:border-primary"
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsFields;
