import { Service } from "./types";
import { auth } from "@clerk/nextjs/server";
import { userService } from "../user/instance";
import { iamService } from "./instance";

export function securedService<
  TFeatureService extends string,
  TService extends Service
>(featureName: TFeatureService, service: TService): TService {
  const serviceMethodName = Object.keys(service) as Array<
    keyof TService extends string ? keyof TService : never
  >;

  const securedService = serviceMethodName.reduce((acc, methodName) => {
    const permission = `${featureName}.${methodName}` as const;

    async function securedServiceMethod(args: unknown) {
      const { userId } = await auth();
      const roles: string[] = ["guest"];
      if (userId) {
        const identityRoles = await userService.getUserRole(userId);
        if (identityRoles) {
          roles.push(identityRoles);
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const hasAccess = await iamService.checkAccess(permission as any, roles);
      if (!hasAccess) {
        //update to proper error handling
        console.log("Access Denied:", serviceMethodName, methodName);
        throw new Error("Access Denied");
      }
      return service[methodName](args);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    acc[methodName] = securedServiceMethod as any;
    return acc;
  }, {} as TService);
  return securedService;
}
