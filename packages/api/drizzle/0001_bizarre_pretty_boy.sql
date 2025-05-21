CREATE TABLE `apps` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`slug` text NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `apps_id_unique` ON `apps` (`id`);--> statement-breakpoint
CREATE TABLE `machines` (
	`id` integer PRIMARY KEY NOT NULL,
	`app_id` integer NOT NULL,
	`region` text NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`app_id`) REFERENCES `apps`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `machines_id_unique` ON `machines` (`id`);