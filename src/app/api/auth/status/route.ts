import { authEnabled, googleEnabled } from "@/lib/auth";

export async function GET() {
  return Response.json({ enabled: authEnabled, google: googleEnabled });
}
