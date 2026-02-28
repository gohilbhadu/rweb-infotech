const LAPTOP_PLACEHOLDERS = [
  '/assets/generated/laptop-generic-1.dim_1200x900.png',
  '/assets/generated/laptop-generic-2.dim_1200x900.png',
  '/assets/generated/laptop-generic-3.dim_1200x900.png',
];

const BRAND_PLACEHOLDER = '/assets/generated/brand-placeholder.dim_256x256.png';

function isValidImageUrl(url: string): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  if (trimmed === '') return false;
  // Reject relative stub paths that look like backend placeholder paths (e.g. "apple/img1.jpg")
  if (!trimmed.startsWith('http') && !trimmed.startsWith('/') && !trimmed.startsWith('data:')) return false;
  return true;
}

/**
 * Returns a laptop placeholder image URL by index (cycles through available placeholders).
 */
export function getLaptopPlaceholder(index: number = 0): string {
  return LAPTOP_PLACEHOLDERS[index % LAPTOP_PLACEHOLDERS.length];
}

/**
 * Returns the brand placeholder image URL.
 */
export function getBrandPlaceholder(): string {
  return BRAND_PLACEHOLDER;
}

/**
 * Returns gallery images, padding with placeholders to ensure at least 3 images.
 */
export function getGalleryImages(images: string[]): string[] {
  const validImages = images.filter(isValidImageUrl);

  if (validImages.length >= 3) {
    return validImages;
  }

  const result = [...validImages];
  while (result.length < 3) {
    const placeholderIndex = result.length % LAPTOP_PLACEHOLDERS.length;
    result.push(LAPTOP_PLACEHOLDERS[placeholderIndex]);
  }

  return result;
}

/**
 * Returns the first valid image URL from an array, or a laptop placeholder.
 */
export function getPrimaryImage(images: string[]): string {
  const validImages = images.filter(isValidImageUrl);
  return validImages[0] || LAPTOP_PLACEHOLDERS[0];
}

/**
 * Returns the first valid brand image URL, or the brand placeholder.
 */
export function getBrandImage(images: string[]): string {
  const validImages = images.filter(isValidImageUrl);
  return validImages[0] || BRAND_PLACEHOLDER;
}
