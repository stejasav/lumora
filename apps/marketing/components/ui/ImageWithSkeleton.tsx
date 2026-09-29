"use client";

import React, { useState, useEffect, useRef } from "react";
import { Skeleton } from "./Skeleton";

interface ImageWithSkeletonProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  variant?: "arch" | "rounded" | "circular" | "rectangular";
  containerClassName?: string;
  skeletonClassName?: string;
}

export function ImageWithSkeleton({
  src,
  alt,
  variant = "rounded",
  className = "",
  containerClassName = "",
  skeletonClassName = "",
  style,
  onLoad,
  ...props
}: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // If the image is already cached by the browser, complete might be true on mount
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true);
    }
  }, [src]);

  return (
    <div className={`relative h-full w-full overflow-hidden ${containerClassName}`}>
      {/* Shimmering Skeleton until image finishes loading */}
      {!isLoaded && (
        <Skeleton
          variant={variant}
          className={`absolute inset-0 h-full w-full ${skeletonClassName}`}
        />
      )}

      {/* Actual Image */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        style={style}
        onLoad={(e) => {
          setIsLoaded(true);
          onLoad?.(e);
        }}
        className={`${className} transition-opacity duration-500 ease-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        {...props}
      />
    </div>
  );
}

export default ImageWithSkeleton;
