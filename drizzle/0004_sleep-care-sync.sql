CREATE TABLE "care_logs" (
	"id" uuid PRIMARY KEY NOT NULL,
	"baby_id" uuid NOT NULL,
	"payload" jsonb NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "sleep_sessions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"baby_id" uuid NOT NULL,
	"payload" jsonb NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "care_logs" ADD CONSTRAINT "care_logs_baby_id_babies_id_fk" FOREIGN KEY ("baby_id") REFERENCES "public"."babies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sleep_sessions" ADD CONSTRAINT "sleep_sessions_baby_id_babies_id_fk" FOREIGN KEY ("baby_id") REFERENCES "public"."babies"("id") ON DELETE cascade ON UPDATE no action;