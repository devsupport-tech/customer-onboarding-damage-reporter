
import React from 'react';
import { PenSquare, X, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';
import BlurImage from '@/components/BlurImage';
import { toast } from "sonner";

interface PhotoGalleryProps {
  photos: Array<{
    file: File;
    name: string;
    note: string;
    url: string;
  }>;
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
          <div 
            key={index} 
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
  );
};
