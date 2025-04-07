
// Utility functions for ProjectDetails component

/**
 * Returns the appropriate CSS class for severity badges
 */
export const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'minor': return 'bg-blue-100 text-blue-800';
    case 'moderate': return 'bg-yellow-100 text-yellow-800';
    case 'severe': return 'bg-orange-100 text-orange-800';
    case 'catastrophic': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

/**
 * Returns the appropriate CSS class for damage type badges
 */
export const getDamageColor = (damageType: string) => {
  switch (damageType) {
    case 'wind': return 'bg-sky-100 text-sky-800';
    case 'hail': return 'bg-indigo-100 text-indigo-800';
    case 'flood': return 'bg-blue-100 text-blue-800';
    case 'fire': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
