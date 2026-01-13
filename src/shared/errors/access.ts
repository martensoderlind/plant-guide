export type AccessDeniedKind = "UNAUTHORIZED" | "FORBIDDEN";

export class AccessDeniedError extends Error {
  readonly kind: AccessDeniedKind;
  readonly permission: string;

  constructor(opts: {
    kind: AccessDeniedKind;
    permission: string;
    message?: string;
  }) {
    super(
      opts.message ??
        (opts.kind === "UNAUTHORIZED" ? "Unauthorized" : "Forbidden")
    );
    this.name = "AccessDeniedError";
    this.kind = opts.kind;
    this.permission = opts.permission;
  }
}

export function isAccessDeniedError(err: unknown): err is AccessDeniedError {
  return err instanceof AccessDeniedError;
}
