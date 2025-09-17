import { $ZodIssue } from "zod/v4/core";

export function formatErrors(errors: $ZodIssue[]) {
  const returnErrorS = [];
  for (const error of errors) {
    const validationErrors = { path: "", message: "" };
    validationErrors.path = error.path[0].toLocaleString();
    validationErrors.message = error.message;
    returnErrorS.push(validationErrors);
  }
  return returnErrorS;
}
