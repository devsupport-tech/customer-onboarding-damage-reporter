
import React, { useState, useEffect } from 'react';
import { CloudLightning } from 'lucide-react';
import { toast } from "sonner";
import { Photo, ProjectDetails } from './PhotoReport/types';
import ProjectDetailsForm from './PhotoReport/ProjectDetailsForm';
import PhotoUploadSection from './PhotoReport/PhotoUploadSection';
import ReportGenerationSection from './PhotoReport/ReportGenerationSection';

const MAX_PHOTOS = 100;

const PhotoReportApp = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
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

  useEffect(() => {
    const timer = setTimeout(() => setMessage(''), 5000);
    return () => clearTimeout(timer);
  }, [message]);

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

  const handleProjectDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProjectDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setProjectDetails(prev => ({ ...prev, [name]: value }));
  };

  const saveProjectDetails = () => {
    console.log('Saving project details:', projectDetails);
    toast.success('Project details saved successfully!');
  };

  const addNoteToPhoto = (index: number, note: string) => {
    setPhotos(prevPhotos => prevPhotos.map((photo, i) => 
      i === index ? { ...photo, note } : photo
    ));
  };

  const generateReport = () => {
    const numberedPhotos = photos.map((photo, index) => ({
      number: index + 1,
      name: photo.name,
      note: photo.note
    }));
    console.log('Generating report with numbered photos:', numberedPhotos);
    toast.success('PDF report generated successfully!');
  };

  const emailReport = () => {
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }
    toast.success(`Report emailed to ${email}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <div className="bg-white rounded-2xl shadow-sm border border-border p-8 mb-10">
        <div className="flex items-center mb-8">
          <CloudLightning className="h-10 w-10 text-primary mr-3" />
          <h1 className="text-3xl font-semibold tracking-tight">Damage Customer Onboarding</h1>
        </div>
        
        <ProjectDetailsForm 
          projectDetails={projectDetails}
          handleProjectDetailsChange={handleProjectDetailsChange}
          handleSelectChange={handleSelectChange}
          saveProjectDetails={saveProjectDetails}
        />
        
        <PhotoUploadSection 
          photos={photos}
          uploadProgress={uploadProgress}
          uploadingStatus={uploadingStatus}
          MAX_PHOTOS={MAX_PHOTOS}
          handlePhotoUpload={handlePhotoUpload}
          removePhoto={removePhoto}
          addNoteToPhoto={addNoteToPhoto}
        />
        
        <ReportGenerationSection 
          email={email}
          setEmail={setEmail}
          generateReport={generateReport}
          emailReport={emailReport}
          hasPhotos={photos.length > 0}
        />
      </div>
    </div>
  );
};

export default PhotoReportApp;
