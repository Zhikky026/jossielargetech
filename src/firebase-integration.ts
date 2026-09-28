/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  auth,
  signInWithGoogle,
  signOutUser,
  createProjectInquiry,
  subscribeToUserInquiries,
  subscribeToAllInquiries,
  updateInquiryStatus,
  deleteInquiry,
  checkIsAdmin,
  type ProjectInquiry,
} from './firebase';
import { onAuthStateChanged, type User } from 'firebase/auth';

let currentUser: User | null = null;
let currentInquiriesUnsub: (() => void) | null = null;
let userInquiriesList: ProjectInquiry[] = [];

// Initialize once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initFirebaseAuthUI();
  setupFormPersistence();
  setupInquiriesPortalUI();
});

// Toast notification helper
function showToast(message: string, type: 'info' | 'success' | 'error' = 'info') {
  let toastContainer = document.getElementById('jl-toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'jl-toast-container';
    toastContainer.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 99999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
    `;
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const bg =
    type === 'success'
      ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.95), rgba(5, 150, 105, 0.95))'
      : type === 'error'
      ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.95), rgba(185, 28, 28, 0.95))'
      : 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95))';

  toast.style.cssText = `
    padding: 12px 18px;
    border-radius: 12px;
    background: ${bg};
    color: #ffffff;
    font-size: 13.5px;
    font-weight: 500;
    box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.15);
    backdrop-filter: blur(12px);
    display: flex;
    align-items: center;
    gap: 8px;
    opacity: 0;
    transform: translateY(10px) scale(0.95);
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: auto;
    max-width: 380px;
    line-height: 1.4;
  `;

  const icon =
    type === 'success'
      ? '✓'
      : type === 'error'
      ? '✕'
      : 'ℹ';

  toast.innerHTML = `<span style="font-weight:bold;font-size:15px">${icon}</span><span>${message}</span>`;
  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0) scale(1)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px) scale(0.95)';
    setTimeout(() => toast.remove(), 250);
  }, 4000);
}

/**
 * Initialize Firebase Auth controls in the header & sticky navbar
 */
function initFirebaseAuthUI() {
  // Inject Auth container into desktop and mobile navigation
  injectAuthButtons();

  // Listen to Auth State
  onAuthStateChanged(auth, (user) => {
    currentUser = user;
    renderAuthState(user);
    syncInquiriesListener(user);
    updateFormPrefill(user);

    if (user) {
      user.getIdToken().then((token) => {
        fetch('/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }).catch((err) => console.warn('Cloud SQL user profile sync note:', err));
      }).catch(console.error);
    }
  });
}

function injectAuthButtons() {
  // 1. Header site menu container
  const siteMenu = document.getElementById('site-menu');
  if (siteMenu && !document.getElementById('jl-auth-header-slot')) {
    const authSlot = document.createElement('div');
    authSlot.id = 'jl-auth-header-slot';
    authSlot.className = 'jl-auth-header-slot';
    authSlot.style.cssText = `
      position: absolute;
      right: calc((295 + 19) * var(--u));
      top: calc((31 + 15) * var(--u));
      z-index: 3;
      display: flex;
      align-items: center;
    `;
    siteMenu.appendChild(authSlot);
  }

  // 2. Sticky Bar Auth Slot
  const stickyBar = document.getElementById('jl-sticky-bar');
  if (stickyBar && !document.getElementById('jl-auth-sticky-slot')) {
    const stickySlot = document.createElement('div');
    stickySlot.id = 'jl-auth-sticky-slot';
    stickySlot.style.cssText = `
      display: flex;
      align-items: center;
      margin-left: 10px;
    `;
    stickyBar.appendChild(stickySlot);
  }
}

/**
 * Render user profile or Google Sign-In button across all auth slots
 */
function renderAuthState(user: User | null) {
  const headerSlot = document.getElementById('jl-auth-header-slot');
  const stickySlot = document.getElementById('jl-auth-sticky-slot');

  const slots = [headerSlot, stickySlot].filter(Boolean) as HTMLElement[];

  slots.forEach((slot) => {
    slot.innerHTML = '';

    if (!user) {
      // Unauthenticated: Show Sign in with Google Button
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'jl-google-signin-btn';
      btn.title = 'Sign in with Google to save and track your project briefs';
      btn.style.cssText = `
        display: inline-flex;
        align-items: center;
        gap: 8px;
        height: calc(44 * var(--u));
        padding: 0 calc(16 * var(--u));
        border-radius: 999px;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(240, 244, 250, 0.85) 100%);
        border: 1px solid rgba(255, 255, 255, 0.85);
        border-top: 1.2px solid #ffffff;
        box-shadow: 0 4px 14px rgba(15, 23, 42, 0.12), inset 0 1px 1px #ffffff;
        color: #0F172A;
        font-family: inherit;
        font-size: calc(13.5 * var(--u));
        font-weight: 560;
        cursor: pointer;
        backdrop-filter: blur(12px);
        transition: all 0.2s ease;
        white-space: nowrap;
      `;
      btn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" style="flex:none">
          <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
          <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z"/>
          <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
          <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
        </svg>
        <span>Sign in</span>
      `;

      btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-1px)';
        btn.style.boxShadow = '0 6px 20px rgba(0, 132, 255, 0.25), inset 0 1px 1px #ffffff';
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'none';
        btn.style.boxShadow = '0 4px 14px rgba(15, 23, 42, 0.12), inset 0 1px 1px #ffffff';
      });

      btn.addEventListener('click', async () => {
        try {
          btn.style.opacity = '0.7';
          btn.textContent = 'Signing in...';
          const signedUser = await signInWithGoogle();
          showToast(`Welcome back, ${signedUser.displayName || 'Client'}!`, 'success');
        } catch (err: any) {
          console.error(err);
          showToast('Could not sign in with Google. Please try again.', 'error');
          renderAuthState(null);
        }
      });

      slot.appendChild(btn);
    } else {
      // Authenticated: Show Avatar and User Dropdown
      const userWrap = document.createElement('div');
      userWrap.className = 'jl-user-menu-wrap';
      userWrap.style.cssText = `
        position: relative;
        display: inline-flex;
        align-items: center;
      `;

      const userBtn = document.createElement('button');
      userBtn.type = 'button';
      userBtn.className = 'jl-user-pill-btn';
      userBtn.style.cssText = `
        display: inline-flex;
        align-items: center;
        gap: 8px;
        height: calc(44 * var(--u));
        padding: 0 calc(12 * var(--u)) 0 calc(6 * var(--u));
        border-radius: 999px;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 246, 255, 0.90) 100%);
        border: 1px solid rgba(255, 255, 255, 0.95);
        border-top: 1.2px solid #ffffff;
        box-shadow: 0 4px 16px rgba(15, 23, 42, 0.12);
        color: #0F172A;
        font-family: inherit;
        font-size: calc(13 * var(--u));
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
      `;

      const avatarSrc = user.photoURL || '';
      const initial = (user.displayName || user.email || 'U').charAt(0).toUpperCase();

      userBtn.innerHTML = `
        <div style="width:calc(32 * var(--u));height:calc(32 * var(--u));border-radius:50%;overflow:hidden;background:#0084FF;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:calc(13 * var(--u));box-shadow:0 2px 6px rgba(0,132,255,0.4)">
          ${
            avatarSrc
              ? `<img src="${avatarSrc}" alt="${user.displayName || 'User'}" style="width:100%;height:100%;object-fit:cover" />`
              : initial
          }
        </div>
        <span style="max-width:calc(110 * var(--u));overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${
          user.displayName ? user.displayName.split(' ')[0] : 'Account'
        }</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.7">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      `;

      // Dropdown menu
      const dropdown = document.createElement('div');
      dropdown.className = 'jl-user-dropdown';
      dropdown.style.cssText = `
        display: none;
        position: absolute;
        top: calc(100% + 8px);
        right: 0;
        width: 260px;
        background: linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%);
        border: 1px solid rgba(255, 255, 255, 0.95);
        border-top: 1.5px solid #ffffff;
        border-radius: 18px;
        box-shadow: 0 16px 40px -10px rgba(15, 23, 42, 0.25), 0 0 0 1px rgba(0,0,0,0.05);
        backdrop-filter: blur(20px);
        padding: 12px;
        z-index: 1000;
        flex-direction: column;
        gap: 6px;
      `;

      const isAdmin = checkIsAdmin(user);

      dropdown.innerHTML = `
        <div style="padding:8px 10px;border-bottom:1px solid #E2E8F0;margin-bottom:4px">
          <div style="font-weight:700;color:#0F172A;font-size:14px">${user.displayName || 'Client'}</div>
          <div style="color:#64748B;font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${user.email || ''}</div>
          ${
            isAdmin
              ? `<span style="display:inline-block;margin-top:6px;padding:2px 8px;border-radius:999px;background:#FEF3C7;color:#92400E;font-size:10.5px;font-weight:700">★ ADMIN CONSOLE</span>`
              : `<span style="display:inline-block;margin-top:6px;padding:2px 8px;border-radius:999px;background:#EFF6FF;color:#1D4ED8;font-size:10.5px;font-weight:600">CLIENT ACCOUNT</span>`
          }
        </div>
        <button id="jl-view-inquiries-btn" type="button" style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-radius:10px;background:#F1F5F9;border:none;color:#0F172A;font-size:13px;font-weight:600;cursor:pointer;text-align:left;transition:all 0.15s ease">
          <span style="display:flex;align-items:center;gap:8px">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            ${isAdmin ? 'All Project Briefs' : 'My Project Briefs'}
          </span>
          <span id="jl-inquiries-count-badge" style="background:#0084FF;color:#fff;border-radius:999px;padding:1px 7px;font-size:11px;font-weight:700">${
            userInquiriesList.length
          }</span>
        </button>
        <button id="jl-signout-btn" type="button" style="display:flex;align-items:center;gap:8px;padding:10px 12px;border-radius:10px;background:transparent;border:none;color:#DC2626;font-size:13px;font-weight:600;cursor:pointer;text-align:left;transition:all 0.15s ease">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Sign Out
        </button>
      `;

      // Toggle dropdown
      userBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdown.style.display === 'flex';
        dropdown.style.display = isOpen ? 'none' : 'flex';
      });

      document.addEventListener('click', (e) => {
        if (!userWrap.contains(e.target as Node)) {
          dropdown.style.display = 'none';
        }
      });

      // Bind dropdown buttons
      const viewInquiriesBtn = dropdown.querySelector('#jl-view-inquiries-btn');
      if (viewInquiriesBtn) {
        viewInquiriesBtn.addEventListener('click', () => {
          dropdown.style.display = 'none';
          openInquiriesPortal();
        });
      }

      const signoutBtn = dropdown.querySelector('#jl-signout-btn');
      if (signoutBtn) {
        signoutBtn.addEventListener('click', async () => {
          try {
            await signOutUser();
            showToast('You have signed out.', 'info');
          } catch (err) {
            console.error(err);
            showToast('Sign out error', 'error');
          }
        });
      }

      userWrap.appendChild(userBtn);
      userWrap.appendChild(dropdown);
      slot.appendChild(userWrap);
    }
  });
}

/**
 * Real-time Firestore sync for submitted inquiries
 */
function syncInquiriesListener(user: User | null) {
  if (currentInquiriesUnsub) {
    currentInquiriesUnsub();
    currentInquiriesUnsub = null;
  }

  if (!user) {
    userInquiriesList = [];
    updateInquiryBadges();
    renderPortalContent();
    return;
  }

  const isAdmin = checkIsAdmin(user);

  if (isAdmin) {
    currentInquiriesUnsub = subscribeToAllInquiries((inquiries) => {
      userInquiriesList = inquiries;
      updateInquiryBadges();
      renderPortalContent();
    });
  } else {
    currentInquiriesUnsub = subscribeToUserInquiries(user.uid, (inquiries) => {
      userInquiriesList = inquiries;
      updateInquiryBadges();
      renderPortalContent();
    });
  }
}

function updateInquiryBadges() {
  const count = userInquiriesList.length;
  document.querySelectorAll('#jl-inquiries-count-badge').forEach((badge) => {
    badge.textContent = String(count);
  });
}

/**
 * Pre-fill contact inputs with authenticated user details
 */
function updateFormPrefill(user: User | null) {
  // Page contact form
  const pName = document.getElementById('p-name') as HTMLInputElement | null;
  const pEmail = document.getElementById('p-email') as HTMLInputElement | null;
  const pageForm = document.getElementById('jl-page-contact-form');

  // Modal contact form
  const fName = document.getElementById('f-name') as HTMLInputElement | null;
  const fEmail = document.getElementById('f-email') as HTMLInputElement | null;
  const modalForm = document.getElementById('jl-inquiry-form');

  if (user) {
    if (pName && !pName.value) pName.value = user.displayName || '';
    if (pEmail && !pEmail.value) pEmail.value = user.email || '';
    if (fName && !fName.value) fName.value = user.displayName || '';
    if (fEmail && !fEmail.value) fEmail.value = user.email || '';

    // Inject "Saved to account" badge in forms
    injectAccountBadge(pageForm, user);
    injectAccountBadge(modalForm, user);
  } else {
    removeAccountBadge(pageForm);
    removeAccountBadge(modalForm);
  }
}

function injectAccountBadge(form: HTMLElement | null, user: User) {
  if (!form) return;
  let badge = form.querySelector('.jl-form-auth-banner') as HTMLElement | null;
  if (!badge) {
    badge = document.createElement('div');
    badge.className = 'jl-form-auth-banner';
    badge.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 14px;
      border-radius: 12px;
      background: linear-gradient(135deg, rgba(239, 246, 255, 0.9) 0%, rgba(240, 253, 250, 0.8) 100%);
      border: 1px solid rgba(186, 230, 253, 0.9);
      margin-bottom: 14px;
      font-size: 13px;
      color: #0369A1;
    `;
    form.insertBefore(badge, form.firstChild);
  }

  badge.innerHTML = `
    <div style="display:flex;align-items:center;gap:8px">
      <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#10B981"></span>
      <span>Authenticated as <strong>${user.displayName || user.email}</strong> (Firestore Protected)</span>
    </div>
    <span style="font-size:11.5px;background:#0284C7;color:#fff;padding:2px 8px;border-radius:999px;font-weight:600">Tracked in Portal</span>
  `;
}

function removeAccountBadge(form: HTMLElement | null) {
  if (!form) return;
  const badge = form.querySelector('.jl-form-auth-banner');
  if (badge) badge.remove();
}

/**
 * Handle Firestore persistence on both project intake forms
 */
function setupFormPersistence() {
  // 1. Page brief form
  const pageForm = document.getElementById('jl-page-contact-form') as HTMLFormElement | null;
  if (pageForm) {
    pageForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await handleFormSubmission(pageForm, 'page');
    });
  }

  // 2. Modal inquiry form
  const modalForm = document.getElementById('jl-inquiry-form') as HTMLFormElement | null;
  if (modalForm) {
    modalForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await handleFormSubmission(modalForm, 'modal');
    });
  }
}

async function handleFormSubmission(form: HTMLFormElement, formType: 'page' | 'modal') {
  const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement | null;
  const originalText = submitBtn ? submitBtn.textContent : 'Submit';

  // If not signed in, prompt Google Sign-In first
  if (!currentUser) {
    try {
      showToast('Please sign in with Google so your brief is saved to your account.', 'info');
      await signInWithGoogle();
    } catch (err) {
      showToast('Sign in cancelled. Submission stopped.', 'error');
      return;
    }
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Saving to Firestore database...';
  }

  try {
    let name = '';
    let email = '';
    let company = '';
    let phone = '';
    let service = '';
    let budget = '';
    let timeline = '';
    let details = '';

    if (formType === 'page') {
      name = (document.getElementById('p-name') as HTMLInputElement)?.value || '';
      email = (document.getElementById('p-email') as HTMLInputElement)?.value || '';
      company = (document.getElementById('p-company') as HTMLInputElement)?.value || '';
      phone = (document.getElementById('p-phone') as HTMLInputElement)?.value || '';
      service = (document.getElementById('p-service-hidden') as HTMLInputElement)?.value || 'Digital Marketing';
      budget = (document.getElementById('p-budget') as HTMLSelectElement)?.value || '$5,000 - $15,000';
      timeline = (document.getElementById('p-timeline') as HTMLSelectElement)?.value || 'Standard (1 month)';
      details = (document.getElementById('p-details') as HTMLTextAreaElement)?.value || '';
    } else {
      name = (document.getElementById('f-name') as HTMLInputElement)?.value || '';
      email = (document.getElementById('f-email') as HTMLInputElement)?.value || '';
      company = (document.getElementById('f-company') as HTMLInputElement)?.value || '';
      phone = (document.getElementById('f-phone') as HTMLInputElement)?.value || '';
      service = (document.getElementById('f-service-hidden') as HTMLInputElement)?.value || 'Digital Marketing';
      budget = (document.getElementById('f-budget') as HTMLSelectElement)?.value || '$5,000 - $15,000';
      timeline = (document.getElementById('f-timeline') as HTMLSelectElement)?.value || 'Standard (1 month)';
      details = (document.getElementById('f-details') as HTMLTextAreaElement)?.value || '';
    }

    const inquiryId = await createProjectInquiry({
      userName: name || currentUser?.displayName || 'Client',
      userEmail: email || currentUser?.email || '',
      company,
      phone,
      service,
      budget,
      timeline,
      details,
      status: 'submitted',
    });

    // Also persist to Cloud SQL PostgreSQL database via backend API
    try {
      const token = await currentUser?.getIdToken();
      if (token) {
        await fetch('/api/inquiries', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            inquiryId,
            userName: name || currentUser?.displayName || 'Client',
            userEmail: email || currentUser?.email || '',
            company,
            phone,
            service,
            budget,
            timeline,
            details,
          }),
        });
      }
    } catch (sqlErr) {
      console.warn('Cloud SQL sync note:', sqlErr);
    }

    showToast('🚀 Project brief saved to database! You can track it in your portal.', 'success');

    // Show form success box
    if (formType === 'page') {
      const pageSuccess = document.getElementById('p-success-box');
      if (pageSuccess) pageSuccess.style.display = 'block';
    } else {
      const modalSuccess = document.getElementById('f-success-box');
      if (modalSuccess) modalSuccess.style.display = 'block';
    }

    form.reset();
    updateFormPrefill(currentUser);
  } catch (err: any) {
    console.error('Submission failed:', err);
    showToast('Failed to save project brief to Firestore. Please try again.', 'error');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  }
}

/**
 * Setup "Client Inquiries & Project Tracker" Portal Modal
 */
function setupInquiriesPortalUI() {
  if (document.getElementById('jl-inquiries-portal')) return;

  const portal = document.createElement('div');
  portal.id = 'jl-inquiries-portal';
  portal.style.cssText = `
    display: none;
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(4, 7, 17, 0.85);
    backdrop-filter: blur(14px);
    align-items: center;
    justify-content: center;
    padding: 20px;
    opacity: 0;
    transition: opacity 0.25s ease;
  `;

  portal.innerHTML = `
    <div class="jl-portal-box" style="
      background: linear-gradient(145deg, #0B1528 0%, #060B18 100%);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-top: 1.5px solid rgba(0, 132, 255, 0.6);
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 132, 255, 0.15);
      border-radius: 24px;
      width: 100%;
      max-width: 780px;
      max-height: 85vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      color: #E2E8F0;
    ">
      <!-- Header -->
      <div style="
        padding: 20px 24px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.10);
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: rgba(255, 255, 255, 0.02);
      ">
        <div>
          <div style="display:flex;align-items:center;gap:10px">
            <h3 id="jl-portal-title" style="margin:0;font-size:20px;font-weight:700;color:#FFFFFF">Project Briefs & Inquiries</h3>
            <span id="jl-portal-role-tag" style="background:rgba(0,132,255,0.2);color:#38BDF8;font-size:11px;font-weight:700;padding:2px 8px;border-radius:999px;border:1px solid rgba(56,189,248,0.4)">Firestore Synced</span>
          </div>
          <p id="jl-portal-desc" style="margin:4px 0 0 0;font-size:13px;color:#94A3B8">Live status tracking for your project submissions with JL Technologies.</p>
        </div>
        <button id="jl-portal-close-btn" type="button" style="
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.08);
          color: #E2E8F0;
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        ">✕</button>
      </div>

      <!-- Inquiries Content List -->
      <div id="jl-portal-list" style="
        flex: 1;
        overflow-y: auto;
        padding: 20px 24px;
        display: flex;
        flex-direction: column;
        gap: 14px;
      ">
        <!-- Dynamic list will be rendered here -->
      </div>

      <!-- Footer -->
      <div style="
        padding: 16px 24px;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 13px;
        color: #94A3B8;
      ">
        <span>Owner Direct WhatsApp: <a href="https://wa.me/2349157881683" target="_blank" style="color:#38BDF8;text-decoration:none;font-weight:600">09157881683</a></span>
        <button id="jl-portal-new-brief-btn" type="button" style="
          padding: 8px 16px;
          border-radius: 999px;
          background: #0084FF;
          color: #fff;
          border: none;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
        ">+ New Project Brief</button>
      </div>
    </div>
  `;

  document.body.appendChild(portal);

  // Close bindings
  const closeBtn = portal.querySelector('#jl-portal-close-btn');
  if (closeBtn) closeBtn.addEventListener('click', closeInquiriesPortal);

  portal.addEventListener('click', (e) => {
    if (e.target === portal) closeInquiriesPortal();
  });

  const newBriefBtn = portal.querySelector('#jl-portal-new-brief-btn');
  if (newBriefBtn) {
    newBriefBtn.addEventListener('click', () => {
      closeInquiriesPortal();
      const contactSection = document.getElementById('contact');
      if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

function openInquiriesPortal() {
  const portal = document.getElementById('jl-inquiries-portal');
  if (!portal) return;

  renderPortalContent();
  portal.style.display = 'flex';
  requestAnimationFrame(() => {
    portal.style.opacity = '1';
  });
}

function closeInquiriesPortal() {
  const portal = document.getElementById('jl-inquiries-portal');
  if (!portal) return;
  portal.style.opacity = '0';
  setTimeout(() => {
    portal.style.display = 'none';
  }, 250);
}

/**
 * Render items in the inquiries portal
 */
function renderPortalContent() {
  const listContainer = document.getElementById('jl-portal-list');
  if (!listContainer) return;

  const isAdmin = checkIsAdmin(currentUser);

  // Update header text based on role
  const title = document.getElementById('jl-portal-title');
  const roleTag = document.getElementById('jl-portal-role-tag');
  const desc = document.getElementById('jl-portal-desc');

  if (title) title.textContent = isAdmin ? 'Admin Console: All Client Inquiries' : 'My Project Briefs & Inquiries';
  if (roleTag) roleTag.textContent = isAdmin ? 'Super Admin Mode' : 'Firestore Synced';
  if (desc) {
    desc.textContent = isAdmin
      ? 'Review all client project proposals and update workflow progress in real-time.'
      : 'Track the delivery review and quotation progress for your project briefs.';
  }

  if (!currentUser) {
    listContainer.innerHTML = `
      <div style="text-align:center;padding:40px 20px;color:#94A3B8">
        <div style="font-size:36px;margin-bottom:12px">🔒</div>
        <h4 style="color:#FFF;margin-bottom:8px">Please sign in to view your inquiries</h4>
        <p style="font-size:13.5px;max-width:360px;margin:0 auto 20px auto">Sign in with your Google account to securely view and track your submitted project briefs in Firestore.</p>
        <button id="jl-portal-signin-cta" type="button" style="padding:10px 22px;border-radius:999px;background:#0084FF;color:#fff;border:none;font-weight:600;cursor:pointer">Sign in with Google</button>
      </div>
    `;
    const signinCta = listContainer.querySelector('#jl-portal-signin-cta');
    if (signinCta) {
      signinCta.addEventListener('click', async () => {
        await signInWithGoogle();
      });
    }
    return;
  }

  if (userInquiriesList.length === 0) {
    listContainer.innerHTML = `
      <div style="text-align:center;padding:48px 20px;color:#94A3B8">
        <div style="font-size:36px;margin-bottom:12px">📋</div>
        <h4 style="color:#FFF;margin-bottom:8px">No Project Briefs Submitted Yet</h4>
        <p style="font-size:13.5px;max-width:380px;margin:0 auto 20px auto">When you submit an intake brief on the website or via our modal, it will appear here in real-time with status updates.</p>
        <button id="jl-portal-empty-cta" type="button" style="padding:10px 22px;border-radius:999px;background:#0084FF;color:#fff;border:none;font-weight:600;cursor:pointer">Submit a Project Brief →</button>
      </div>
    `;
    const emptyCta = listContainer.querySelector('#jl-portal-empty-cta');
    if (emptyCta) {
      emptyCta.addEventListener('click', () => {
        closeInquiriesPortal();
        const contactSec = document.getElementById('contact');
        if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
      });
    }
    return;
  }

  listContainer.innerHTML = '';

  userInquiriesList.forEach((inquiry) => {
    const card = document.createElement('div');
    card.style.cssText = `
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.10);
      border-radius: 16px;
      padding: 18px 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      transition: all 0.2s ease;
    `;

    // Status styling
    let statusBg = 'rgba(16, 185, 129, 0.15)';
    let statusColor = '#34D399';
    let statusText = 'Submitted • Received';

    if (inquiry.status === 'under_review') {
      statusBg = 'rgba(245, 158, 11, 0.18)';
      statusColor = '#FBBF24';
      statusText = 'Under Review by JL Strategy Team';
    } else if (inquiry.status === 'contacted') {
      statusBg = 'rgba(56, 189, 248, 0.18)';
      statusColor = '#38BDF8';
      statusText = 'Proposal Ready • Contacted';
    }

    const dateFormatted = inquiry.createdAt
      ? new Date(inquiry.createdAt).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : 'Recent';

    card.innerHTML = `
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px">
        <div>
          <div style="display:flex;align-items:center;gap:8px">
            <h4 style="margin:0;font-size:16px;font-weight:700;color:#F8FAFC">${inquiry.service}</h4>
            <span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:999px;background:${statusBg};color:${statusColor}">
              ${statusText}
            </span>
          </div>
          <div style="font-size:12px;color:#94A3B8;margin-top:4px">
            Submitted by <strong>${inquiry.userName}</strong> (${inquiry.userEmail}) • ${dateFormatted}
          </div>
        </div>
        ${
          !isAdmin && inquiry.status === 'submitted'
            ? `<button class="jl-delete-inq-btn" data-id="${inquiry.id}" title="Withdraw Brief" style="background:transparent;border:none;color:#EF4444;font-size:12px;cursor:pointer;padding:4px">Delete</button>`
            : ''
        }
      </div>

      <!-- Key metadata tags -->
      <div style="display:flex;flex-wrap:wrap;gap:8px;font-size:12px">
        ${
          inquiry.company
            ? `<span style="background:rgba(255,255,255,0.06);padding:3px 10px;border-radius:6px;color:#CBD5E1">🏢 ${inquiry.company}</span>`
            : ''
        }
        ${
          inquiry.budget
            ? `<span style="background:rgba(255,255,255,0.06);padding:3px 10px;border-radius:6px;color:#CBD5E1">💰 ${inquiry.budget}</span>`
            : ''
        }
        ${
          inquiry.timeline
            ? `<span style="background:rgba(255,255,255,0.06);padding:3px 10px;border-radius:6px;color:#CBD5E1">⏱️ ${inquiry.timeline}</span>`
            : ''
        }
        ${
          inquiry.phone
            ? `<span style="background:rgba(255,255,255,0.06);padding:3px 10px;border-radius:6px;color:#CBD5E1">📱 ${inquiry.phone}</span>`
            : ''
        }
      </div>

      <!-- Details -->
      ${
        inquiry.details
          ? `<div style="font-size:13px;line-height:1.5;color:#E2E8F0;background:rgba(0,0,0,0.25);padding:10px 12px;border-radius:8px">
              ${escapeHtml(inquiry.details)}
            </div>`
          : ''
      }

      <!-- Admin Status Controls -->
      ${
        isAdmin
          ? `
          <div style="display:flex;align-items:center;gap:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.06)">
            <span style="font-size:12px;color:#94A3B8;font-weight:600">Update Status:</span>
            <button class="jl-admin-status-btn" data-id="${inquiry.id}" data-status="submitted" style="padding:4px 10px;border-radius:6px;font-size:11.5px;font-weight:600;cursor:pointer;background:${
              inquiry.status === 'submitted' ? '#10B981' : 'rgba(255,255,255,0.1)'
            };color:#fff;border:none">Submitted</button>
            <button class="jl-admin-status-btn" data-id="${inquiry.id}" data-status="under_review" style="padding:4px 10px;border-radius:6px;font-size:11.5px;font-weight:600;cursor:pointer;background:${
              inquiry.status === 'under_review' ? '#F59E0B' : 'rgba(255,255,255,0.1)'
            };color:#fff;border:none">Under Review</button>
            <button class="jl-admin-status-btn" data-id="${inquiry.id}" data-status="contacted" style="padding:4px 10px;border-radius:6px;font-size:11.5px;font-weight:600;cursor:pointer;background:${
              inquiry.status === 'contacted' ? '#0284C7' : 'rgba(255,255,255,0.1)'
            };color:#fff;border:none">Contacted</button>
            <button class="jl-admin-delete-btn" data-id="${inquiry.id}" style="margin-left:auto;padding:4px 10px;border-radius:6px;font-size:11.5px;font-weight:600;cursor:pointer;background:rgba(239,68,68,0.2);color:#EF4444;border:1px solid rgba(239,68,68,0.3)">Delete</button>
          </div>
        `
          : ''
      }
    `;

    // Bind delete button
    const deleteBtn = card.querySelector('.jl-delete-inq-btn');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', async () => {
        if (confirm('Withdraw this project brief?')) {
          try {
            await deleteInquiry(inquiry.id);
            showToast('Brief removed.', 'info');
          } catch (e) {
            showToast('Could not delete brief.', 'error');
          }
        }
      });
    }

    // Bind admin actions
    if (isAdmin) {
      card.querySelectorAll('.jl-admin-status-btn').forEach((btn) => {
        btn.addEventListener('click', async () => {
          const targetStatus = btn.getAttribute('data-status') as any;
          try {
            await updateInquiryStatus(inquiry.id, targetStatus);
            showToast(`Status updated to: ${targetStatus}`, 'success');
          } catch (e) {
            showToast('Failed to update status', 'error');
          }
        });
      });

      const adminDeleteBtn = card.querySelector('.jl-admin-delete-btn');
      if (adminDeleteBtn) {
        adminDeleteBtn.addEventListener('click', async () => {
          if (confirm('Admin: permanently delete this inquiry document?')) {
            try {
              await deleteInquiry(inquiry.id);
              showToast('Document deleted.', 'info');
            } catch (e) {
              showToast('Error deleting document.', 'error');
            }
          }
        });
      }
    }

    listContainer.appendChild(card);
  });
}

function escapeHtml(str: string): string {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

// Expose openInquiriesPortal globally
(window as any).openJLInquiriesPortal = openInquiriesPortal;
