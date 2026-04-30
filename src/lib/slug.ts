// Phase 2: URL slug utilities
// Will implement slug generation logic in future phases

export function createSlug(text: string): string {
  // Phase 2: Create URL-friendly slug
  return text.toLowerCase().replace(/\s+/g, "-");
}

export function parseSlug(slug: string): string {
  // Phase 2: Parse slug back to readable text
  return slug.replace(/-/g, " ");
}
