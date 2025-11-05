// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Service = { [key: string]: (args: any) => Promise<any> };

export type PermissionSchema<
  TFeatureName extends string,
  TService extends Service
> = {
  [k in keyof TService]: `${TFeatureName}.${k extends string ? k : never}`;
};
