"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./ImageReveal.module.css";

export default function ImageReveal({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  sizes,
  aspectRatio,
  className = "",
  objectFit = "cover"
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={`${styles.imageWrapper} ${isLoaded ? styles.loaded : styles.loading} ${className}`}
      style={{ aspectRatio: aspectRatio || undefined }}
    >
      <Image
        src={src}
        alt={alt || "Dawson Wells Gallery Artwork"}
        width={!fill ? width || 800 : undefined}
        height={!fill ? height || 1000 : undefined}
        fill={fill}
        priority={priority}
        sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        style={{ objectFit }}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}
