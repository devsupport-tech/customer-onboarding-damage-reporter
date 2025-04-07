
import React from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from "@/components/ui/badge";
import { ProjectDetails as ProjectDetailsType } from '@/components/PhotoReport/types';

interface ProjectDetailsProps {
  projectDetails: ProjectDetailsType;
  handleProjectDetailsChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  saveProjectDetails: () => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  projectDetails,
  handleProjectDetailsChange,
  handleSelectChange,
  saveProjectDetails
}) => {
  // Helper function for severity badge colors
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'minor': return 'bg-blue-100 text-blue-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'severe': return 'bg-orange-100 text-orange-800';
      case 'catastrophic': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function for damage type badge colors
  const getDamageColor = (damageType: string) => {
    switch (damageType) {
      case 'wind': return 'bg-sky-100 text-sky-800';
      case 'hail': return 'bg-indigo-100 text-indigo-800';
      case 'flood': return 'bg-blue-100 text-blue-800';
      case 'fire': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="mb-10 animate-slide-in" style={{ animationDelay: "100ms" }}>
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-medium">Project Details</h2>
        <div className="ml-auto flex space-x-2">
          {projectDetails.estimatedSeverity && (
            <Badge className={getSeverityColor(projectDetails.estimatedSeverity)}>
              {projectDetails.estimatedSeverity.charAt(0).toUpperCase() + projectDetails.estimatedSeverity.slice(1)} Severity
            </Badge>
          )}
          
          {projectDetails.typeOfDamage && (
            <Badge className={getDamageColor(projectDetails.typeOfDamage)}>
              {projectDetails.typeOfDamage.charAt(0).toUpperCase() + projectDetails.typeOfDamage.slice(1)} Damage
            </Badge>
          )}
        </div>
      </div>
      
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
      
      <Button 
        onClick={saveProjectDetails} 
        className="mt-5 transition-all duration-300 hover:shadow-md"
      >
        <Save className="mr-2 h-4 w-4" />
        Save Project Details
      </Button>
    </div>
  );
};

export default ProjectDetails;
