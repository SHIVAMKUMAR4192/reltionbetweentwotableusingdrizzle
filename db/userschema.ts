import { InferModel, relations } from 'drizzle-orm';
import { serial, integer, json, pgTable, timestamp, uuid, varchar, text } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const user = pgTable('user', {
  id: serial('id').primaryKey(),
  first_name: varchar('first_name').notNull(),
  last_name: varchar('last_name').notNull(),
  phNumber: varchar('ph_number').notNull(),
  created_at: timestamp('created_at',{ withTimezone: true }).defaultNow(),
});



 export const userRelations= relations(user, ({ one }) =>({
  profile: one(profiles, {
    fields: [user.id],
    references: [profiles.userId],
  }),
})) 
export const profiles = pgTable("profiles", {
  id: serial ('id').primaryKey(),
  bio: varchar('bio', { length: 256}),
  userId:integer('userId').notNull().references(() => user.id),
})

export type SelectUser = InferModel<typeof user>;
export type InsertUser = InferModel<typeof user, 'insert'>;

export const SelectUser = createSelectSchema(user);
export const InsertUser = createInsertSchema(user);


