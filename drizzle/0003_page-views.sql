CREATE TABLE "page_views" (
	"day" text NOT NULL,
	"path" text NOT NULL,
	"n" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "page_views_day_path_pk" PRIMARY KEY("day","path")
);
