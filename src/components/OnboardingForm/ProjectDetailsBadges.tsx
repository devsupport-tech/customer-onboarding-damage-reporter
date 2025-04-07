
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { getSeverityColor, getDamageColor } from './ProjectDetailsUtils';

interface ProjectDetailsBadgesProps {
  estimatedSeverity?: string;
  typeOfDamage?: string;
}

const ProjectDetailsBadges: React.FC<ProjectDetailsBadgesProps> = ({
  estimatedSeverity,
  typeOfDamage
}) => {
  return (
    <div className="ml-auto flex space-x-2">
      {estimatedSeverity && (
        <Badge className={getSeverityColor(estimatedSeverity)}>
          {estimatedSeverity.charAt(0).toUpperCase() + estimatedSeverity.slice(1)} Severity
        </Badge>
      )}
      
      {typeOfDamage && (
        <Badge className={getDamageColor(typeOfDamage)}>
          {typeOfDamage.charAt(0).toUpperCase() + typeOfDamage.slice(1)} Damage
        </Badge>
      )}
    </div>
  );
};

export default ProjectDetailsBadges;
