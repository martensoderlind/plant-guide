import { $ZodIssue } from "zod/v4/core";

export function formatErrors(errors: $ZodIssue[]) {
  const fieldErrors: Record<string, string> = {};
  errors.forEach((error) => {
    const field = error.path[0] as string;
    fieldErrors[field] = error.message;
  });
  return fieldErrors;
}

export function generateSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
