/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// Users table keyed by Firebase Auth UID
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  displayName: text('display_name'),
  photoUrl: text('photo_url'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Client project inquiries & briefs table
export const inquiries = pgTable('inquiries', {
  id: serial('id').primaryKey(),
  inquiryId: text('inquiry_id').notNull().unique(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  userUid: text('user_uid').notNull(),
  userName: text('user_name').notNull(),
  userEmail: text('user_email').notNull(),
  company: text('company'),
  phone: text('phone'),
  service: text('service').notNull(),
  budget: text('budget'),
  timeline: text('timeline'),
  details: text('details'),
  status: text('status').notNull().default('submitted'), // 'submitted' | 'under_review' | 'contacted'
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Relationships
export const usersRelations = relations(users, ({ many }) => ({
  inquiries: many(inquiries),
}));

export const inquiriesRelations = relations(inquiries, ({ one }) => ({
  author: one(users, {
    fields: [inquiries.userId],
    references: [users.id],
  }),
}));
