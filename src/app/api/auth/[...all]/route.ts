import { toNextJsHandler } from "better-auth/next-js";
import { authEnabled, getAuth } from "@/lib/auth";

function disabled() {
  return Response.json({ error: "Auth is not configured in this environment." }, { status: 404 });
}

const handlers = authEnabled ? toNextJsHandler(getAuth()) : null;

export async function GET(req: Request) {
  return handlers ? handlers.GET(req) : disabled();
}

export async function POST(req: Request) {
  return handlers ? handlers.POST(req) : disabled();
}
