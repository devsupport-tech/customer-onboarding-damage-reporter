
import React from 'react';
import { CloudLightning } from 'lucide-react';
import PhotoUploadSection from './PhotoReport/PhotoUploadSection';
import ProjectDetails from './OnboardingForm/ProjectDetails';
import ReportOptions from './OnboardingForm/ReportOptions';
import { usePhotoReportForm } from '@/hooks/usePhotoReportForm';

const CustomerOnboardingForm = () => {
  const {
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
  } = usePhotoReportForm();

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <div className="bg-white dark:bg-card rounded-2xl shadow-sm border border-border p-8 mb-10">
        <div className="flex items-center mb-8">
          <CloudLightning className="h-10 w-10 text-primary mr-3" />
          <h1 className="text-3xl font-semibold tracking-tight">Customer Onboarding & Damage Report</h1>
        </div>
        
        {/* Project Details Section */}
        <ProjectDetails 
          projectDetails={projectDetails}
          handleProjectDetailsChange={handleProjectDetailsChange}
          handleSelectChange={handleSelectChange}
          saveProjectDetails={saveProjectDetails}
        />
        
        {/* Photo Upload Section */}
        <PhotoUploadSection 
          photos={photos}
          uploadProgress={uploadProgress}
          uploadingStatus={uploadingStatus}
          MAX_PHOTOS={MAX_PHOTOS}
          handlePhotoUpload={handlePhotoUpload}
          removePhoto={removePhoto}
          addNoteToPhoto={addNoteToPhoto}
        />
        
        {/* Report Generation Section */}
        <ReportOptions 
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

export default CustomerOnboardingForm;
