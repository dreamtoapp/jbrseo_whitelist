import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Optimizes Cloudinary image URLs by adding automatic format and quality transformations.
 * Adds f_auto (automatic format: WebP, AVIF when supported) and q_auto (automatic quality optimization).
 * 
 * @param url - The image URL (Cloudinary or other)
 * @returns Optimized Cloudinary URL or original URL if not from Cloudinary
 */
export function optimizeCloudinaryUrl(url: string | null | undefined): string {
  if (!url || typeof url !== "string") {
    return url || "";
  }

  // Only optimize Cloudinary URLs
  if (!url.includes("res.cloudinary.com")) {
    return url;
  }

  // Check if URL already has f_auto or q_auto transformations
  if (url.includes("f_auto") || url.includes("q_auto")) {
    return url;
  }

  // Cloudinary URL pattern: https://res.cloudinary.com/{cloud_name}/image/upload/{transformations}/{image_id}
  const uploadIndex = url.indexOf("/upload/");

  if (uploadIndex === -1) {
    return url;
  }

  // Split URL at /upload/
  const beforeUpload = url.substring(0, uploadIndex + "/upload/".length);
  const afterUpload = url.substring(uploadIndex + "/upload/".length);

  // Add f_auto,q_auto transformations before the image path
  // Handle cases: /upload/{image_id}, /upload/v123/{image_id}, /upload/w_500/{image_id}
  return `${beforeUpload}f_auto,q_auto/${afterUpload}`;
}


