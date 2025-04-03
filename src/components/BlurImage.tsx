
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface BlurImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
}

const BlurImage = ({ 
  src, 
  alt, 
  className, 
  wrapperClassName, 
  ...props 
}: BlurImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (src) {
      setIsLoading(true);
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setIsLoading(false);
      };
    }
  }, [src]);

  return (
    <div className={cn("overflow-hidden relative", wrapperClassName)}>
      {isLoading && (
        <div className="absolute inset-0 bg-muted/30 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt || ""}
        className={cn(
          "transition-all duration-500 ease-in-out",
          isLoading ? "scale-110 blur-md" : "scale-100 blur-0",
          className
        )}
        {...props}
      />
    </div>
  );
};

export default BlurImage;
