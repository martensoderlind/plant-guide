import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

async function validateRequest(request: Request) {
  const payloadString = await request.text();
  const headerPayload = await headers();

  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id")!,
    "svix-timestamp": headerPayload.get("svix-timestamp")!,
    "svix-signature": headerPayload.get("svix-signature")!,
  };
  const wh = new Webhook(webhookSecret as string);
  return wh.verify(payloadString, svixHeaders) as WebhookEvent;
}

export async function POST(request: Request) {
  const payload = await validateRequest(request);
  console.log(payload);
  switch (payload.type) {
    case "user.created":
      await handleNewUser(payload.data);
      break;
    case "session.created":
      await handleUserLogin(payload.data);
      break;
  }
  return Response.json({ message: "webhook processed" });
}
async function handleNewUser(userData: any) {
  console.log("New user created:", userData);
}

async function handleUserLogin(sessionData: any) {
  console.log("User logged in:", sessionData);
}
