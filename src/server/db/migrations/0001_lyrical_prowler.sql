PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_subscribers` (
	`id` integer PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`created_at` integer DEFAULT '"2026-01-14T02:36:13.399Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2026-01-14T02:36:13.399Z"' NOT NULL,
	`traffic_source` text,
	`device` text,
	`email_verified` integer,
	`unsubscribed` integer,
	`confirmation_token` text,
	CONSTRAINT "email" CHECK("__new_subscribers"."email" LIKE '%_@__%.__%')
);
--> statement-breakpoint
INSERT INTO `__new_subscribers`("id", "email", "created_at", "updated_at", "traffic_source", "device", "email_verified", "unsubscribed", "confirmation_token") SELECT "id", "email", "created_at", "updated_at", "traffic_source", "device", "email_verified", "unsubscribed", "confirmation_token" FROM `subscribers`;--> statement-breakpoint
DROP TABLE `subscribers`;--> statement-breakpoint
ALTER TABLE `__new_subscribers` RENAME TO `subscribers`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `subscribers_email_unique` ON `subscribers` (`email`);