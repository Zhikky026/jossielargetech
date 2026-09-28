/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { db } from './index.ts';
import { inquiries } from './schema.ts';
import { desc, eq } from 'drizzle-orm';
import { getOrCreateUser } from './users.ts';

export interface CreateInquiryInput {
  inquiryId: string;
  userUid: string;
  userName: string;
  userEmail: string;
  company?: string;
  phone?: string;
  service: string;
  budget?: string;
  timeline?: string;
  details?: string;
  status?: string;
}

export async function createSqlInquiry(input: CreateInquiryInput) {
  try {
    // Ensure the relational user record exists first
    const dbUser = await getOrCreateUser(input.userUid, input.userEmail, input.userName);

    const result = await db
      .insert(inquiries)
      .values({
        inquiryId: input.inquiryId,
        userId: dbUser.id,
        userUid: input.userUid,
        userName: input.userName,
        userEmail: input.userEmail,
        company: input.company || null,
        phone: input.phone || null,
        service: input.service,
        budget: input.budget || null,
        timeline: input.timeline || null,
        details: input.details || null,
        status: input.status || 'submitted',
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error('Database query failed in createSqlInquiry:', error);
    throw new Error('Database operation failed. Please try again later.', { cause: error });
  }
}

export async function getSqlUserInquiries(userUid: string) {
  try {
    return await db
      .select()
      .from(inquiries)
      .where(eq(inquiries.userUid, userUid))
      .orderBy(desc(inquiries.createdAt));
  } catch (error) {
    console.error('Database query failed in getSqlUserInquiries:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function getAllSqlInquiries() {
  try {
    return await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
  } catch (error) {
    console.error('Database query failed in getAllSqlInquiries:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function updateSqlInquiryStatus(inquiryId: string, status: string) {
  try {
    const result = await db
      .update(inquiries)
      .set({
        status,
        updatedAt: new Date(),
      })
      .where(eq(inquiries.inquiryId, inquiryId))
      .returning();

    return result[0];
  } catch (error) {
    console.error('Database query failed in updateSqlInquiryStatus:', error);
    throw new Error('Database operation failed. Please try again later.', { cause: error });
  }
}

export async function deleteSqlInquiry(inquiryId: string) {
  try {
    const result = await db
      .delete(inquiries)
      .where(eq(inquiries.inquiryId, inquiryId))
      .returning();

    return result[0];
  } catch (error) {
    console.error('Database query failed in deleteSqlInquiry:', error);
    throw new Error('Database operation failed. Please try again later.', { cause: error });
  }
}
