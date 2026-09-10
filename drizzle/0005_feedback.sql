CREATE TABLE "feedback" (
	"id" uuid PRIMARY KEY NOT NULL,
	"category" text NOT NULL,
	"message" text NOT NULL,
	"page" text,
	"locale" text,
	"user_id" text,
	"email" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
