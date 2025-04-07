
import React from 'react';
import { PenSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';
import BlurImage from '@/components/BlurImage';
import { toast } from "sonner";
import { Photo } from './types';

interface AddNotesDialogProps {
  photo: Photo;
  index: number;
  addNoteToPhoto: (index: number, note: string) => void;
}

const AddNotesDialog: React.FC<AddNotesDialogProps> = ({ 
  photo, 
  index, 
  addNoteToPhoto 
}) => {
  return (
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
            <BlurImage 
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
  );
};

export default AddNotesDialog;
