# Security Specification & Threat Model

## 1. Data Invariants
1. **User Identity Invariant**: A user profile at `/users/{userId}` can only be created or modified by the authenticated user whose `request.auth.uid == userId`. Users cannot impersonate other accounts or modify system records.
2. **PII Isolation Invariant**: User profiles contain email and personal identifiers and are strictly accessible only by the owning user (`isOwner(userId)`) or verified administrators (`isAdmin()`). Blanket public reads or unauthenticated access are denied.
3. **Inquiry Ownership Invariant**: A project inquiry at `/inquiries/{inquiryId}` must have its `userId` field match `request.auth.uid`. Unauthenticated users or users attempting to claim another UID cannot create or update inquiries.
4. **Temporal Invariant**: Creation and update timestamps (`createdAt`, `updatedAt`) must strictly reflect server timestamps (`request.time`) to avoid tampering.
5. **Terminal State Invariant**: When an inquiry status transitions or is updated, client users can only submit inquiries; status transitions to `'contacted'` or `'under_review'` are restricted to authorized administrators.
6. **Query Invariant**: Users may only query/list their own inquiries (`resource.data.userId == request.auth.uid`). Inquiries cannot be scraped by other users.
7. **Admins Invariant**: Admin privileges are grounded in `/admins/{adminId}` and verified via document lookup. Unauthenticated or non-admin users cannot read or write the `/admins` collection.

---

## 2. The "Dirty Dozen" Payloads (Designed to Fail)

### Payload 1: Unauthenticated Profile Creation
Attempt to create a user profile without an active Firebase Auth session.
```json
{
  "path": "/users/victim_123",
  "auth": null,
  "data": { "id": "victim_123", "email": "victim@example.com", "displayName": "Attacker" }
}
```
**Expected Result**: `PERMISSION_DENIED`

### Payload 2: Cross-User Profile Hijacking
Authenticated user `attacker_99` attempts to write to `/users/victim_123`.
```json
{
  "path": "/users/victim_123",
  "auth": { "uid": "attacker_99", "token": { "email_verified": true } },
  "data": { "id": "victim_123", "email": "attacker@evil.com", "displayName": "Attacker" }
}
```
**Expected Result**: `PERMISSION_DENIED`

### Payload 3: Shadow Field Injection in User Profile
Authenticated user injects extra unauthorized fields (e.g. `role: 'superadmin'`) on profile create.
```json
{
  "path": "/users/user_abc",
  "auth": { "uid": "user_abc", "token": { "email_verified": true } },
  "data": { "id": "user_abc", "email": "user@example.com", "displayName": "User", "role": "superadmin" }
}
```
**Expected Result**: `PERMISSION_DENIED`

### Payload 4: PII Snoop (Blanket Read Attempt)
Authenticated user `user_xyz` attempts to read another user's profile document `/users/user_abc`.
```json
{
  "path": "/users/user_abc",
  "auth": { "uid": "user_xyz", "token": { "email_verified": true } },
  "operation": "get"
}
```
**Expected Result**: `PERMISSION_DENIED`

### Payload 5: Inquiry Identity Spoofing
User `user_1` attempts to create an inquiry document where `userId` is set to `user_2`.
```json
{
  "path": "/inquiries/inq_001",
  "auth": { "uid": "user_1", "token": { "email_verified": true } },
  "data": {
    "id": "inq_001",
    "userId": "user_2",
    "userName": "Spoofed",
    "userEmail": "user2@example.com",
    "service": "Digital Marketing",
    "status": "submitted"
  }
}
```
**Expected Result**: `PERMISSION_DENIED`

### Payload 6: Oversized Payload Attack (Denial of Wallet)
User sends a 2MB string inside the `details` field of an inquiry.
```json
{
  "path": "/inquiries/inq_002",
  "auth": { "uid": "user_1", "token": { "email_verified": true } },
  "data": {
    "id": "inq_002",
    "userId": "user_1",
    "userName": "Spam",
    "userEmail": "user1@example.com",
    "service": "Digital Marketing",
    "status": "submitted",
    "details": "A".repeat(50000)
  }
}
```
**Expected Result**: `PERMISSION_DENIED`

### Payload 7: Path Variable ID Poisoning
Document ID containing illegal URL characters, SQL fragments, or junk characters > 128 bytes.
```json
{
  "path": "/inquiries/inq/../../../etc/passwd",
  "auth": { "uid": "user_1", "token": { "email_verified": true } },
  "data": { "id": "inq", "userId": "user_1" }
}
```
**Expected Result**: `PERMISSION_DENIED`

### Payload 8: Self-Elevation to Admin
Non-admin authenticated user attempts to write their own UID document to `/admins/{uid}`.
```json
{
  "path": "/admins/user_1",
  "auth": { "uid": "user_1", "token": { "email_verified": true } },
  "data": { "id": "user_1", "email": "user1@example.com" }
}
```
**Expected Result**: `PERMISSION_DENIED`

### Payload 9: Client State Shortcut (Admin Status Escalation)
Standard client attempts to update an inquiry directly to `status: 'contacted'` without admin rights.
```json
{
  "path": "/inquiries/inq_001",
  "auth": { "uid": "user_1", "token": { "email_verified": true } },
  "data": { "status": "contacted" },
  "operation": "update"
}
```
**Expected Result**: `PERMISSION_DENIED`

### Payload 10: Global Wildcard Read Attempt
Client queries `/` with catch-all collection group or unbounded collection query.
```json
{
  "path": "/{document=**}",
  "auth": null,
  "operation": "list"
}
```
**Expected Result**: `PERMISSION_DENIED`

### Payload 11: Immutable Field Mutation
User attempts to modify `createdAt` or change the original `userId` on an existing inquiry.
```json
{
  "path": "/inquiries/inq_001",
  "auth": { "uid": "user_1", "token": { "email_verified": true } },
  "data": { "userId": "user_99" },
  "operation": "update"
}
```
**Expected Result**: `PERMISSION_DENIED`

### Payload 12: Insecure List Scrape Attempt
Authenticated user queries all inquiries across the entire platform without scoping `where('userId', '==', request.auth.uid)`.
```json
{
  "path": "/inquiries",
  "auth": { "uid": "user_1", "token": { "email_verified": true } },
  "operation": "list",
  "query": "select * from inquiries"
}
```
**Expected Result**: `PERMISSION_DENIED`
