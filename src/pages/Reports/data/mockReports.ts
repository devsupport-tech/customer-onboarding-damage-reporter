
import { Report } from '@/components/PhotoReport/types';

export const mockReports: Report[] = [
  {
    id: '1',
    clientName: 'John Doe',
    address: '123 Main St, Portland, OR',
    dateCreated: '2025-03-24',
    dateOfIncident: '2025-03-22',
    photoCount: 15,
    status: 'completed',
    insuranceCompany: 'State Farm',
    claimNumber: 'SF-12345',
    typeOfDamage: 'wind'
  },
  {
    id: '2',
    clientName: 'Jane Smith',
    address: '456 Oak Ave, Seattle, WA',
    dateCreated: '2025-03-23',
    dateOfIncident: '2025-03-21',
    photoCount: 23,
    status: 'processing',
    insuranceCompany: 'Allstate',
    claimNumber: 'AL-67890',
    typeOfDamage: 'hail'
  },
  {
    id: '3',
    clientName: 'Robert Johnson',
    address: '789 Pine Blvd, San Francisco, CA',
    dateCreated: '2025-03-22',
    dateOfIncident: '2025-03-20',
    photoCount: 8,
    status: 'failed',
    insuranceCompany: 'Progressive',
    claimNumber: 'PG-54321',
    typeOfDamage: 'flood'
  },
  {
    id: '4',
    clientName: 'Emily Brown',
    address: '321 Cedar Ln, Denver, CO',
    dateCreated: '2025-03-21',
    dateOfIncident: '2025-03-19',
    photoCount: 31,
    status: 'completed',
    insuranceCompany: 'Liberty Mutual',
    claimNumber: 'LM-13579',
    typeOfDamage: 'wind'
  },
  {
    id: '5',
    clientName: 'Michael Wilson',
    address: '654 Birch Dr, Phoenix, AZ',
    dateCreated: '2025-03-20',
    dateOfIncident: '2025-03-18',
    photoCount: 12,
    status: 'completed',
    insuranceCompany: 'Farmers',
    claimNumber: 'FR-24680',
    typeOfDamage: 'hail'
  }
];

// Add the fetchReports function to simulate a data fetch
export const fetchReports = async (): Promise<Report[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockReports;
};
