
import { useState } from 'react';
import { toast } from "sonner";
import { Photo, ProjectDetails } from '@/components/PhotoReport/types';

export function usePhotoReportForm() {
  const MAX_PHOTOS = 100;
  
  // State management
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [email, setEmail] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingStatus, setUploadingStatus] = useState(false);
  const [projectDetails, setProjectDetails] = useState<ProjectDetails>({
    clientName: '',
    address: '',
    dateOfIncident: '',
    typeOfDamage: '',
    estimatedSeverity: '',
    insuranceCompany: '',
    claimNumber: '',
    additionalNotes: ''
  });

  // Project details handlers
  const handleProjectDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProjectDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setProjectDetails(prev => ({ ...prev, [name]: value }));
  };

  const saveProjectDetails = () => {
    // Basic validation
    if (!projectDetails.clientName.trim()) {
      toast.error("Client name is required");
      return;
    }
    
    if (!projectDetails.address.trim()) {
      toast.error("Address is required");
      return;
    }
    
    if (!projectDetails.dateOfIncident) {
      toast.error("Date of incident is required");
      return;
    }
    
    console.log('Saving project details:', projectDetails);
    toast.success('Project details saved successfully!');
  };

  // Photo upload handlers
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    
    const files = Array.from(event.target.files);
    if (photos.length + files.length > MAX_PHOTOS) {
      toast.error(`You can only upload up to ${MAX_PHOTOS} photos. Please remove some photos or select fewer.`);
      return;
    }
    
    setUploadingStatus(true);
    const newPhotos = files.map(file => ({
      file,
      name: file.name,
      note: '',
      url: URL.createObjectURL(file)
    }));

    setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
    
    // Simulating upload progress
    let progress = 0;
    setUploadProgress(0);
    const interval = setInterval(() => {
      progress += Math.random() * 5;
      if (progress > 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setUploadingStatus(false);
          toast.success(`${files.length} photos uploaded successfully`);
        }, 500);
      }
      setUploadProgress(progress);
    }, 100);
  };

  const removePhoto = (index: number) => {
    setPhotos(prevPhotos => {
      const updatedPhotos = prevPhotos.filter((_, i) => i !== index);
      prevPhotos[index].url && URL.revokeObjectURL(prevPhotos[index].url);
      return updatedPhotos;
    });
    toast.info("Photo removed");
  };

  const addNoteToPhoto = (index: number, note: string) => {
    setPhotos(prevPhotos => prevPhotos.map((photo, i) => 
      i === index ? { ...photo, note } : photo
    ));
  };

  // Report generation handlers
  const generateReport = () => {
    if (photos.length === 0) {
      toast.error("Please upload at least one photo before generating a report");
      return;
    }
    
    const numberedPhotos = photos.map((photo, index) => ({
      number: index + 1,
      name: photo.name,
      note: photo.note
    }));
    console.log('Generating report with numbered photos:', numberedPhotos);
    toast.success('PDF report generated successfully!');
  };

  const emailReport = () => {
    if (photos.length === 0) {
      toast.error("Please upload at least one photo before emailing a report");
      return;
    }
    
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }
    toast.success(`Report emailed to ${email}`);
  };

  return {
    projectDetails,
    photos,
    email,
    setEmail,
    uploadProgress,
    uploadingStatus,
    MAX_PHOTOS,
    handleProjectDetailsChange,
    handleSelectChange,
    saveProjectDetails,
    handlePhotoUpload,
    removePhoto,
    addNoteToPhoto,
    generateReport,
    emailReport
  };
}
