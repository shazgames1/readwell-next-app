-- Remove all rows from users table
TRUNCATE TABLE "users";

ALTER TABLE "users" RENAME COLUMN "country" TO "countryCode";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "countryCode" SET NOT NULL;