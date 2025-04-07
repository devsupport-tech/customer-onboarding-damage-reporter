
import React from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectDetails as ProjectDetailsType } from '@/components/PhotoReport/types';
import ProjectDetailsBadges from './ProjectDetailsBadges';
import ProjectDetailsFields from './ProjectDetailsFields';

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
  return (
    <div className="mb-10 animate-slide-in" style={{ animationDelay: "100ms" }}>
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-medium">Project Details</h2>
        
        <ProjectDetailsBadges 
          estimatedSeverity={projectDetails.estimatedSeverity} 
          typeOfDamage={projectDetails.typeOfDamage} 
        />
      </div>
      
      <ProjectDetailsFields 
        projectDetails={projectDetails}
        handleProjectDetailsChange={handleProjectDetailsChange}
        handleSelectChange={handleSelectChange}
      />
      
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
