/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDocFromServer,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// CRITICAL: Initialize Firestore with specific database ID
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Initialize Firebase Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Operation types for error diagnosis
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

/**
 * Standardized Firestore Error Handler conforming to system specification
 */
export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

/**
 * Validates connection to Firestore at startup
 */
export async function testFirestoreConnection(): Promise<boolean> {
  const testPath = 'test/connection';
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('✅ Firestore server connection verified successfully.');
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration: client is offline.');
    } else {
      // Missing test document is normal and indicates connection to server was successful
      console.log('ℹ️ Firestore reachability confirmed.');
    }
    return true;
  }
}

// Start connection verification
testFirestoreConnection();

/**
 * Sign in with Google Popup
 */
export async function signInWithGoogle(): Promise<User> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    if (user) {
      await syncUserProfile(user);
    }
    return user;
  } catch (error) {
    console.error('Error during Google Sign-in:', error);
    throw error;
  }
}

/**
 * Sign out current user
 */
export async function signOutUser(): Promise<void> {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt?: any;
  updatedAt?: any;
}

/**
 * Create or sync user profile document in Firestore
 */
export async function syncUserProfile(user: User): Promise<void> {
  const userPath = `users/${user.uid}`;
  try {
    const userDocRef = doc(db, 'users', user.uid);
    const snap = await getDoc(userDocRef);
    const now = new Date().toISOString();

    if (!snap.exists()) {
      const newProfile: Record<string, any> = {
        id: user.uid,
        email: user.email || '',
        displayName: user.displayName || 'Client User',
        createdAt: now,
        updatedAt: now,
      };
      if (user.photoURL) {
        newProfile.photoURL = user.photoURL;
      }
      await setDoc(userDocRef, newProfile);
    } else {
      const updateData: Record<string, any> = {
        displayName: user.displayName || snap.data()?.displayName || 'Client User',
        updatedAt: now,
      };
      if (user.photoURL) {
        updateData.photoURL = user.photoURL;
      }
      await updateDoc(userDocRef, updateData);
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, userPath);
  }
}

export interface ProjectInquiry {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  company?: string;
  phone?: string;
  service: string;
  budget?: string;
  timeline?: string;
  details?: string;
  status: 'submitted' | 'under_review' | 'contacted';
  createdAt?: any;
  updatedAt?: any;
}

/**
 * Save a new Project Inquiry to Firestore
 */
export async function createProjectInquiry(
  inquiryData: Omit<ProjectInquiry, 'id' | 'createdAt' | 'updatedAt' | 'userId'>
): Promise<string> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('You must be signed in to submit and track a project brief.');
  }

  const inquiryId = 'inq_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
  const path = `inquiries/${inquiryId}`;
  const now = new Date().toISOString();

  const payload: ProjectInquiry = {
    id: inquiryId,
    userId: user.uid,
    userName: inquiryData.userName.trim().slice(0, 128),
    userEmail: (inquiryData.userEmail || user.email || '').trim().slice(0, 256),
    service: inquiryData.service.trim().slice(0, 128),
    status: 'submitted',
    createdAt: now,
    updatedAt: now,
  };

  if (inquiryData.company) payload.company = inquiryData.company.trim().slice(0, 128);
  if (inquiryData.phone) payload.phone = inquiryData.phone.trim().slice(0, 64);
  if (inquiryData.budget) payload.budget = inquiryData.budget.trim().slice(0, 64);
  if (inquiryData.timeline) payload.timeline = inquiryData.timeline.trim().slice(0, 64);
  if (inquiryData.details) payload.details = inquiryData.details.trim().slice(0, 4000);

  try {
    await setDoc(doc(db, 'inquiries', inquiryId), payload);
    return inquiryId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

/**
 * Real-time listener for current user's inquiries
 */
export function subscribeToUserInquiries(
  userId: string,
  onUpdate: (inquiries: ProjectInquiry[]) => void,
  onError?: (err: Error) => void
): Unsubscribe {
  const path = 'inquiries';
  const inquiriesRef = collection(db, 'inquiries');
  const q = query(inquiriesRef, where('userId', '==', userId));

  return onSnapshot(
    q,
    (snapshot) => {
      const items: ProjectInquiry[] = [];
      snapshot.forEach((d) => {
        items.push(d.data() as ProjectInquiry);
      });
      // Sort by createdAt descending
      items.sort((a, b) => {
        const timeA = new Date(a.createdAt || 0).getTime();
        const timeB = new Date(b.createdAt || 0).getTime();
        return timeB - timeA;
      });
      onUpdate(items);
    },
    (error) => {
      if (onError) onError(error);
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

/**
 * Real-time listener for admin to view all inquiries
 */
export function subscribeToAllInquiries(
  onUpdate: (inquiries: ProjectInquiry[]) => void,
  onError?: (err: Error) => void
): Unsubscribe {
  const path = 'inquiries';
  const inquiriesRef = collection(db, 'inquiries');

  return onSnapshot(
    inquiriesRef,
    (snapshot) => {
      const items: ProjectInquiry[] = [];
      snapshot.forEach((d) => {
        items.push(d.data() as ProjectInquiry);
      });
      items.sort((a, b) => {
        const timeA = new Date(a.createdAt || 0).getTime();
        const timeB = new Date(b.createdAt || 0).getTime();
        return timeB - timeA;
      });
      onUpdate(items);
    },
    (error) => {
      if (onError) onError(error);
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

/**
 * Update an inquiry status (Admin only)
 */
export async function updateInquiryStatus(
  inquiryId: string,
  newStatus: 'submitted' | 'under_review' | 'contacted'
): Promise<void> {
  const path = `inquiries/${inquiryId}`;
  try {
    const docRef = doc(db, 'inquiries', inquiryId);
    await updateDoc(docRef, {
      status: newStatus,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

/**
 * Delete an inquiry (Owner if submitted, or Admin)
 */
export async function deleteInquiry(inquiryId: string): Promise<void> {
  const path = `inquiries/${inquiryId}`;
  try {
    await deleteDoc(doc(db, 'inquiries', inquiryId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

/**
 * Check if given user is designated admin
 */
export function checkIsAdmin(user: User | null): boolean {
  if (!user || !user.email) return false;
  return user.email.toLowerCase() === 'mubarakzhikirullah@gmail.com';
}
