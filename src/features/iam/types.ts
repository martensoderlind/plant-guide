import { rolesPermissions } from "./permissions";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Service = { [key: string]: (args: any) => Promise<any> };

export type PermissionSchema<
  TFeatureName extends string,
  TService extends Service
> = {
  [k in keyof TService]: `${TFeatureName}.${k extends string ? k : never}`;
};

export type Role = keyof typeof rolesPermissions;
export type RolesPermissions = (typeof rolesPermissions)[Role];
export type Permission = RolesPermissions extends Set<infer P> ? P : never;
