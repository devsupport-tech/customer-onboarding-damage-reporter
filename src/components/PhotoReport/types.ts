
export interface ProjectDetails {
  clientName: string;
  address: string;
  dateOfIncident: string;
  typeOfDamage: string;
  estimatedSeverity: string;
  insuranceCompany: string;
  claimNumber: string;
  additionalNotes: string;
}

export interface Photo {
  file: File;
  name: string;
  note: string;
  url: string;
}

export interface Report {
  id: string;
  clientName: string;
  address: string;
  dateCreated: string;
  dateOfIncident: string;
  photoCount: number;
  status: 'completed' | 'processing' | 'failed';
  insuranceCompany: string;
  claimNumber: string;
  typeOfDamage: string;
}
