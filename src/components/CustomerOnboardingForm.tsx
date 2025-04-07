
import React, { useState, useEffect } from 'react';
import { CloudLightning, Upload, Camera, Save, FileText, Mail, PenSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from "@/components/ui/badge";
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

// Define interfaces for our data structures
interface ProjectDetails {
  clientName: string;
  address: string;
  dateOfIncident: string;
  typeOfDamage: string;
  estimatedSeverity: string;
  insuranceCompany: string;
  claimNumber: string;
  additionalNotes: string;
}

interface Photo {
  file: File;
  name: string;
  note: string;
  url: string;
}

const CustomerOnboardingForm = () => {
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
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <div className="bg-white rounded-2xl shadow-sm border border-border p-8 mb-10">
        <div className="flex items-center mb-8">
          <CloudLightning className="h-10 w-10 text-primary mr-3" />
          <h1 className="text-3xl font-semibold tracking-tight">Customer Onboarding & Damage Report</h1>
        </div>
        
        {/* Project Details Section */}
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
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block text-muted-foreground">
                  Type of Damage
                </label>
                <Select onValueChange={(value) => handleSelectChange('typeOfDamage', value)}>
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
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block text-muted-foreground">
                  Estimated Severity
                </label>
                <Select onValueChange={(value) => handleSelectChange('estimatedSeverity', value)}>
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
        
        {/* Photo Upload Section */}
        <div className="mb-8 animate-slide-in" style={{ animationDelay: "200ms" }}>
          <h2 className="text-xl font-medium mb-4">Damage Photos</h2>
          
          <div className="mb-4">
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoUpload}
              className="hidden"
              id="photo-upload"
            />
            <label htmlFor="photo-upload" className="cursor-pointer block">
              <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border rounded-xl hover:bg-accent/50 transition-colors duration-200">
                <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                <span className="text-muted-foreground font-medium">Drag photos or click to upload</span>
                <span className="text-xs text-muted-foreground mt-1">Maximum {MAX_PHOTOS} photos</span>
              </div>
            </label>
          </div>

          {uploadingStatus && (
            <div className="mb-6 animate-fade-in">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Uploading photos...</span>
                <span className="text-sm font-medium">{Math.round(uploadProgress)}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          {photos.length > 0 && (
            <div className="mb-8 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Uploaded Photos</h3>
                <Badge variant="outline" className="font-normal">
                  {photos.length}/{MAX_PHOTOS}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {photos.map((photo, index) => (
                  <div 
                    key={index} 
                    className="group relative rounded-lg overflow-hidden border border-border bg-background hover:shadow-md transition-all duration-300"
                  >
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={photo.url}
                        alt={photo.name}
                        className="object-cover w-full h-full transition-all duration-500 ease-in-out group-hover:scale-105"
                      />
                      
                      {photo.note && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-xs truncate">
                          {photo.note}
                        </div>
                      )}
                      
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-black/70 text-white hover:bg-black/70">
                          {index + 1}
                        </Badge>
                      </div>
                      
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="secondary" size="sm" className="rounded-full w-9 h-9 p-0">
                                <Camera className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl animate-fade-in">
                              <DialogHeader>
                                <DialogTitle>Photo {index + 1}: {photo.name}</DialogTitle>
                              </DialogHeader>
                              <div className="mt-4">
                                <img 
                                  src={photo.url} 
                                  alt={photo.name} 
                                  className="w-full h-auto object-contain rounded-lg" 
                                />
                                
                                {photo.note && (
                                  <div className="mt-4 p-4 bg-muted rounded-lg">
                                    <h4 className="text-sm font-medium mb-1">Notes:</h4>
                                    <p className="text-sm text-muted-foreground">{photo.note}</p>
                                  </div>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="secondary" size="sm" className="rounded-full w-9 h-9 p-0">
                                <PenSquare className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl animate-fade-in">
                              <DialogHeader>
                                <DialogTitle>Add Notes to Photo {index + 1}</DialogTitle>
                              </DialogHeader>
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                                <div>
                                  <img 
                                    src={photo.url} 
                                    alt={photo.name} 
                                    className="w-full h-auto object-contain rounded-lg" 
                                  />
                                  <p className="mt-2 text-sm text-muted-foreground truncate">{photo.name}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium mb-2 block">
                                    Damage Notes
                                  </label>
                                  <Textarea
                                    placeholder="Describe the damage visible in this photo..."
                                    value={photo.note}
                                    onChange={(e) => addNoteToPhoto(index, e.target.value)}
                                    className="h-40 resize-none"
                                  />
                                  <Button 
                                    className="mt-4 w-full"
                                    onClick={() => {
                                      toast.success("Notes saved successfully");
                                    }}
                                  >
                                    Save Notes
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            className="rounded-full w-9 h-9 p-0"
                            onClick={() => removePhoto(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Report Generation Section */}
        <div className="animate-slide-in" style={{ animationDelay: "300ms" }}>
          <h2 className="text-xl font-medium mb-4">Generate Report</h2>
          
          <div className="bg-accent/50 rounded-xl p-6">
            <div className="mb-5">
              <label className="text-sm font-medium mb-1 block text-muted-foreground">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="Enter email for report delivery"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="transition-all hover:border-primary/50 focus:border-primary"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={generateReport} 
                className="flex-1 transition-transform duration-300 hover:translate-y-[-2px]"
                disabled={photos.length === 0}
              >
                <FileText className="mr-2 h-4 w-4" />
                Generate PDF Report
              </Button>
              
              <Button 
                onClick={emailReport}
                variant="outline"
                className="flex-1 transition-transform duration-300 hover:translate-y-[-2px]"
                disabled={photos.length === 0 || !email}
              >
                <Mail className="mr-2 h-4 w-4" />
                Email Report
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerOnboardingForm;
