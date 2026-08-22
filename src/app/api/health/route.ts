import { dbConfigured } from "@/lib/db";

export async function GET() {
  return Response.json({
    ok: true,
    sha: process.env.RAILWAY_GIT_COMMIT_SHA ?? process.env.RAILWAY_DEPLOYMENT_ID ?? "dev",
    db: dbConfigured(),
    time: new Date().toISOString(),
  });
}
