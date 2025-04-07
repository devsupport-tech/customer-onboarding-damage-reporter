
import React from 'react';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import BlurImage from '@/components/BlurImage';
import { Photo } from './types';

interface ViewPhotoDialogProps {
  photo: Photo;
  index: number;
}

const ViewPhotoDialog: React.FC<ViewPhotoDialogProps> = ({ photo, index }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm" className="rounded-full w-9 h-9 p-0">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl animate-fade-in">
        <DialogHeader>
          <DialogTitle>Photo {index + 1}: {photo.name}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <BlurImage 
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
  );
};

export default ViewPhotoDialog;
