export function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function skillKey(categoryId: string, skillName: string) {
  return `${categoryId}:${slugify(skillName)}`;
}

export function skillSlug(categoryId: string, skillName: string) {
  return `${categoryId}-${slugify(skillName)}`;
}

export function parseSkillSlug(slug: string) {
  const idx = slug.indexOf("-");
  if (idx === -1) return null;
  const categoryId = slug.slice(0, idx);
  const rest = slug.slice(idx + 1);
  return { categoryId, nameSlug: rest };
}
