import { articles } from "./permissions/articles";
import { plantGuides } from "./permissions/plant-guides";

export const rolesPermissions = {
  admin: new Set([...Object.values(plantGuides), ...Object.values(articles)]),
  user: new Set([]),
  author: new Set([]),
  moderator: new Set([]),
} as const;
