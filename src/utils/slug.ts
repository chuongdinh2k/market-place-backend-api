export function generateSlug(name: string, additionalField?: string): string {
  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  let slug = slugify(name);
  if (additionalField) {
    slug += "-" + slugify(additionalField);
  }
  return slug;
}
