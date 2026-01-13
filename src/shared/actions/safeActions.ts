"use server";

import { isAccessDeniedError } from "../errors/access";
import { ActionResult } from "./result";

export async function safeAction<T>(
  fn: () => Promise<T>
): Promise<ActionResult<T>> {
  try {
    const data = await fn();
    return { ok: true, data };
  } catch (err) {
    if (isAccessDeniedError(err)) {
      return {
        ok: false,
        error: {
          code: err.kind,
          message:
            err.kind === "UNAUTHORIZED"
              ? "You do not have permission to access this feature."
              : "You must be logged in to perform this action.",
        },
      };
    }

    console.error("Unexpected server action error:", err);

    return {
      ok: false,
      error: {
        code: "UNKNOWN",
        message: "Something went wrong, please try again.",
      },
    };
  }
}
