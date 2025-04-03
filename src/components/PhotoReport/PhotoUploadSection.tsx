
import React from 'react';
import { Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { PhotoGallery } from './PhotoGallery';

interface PhotoUploadSectionProps {
  photos: Array<{
    file: File;
    name: string;
    note: string;
    url: string;
  }>;
  uploadProgress: number;
  uploadingStatus: boolean;
  MAX_PHOTOS: number;
  handlePhotoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removePhoto: (index: number) => void;
  addNoteToPhoto: (index: number, note: string) => void;
}

const PhotoUploadSection: React.FC<PhotoUploadSectionProps> = ({
  photos,
  uploadProgress,
  uploadingStatus,
  MAX_PHOTOS,
  handlePhotoUpload,
  removePhoto,
  addNoteToPhoto
}) => {
  return (
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
        <PhotoGallery 
          photos={photos} 
          MAX_PHOTOS={MAX_PHOTOS} 
          removePhoto={removePhoto} 
          addNoteToPhoto={addNoteToPhoto} 
        />
      )}
    </div>
  );
};

export default PhotoUploadSection;
