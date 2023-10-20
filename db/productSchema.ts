import { InferModel } from 'drizzle-orm';
import { serial, integer, pgTable, varchar, decimal } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const product = pgTable('product', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  description: varchar('description').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
});

export type SelectProduct = InferModel<typeof product>;
export type InsertProduct = InferModel<typeof product, 'insert'>;

export const SelectProduct = createSelectSchema(product);
export const InsertProduct = createInsertSchema(product);
