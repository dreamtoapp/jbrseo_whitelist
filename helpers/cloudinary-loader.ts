/**
 * Custom Cloudinary loader for Next.js Image component.
 * Extracts the image path from Cloudinary URLs and applies responsive transformations.
 * This ensures Cloudinary serves appropriately sized images based on the viewport.
 * 
 * @param params - Next.js Image loader parameters
 * @returns Optimized Cloudinary URL with width, quality, and format transformations
 */
export default function cloudinaryLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  // Handle non-Cloudinary images
  if (!src.includes("res.cloudinary.com")) {
    // For local images (starting with /), return with query params for Next.js optimization
    // This allows Next.js to still optimize local images even with custom loader
    if (src.startsWith("/")) {
      // Return the local path - Next.js will serve from public directory
      // The custom loader must return a valid URL/path
      return src;
    }
    // For remote non-Cloudinary images, return as-is
    // These are handled by remotePatterns in next.config.ts
    return src;
  }

  // Extract the path after /upload/ from the Cloudinary URL
  // Pattern: https://res.cloudinary.com/{cloud_name}/image/upload/{transformations}/{image_id}
  const uploadIndex = src.indexOf("/upload/");

  if (uploadIndex === -1) {
    return src;
  }

  // Get the base URL up to /upload/
  const baseUrl = src.substring(0, uploadIndex + "/upload/".length);

  // Get everything after /upload/ (this includes any existing transformations and the image path)
  let afterUpload = src.substring(uploadIndex + "/upload/".length);

  // Remove existing width, quality, and format transformations to avoid conflicts
  // Cloudinary transformations are comma-separated or slash-separated
  afterUpload = afterUpload
    .replace(/w_\d+[,\/]/g, "")
    .replace(/q_(auto|\d+)[,\/]/g, "")
    .replace(/f_auto[,\/]/g, "")
    .replace(/c_limit[,\/]/g, "");

  // Clean up any double slashes or leading/trailing separators
  afterUpload = afterUpload.replace(/^[,\/]+/, "").replace(/[,\/]+$/, "");

  // Build transformations: width, quality auto, format auto, crop limit (maintain aspect ratio)
  const transformations = [
    `w_${width}`,
    "q_auto",
    "f_auto",
    "c_limit",
  ].join(",");

  // Construct optimized URL: baseUrl + transformations + / + clean image path
  return `${baseUrl}${transformations}/${afterUpload}`;
}
