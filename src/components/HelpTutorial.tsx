
import React from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { 
  HelpCircle, 
  FileText, 
  Image, 
  Send, 
  Download,
  Clipboard,
  CheckCircle2
} from 'lucide-react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

const HelpTutorial = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full absolute bottom-6 right-6 w-12 h-12 shadow-md hover:shadow-lg"
          title="Help & Tutorial"
        >
          <HelpCircle className="h-6 w-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" side="top" align="end">
        <div className="px-4 py-3 bg-primary text-primary-foreground">
          <h3 className="font-medium">Help & Tutorial</h3>
          <p className="text-sm text-primary-foreground/80">Learn how to use the app</p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="px-4 py-3">
              <div className="flex items-center gap-2">
                <Clipboard className="h-4 w-4" />
                <span>Getting Started</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-3">
              <p className="text-sm text-muted-foreground">
                Start by filling out the project details form with client information and damage details. 
                All fields marked with * are required.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="px-4 py-3">
              <div className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                <span>Uploading Photos</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-3">
              <p className="text-sm text-muted-foreground">
                Click the upload area or drag and drop photos to add them. You can add notes to each photo 
                by clicking the pencil icon. You can upload up to 100 photos per report.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="px-4 py-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Creating Reports</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-3">
              <p className="text-sm text-muted-foreground">
                After adding project details and photos, you can generate a PDF report that includes all information.
                The PDF can be downloaded or emailed directly to clients or insurance companies.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="px-4 py-3">
              <div className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                <span>Emailing Reports</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-3">
              <p className="text-sm text-muted-foreground">
                Enter a valid email address in the email field and click "Email Report" to send the generated 
                report directly. Make sure you've added at least one photo first.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="px-4 py-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>Tips & Best Practices</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-3">
              <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                <li>Add detailed notes to each photo to document the damage</li>
                <li>Complete all project details for comprehensive reports</li>
                <li>Use the dashboard to track your report history</li>
                <li>Photos should be clear and well-lit to document damage properly</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download User Guide
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default HelpTutorial;
