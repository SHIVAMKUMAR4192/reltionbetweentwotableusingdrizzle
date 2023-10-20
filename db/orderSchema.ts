import { InferModel } from "drizzle-orm";
import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";


export const order = pgTable('order',{
    id: serial('id').primaryKey(),
    user_id:integer('user_id').notNull(),
    product_id: integer('product_id').notNull(),
    order_date: timestamp('order_date', { withTimezone:true}).defaultNow(),
});
export type SelectOrder = InferModel<typeof order>;
export type InsertOrder = InferModel<typeof order, 'insert'>;

// Create select and insert schemas for the "order" table
export const SelectOrder = createSelectSchema(order);
export const InsertOrder = createInsertSchema(order);
