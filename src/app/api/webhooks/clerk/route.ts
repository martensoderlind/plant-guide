import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";
import { NextResponse } from "next/server";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

if (!webhookSecret) {
  throw new Error("CLERK_WEBHOOK_SECRET is not defined");
}

async function validateRequest(request: Request) {
  try {
    const payloadString = await request.text();
    const headerPayload = await headers();

    const svixHeaders = {
      "svix-id": headerPayload.get("svix-id")!,
      "svix-timestamp": headerPayload.get("svix-timestamp")!,
      "svix-signature": headerPayload.get("svix-signature")!,
    };

    if (
      !svixHeaders["svix-id"] ||
      !svixHeaders["svix-timestamp"] ||
      !svixHeaders["svix-signature"]
    ) {
      throw new Error("missing svix headers");
    }
    if (!webhookSecret) {
      throw new Error("CLERK_WEBHOOK_SECRET is not defined");
    }
    const wh = new Webhook(webhookSecret);
    return wh.verify(payloadString, svixHeaders) as WebhookEvent;
  } catch (error) {
    console.error("Webhook validation failed:", error);
    throw error;
  }
}
export async function POST(request: Request) {
  try {
    console.log("Webhook received");

    const payload = await validateRequest(request);

    console.log("Webhook event type:", payload.type);
    console.log("Webhook payload:", JSON.stringify(payload, null, 2));

    switch (payload.type) {
      case "user.created":
        await handleNewUser(payload.data);
        break;
      case "user.updated":
        await handleUserActivity(payload.data);
        break;
      case "session.created":
        await handleUserLogin(payload.data);
        break;
      case "session.ended":
        await handleUserLogout(payload.data);
        break;
      default:
        console.log(`unhandled events: ${payload.type}`);
    }

    return NextResponse.json({
      message: "Webhook processed successfully",
      type: payload.type,
    });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 400 }
    );
  }
}

async function handleNewUser(userData: any) {
  console.log("new user:", userData);
}

async function handleUserActivity(userData: any) {
  console.log("user activity (sign in):", userData);
  if (userData.last_sign_in_at) {
    const lastSignIn = new Date(userData.last_sign_in_at);
    const now = new Date();
    const timeDiff = now.getTime() - lastSignIn.getTime();

    if (timeDiff < 5 * 60 * 1000) {
      console.log("user logged in:", userData.id);
    }
  }
}

async function handleUserLogin(sessionData: any) {
  console.log("Session created:", sessionData);
}

async function handleUserLogout(sessionData: any) {
  console.log("Session ended:", sessionData);
}
