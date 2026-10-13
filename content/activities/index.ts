import { movementIdeaSchema, type MovementIdea } from "@/content-schema/activity-ideas";
import { handsIdeas } from "./hands";
import { movementIdeas as rawMovement } from "./movement";
import { peopleIdeas } from "./people";
import { routinesIdeas } from "./routines";
import { sensesIdeas } from "./senses";
import { talkingIdeas } from "./talking";
import { thinkingIdeas } from "./thinking";

const raw: MovementIdea[] = [
  ...rawMovement,
  ...handsIdeas,
  ...sensesIdeas,
  ...thinkingIdeas,
  ...talkingIdeas,
  ...peopleIdeas,
  ...routinesIdeas,
];

/** Parse at import time so a malformed entry fails the build, not the parent. */
export const activityIdeas = raw.map((m) => movementIdeaSchema.parse(m));
