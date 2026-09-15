import { movementIdeaSchema } from "@/content-schema/activity-ideas";
import { movementIdeas as rawMovement } from "./movement";

/** Parse at import time so a malformed entry fails the build, not the parent. */
export const movementIdeas = rawMovement.map((m) => movementIdeaSchema.parse(m));
