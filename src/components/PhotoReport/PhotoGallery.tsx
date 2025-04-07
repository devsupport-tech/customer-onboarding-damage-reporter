
import React from 'react';
import { Badge } from "@/components/ui/badge";
import PhotoCard from './PhotoCard';
import { Photo } from './types';

interface PhotoGalleryProps {
  photos: Photo[];
  MAX_PHOTOS: number;
  removePhoto: (index: number) => void;
  addNoteToPhoto: (index: number, note: string) => void;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ 
  photos, 
  MAX_PHOTOS, 
  removePhoto, 
  addNoteToPhoto 
}) => {
  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Uploaded Photos</h3>
        <Badge variant="outline" className="font-normal">
          {photos.length}/{MAX_PHOTOS}
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <PhotoCard
            key={index}
            photo={photo}
            index={index}
            removePhoto={removePhoto}
            addNoteToPhoto={addNoteToPhoto}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
