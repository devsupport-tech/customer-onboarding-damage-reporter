
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import BlurImage from '@/components/BlurImage';
import ViewPhotoDialog from './ViewPhotoDialog';
import AddNotesDialog from './AddNotesDialog';
import { Photo } from './types';

interface PhotoCardProps {
  photo: Photo;
  index: number;
  removePhoto: (index: number) => void;
  addNoteToPhoto: (index: number, note: string) => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({
  photo,
  index,
  removePhoto,
  addNoteToPhoto
}) => {
  return (
    <div 
      className="group relative rounded-lg overflow-hidden border border-border bg-background hover:shadow-md transition-all duration-300"
    >
      <div className="aspect-square relative overflow-hidden">
        <BlurImage
          src={photo.url}
          alt={photo.name}
          className="object-cover w-full h-full"
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
            <ViewPhotoDialog photo={photo} index={index} />
            <AddNotesDialog photo={photo} index={index} addNoteToPhoto={addNoteToPhoto} />
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
  );
};

export default PhotoCard;
