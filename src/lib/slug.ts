// Phase 3: URL slug utilities

export function createSlug(text: string): string {
  // Create URL-friendly slug
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function getHabitSlug(name: string): string {
  // Generate URL-safe slug from habit name
  return createSlug(name);
}

export function parseSlug(slug: string): string {
  // Parse slug back to readable text
  return slug.replace(/-/g, " ");
}
