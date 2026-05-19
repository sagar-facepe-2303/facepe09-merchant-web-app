# FacePe Merchant Web App — Backend API Specification

This document describes every HTTP endpoint the frontend currently expects, derived directly from the React components and mock JSON files in `src/data/`. Each section lists the method, path, query/body parameters, response schema, field types, and a sample payload.

- **Base URL (dev):** `/api` (proxy to backend)
- **Auth:** All endpoints under `/api/*` (except auth itself) require a valid session/JWT (Bearer token). To be confirmed by backend team.
- **Content-Type:** `application/json; charset=utf-8`
- **Common envelope:** Every response includes `status: "success" | "error"`. Error responses additionally include `message` (string) and optional `code` (string).

```jsonc
// Generic error response
{
  "status": "error",
  "code": "VALIDATION_ERROR",
  "message": "Human-readable description"
}
```

---

## Table of Contents

1. [Transactions](#1-transactions)
2. [Revenue Trend](#2-revenue-trend)
3. [Status Breakdown](#3-status-breakdown)
4. [Transaction Volume](#4-transaction-volume)
5. [Merchant Profile (Settings)](#5-merchant-profile-settings)
6. [Security (Settings)](#6-security-settings)
7. [Notification Preferences (Settings)](#7-notification-preferences-settings)
8. [Lookup / Filter Options](#8-lookup--filter-options-recommended)

---

## 1. Transactions

### 1.1 List Transactions

**Endpoint:** `GET /api/transactions`

Used by `TransactionsTable.jsx` to render the transaction list, filters, search and pagination.

**Query parameters** (all optional):

| Param       | Type    | Description                                                |
| ----------- | ------- | ---------------------------------------------------------- |
| `date`      | string  | ISO date (`YYYY-MM-DD`) — filter by transaction date       |
| `amount`    | string  | Substring search on amount (e.g. `30`)                     |
| `kiosk`     | string  | Exact match on kiosk code (e.g. `JGL124`)                  |
| `processor` | string  | Exact match: `PayPal` \| `Stripe` \| `Square` \| ...       |
| `status`    | string  | Exact match: `Successful` \| `Pending` \| `Failed`         |
| `page`      | integer | 1-indexed page number (default `1`)                        |
| `limit`     | integer | Page size (default `7`)                                    |

**Response 200:**

```json
{
  "status": "success",
  "total": 10,
  "page": 1,
  "limit": 7,
  "transactions": [
    {
      "id": "#13123AEW",
      "datetime": "14:32:15 • 25.03.2026",
      "amount": "$30.00",
      "kiosk": "JGL124",
      "processor": "PayPal",
      "status": "Successful",
      "processorId": "PLARZDE2349",
      "currency": "USD",
      "deviceId": "KSK-009",
      "faceId": "FS-88821",
      "email": "jack@gmail.com",
      "timeline": [
        { "status": "Created",   "time": "14:32:15" },
        { "status": "Processed", "time": "14:32:20" },
        { "status": "Completed", "time": "14:32:25" }
      ]
    }
  ]
}
```

**Field schema (`Transaction`):**

| Field         | Type                     | Required | Notes                                                            |
| ------------- | ------------------------ | -------- | ---------------------------------------------------------------- |
| `id`          | string                   | yes      | Display id, prefixed with `#`                                    |
| `datetime`    | string                   | yes      | Display format `HH:mm:ss • DD.MM.YYYY` (UI does substring filtering on this string). Backend may also return a parallel ISO `datetimeIso` if preferred. |
| `amount`      | string                   | yes      | Currency-formatted, e.g. `$30.00`                                |
| `kiosk`       | string                   | yes      |                                                                  |
| `processor`   | string                   | yes      | `PayPal` \| `Stripe` \| `Square` \| ...                          |
| `status`      | string (enum)            | yes      | `Successful` \| `Pending` \| `Failed`                            |
| `processorId` | string                   | yes      | Processor reference                                              |
| `currency`    | string (ISO 4217)        | yes      | e.g. `USD`                                                       |
| `deviceId`    | string                   | yes      |                                                                  |
| `faceId`      | string                   | yes      |                                                                  |
| `email`       | string (email)           | yes      |                                                                  |
| `timeline`    | array of `TimelineEvent` | yes      | Order-preserving list of status changes                          |

**`TimelineEvent`:**

| Field    | Type   | Required | Notes                              |
| -------- | ------ | -------- | ---------------------------------- |
| `status` | string | yes      | `Created` \| `Processed` \| `Completed` \| `Failed` |
| `time`   | string | yes      | `HH:mm:ss`                         |

### 1.2 Get Transaction Detail (recommended)

**Endpoint:** `GET /api/transactions/{id}`

Returns the same `Transaction` shape as above. Currently the frontend has the full object inline, but for scalability the drawer should refetch by id.

### 1.3 Export Transactions CSV

**Endpoint:** `GET /api/transactions/export?format=csv`

Triggered by the **Export CSV** button. Returns `text/csv` with a `Content-Disposition: attachment` header. Same query parameters as 1.1 are honored.

### 1.4 Sync Data

**Endpoint:** `POST /api/transactions/sync`

Triggered by the **Sync Data** button. Returns `{ "status": "success", "syncedCount": <int>, "lastSyncedAt": "<ISO 8601>" }`.

---

## 2. Revenue Trend

### 2.1 Get Revenue Time Series

**Endpoint:** `GET /api/revenue`

Used by `RevenueChart.jsx`.

**Query parameters:**

| Param    | Type   | Required | Allowed values            |
| -------- | ------ | -------- | ------------------------- |
| `period` | string | yes      | `week` \| `month` \| `year` |

**Response 200:**

```json
{
  "status": "success",
  "week": {
    "period": "week",
    "data": [
      { "name": "Mon", "value": 650 },
      { "name": "Tue", "value": 720 },
      { "name": "Wed", "value": 680 },
      { "name": "Thu", "value": 890 },
      { "name": "Fri", "value": 990 },
      { "name": "Sat", "value": 750 },
      { "name": "Sun", "value": 800 }
    ]
  },
  "month": {
    "period": "month",
    "data": [
      { "name": "Week 1", "value": 4200 },
      { "name": "Week 2", "value": 5100 },
      { "name": "Week 3", "value": 4800 },
      { "name": "Week 4", "value": 6300 }
    ]
  },
  "year": {
    "period": "year",
    "data": [
      { "name": "Jan", "value": 18500 },
      { "name": "Feb", "value": 21000 }
    ]
  }
}
```

**Notes:**
- Frontend currently consumes the full `{ week, month, year }` payload at once and switches client-side. Backend may return either the full structure **or** only the requested period (`{ status, period, data }`). Confirm with frontend before reducing.
- `name` is a display label (day, week-of-month, or month abbreviation).
- `value` is **integer revenue in dollars** (not cents).

| Field    | Type    | Required | Notes                                |
| -------- | ------- | -------- | ------------------------------------ |
| `period` | string  | yes      | One of `week`, `month`, `year`       |
| `data`   | array   | yes      | Array of `{ name: string, value: number }` |

---

## 3. Status Breakdown

**Endpoint:** `GET /api/status-breakdown?period={week|month|year}`

Used by `StatusBreakdownCard.jsx` (gauge) and `StatusDonut.jsx`.

**Response 200:**

```json
{
  "status": "success",
  "week": {
    "period": "week",
    "totals": { "success": 180, "pending": 10, "failed": 10 },
    "data": [
      { "name": "Success", "value": 180, "fill": "#A3D18B" },
      { "name": "Pending", "value": 10,  "fill": "#F59E0B" },
      { "name": "Failed",  "value": 10,  "fill": "#EF4444" }
    ]
  },
  "month": { /* same shape */ },
  "year":  { /* same shape */ }
}
```

| Field            | Type   | Required | Notes                                          |
| ---------------- | ------ | -------- | ---------------------------------------------- |
| `totals.success` | number | yes      | Count of successful transactions               |
| `totals.pending` | number | yes      | Count of pending transactions                  |
| `totals.failed`  | number | yes      | Count of failed transactions                   |
| `data[].name`    | string | yes      | `Success` \| `Pending` \| `Failed`             |
| `data[].value`   | number | yes      | Same as the matching `totals.*`                |
| `data[].fill`    | string | optional | Hex color; backend can omit and FE will inject |

> The `fill` colors are decorative. If the backend doesn't return them, the frontend already maps them by `name`.

---

## 4. Transaction Volume

**Endpoint:** `GET /api/volume?period={week|month|year}`

Used by `VolumeBarChart.jsx` (stacked bar chart of successful / pending / failed).

**Response 200:**

```json
{
  "status": "success",
  "week": {
    "period": "week",
    "max": 10000,
    "data": [
      { "name": "Mon", "successful": 3500, "pending": 2000, "failed": 1500 },
      { "name": "Tue", "successful": 4000, "pending": 2200, "failed": 1800 }
    ]
  },
  "month": { /* same shape, per-week buckets */ },
  "year":  { /* same shape, per-month buckets */ }
}
```

| Field          | Type   | Required | Notes                                     |
| -------------- | ------ | -------- | ----------------------------------------- |
| `period`       | string | yes      | `week` \| `month` \| `year`               |
| `max`          | number | yes      | Y-axis upper bound (used for chart scale) |
| `data[].name`  | string | yes      | Bucket label                              |
| `data[].successful` | number | yes | Count or amount (currently amount in $)     |
| `data[].pending`    | number | yes | Same unit as `successful`                   |
| `data[].failed`     | number | yes | Same unit as `successful`                   |

> **Unit decision needed:** confirm whether values represent transaction *counts* or *dollar amounts*. The mock data appears to be dollar amounts.

---

## 5. Merchant Profile (Settings)

### 5.1 Get Profile

**Endpoint:** `GET /api/merchant/profile`

Used by `MerchantProfileForm.jsx`.

**Response 200:**

```json
{
  "status": "success",
  "profile": {
    "avatarUrl": null,
    "businessName": "Walmart Inc.",
    "type": "Limited Liability Company (LLC)",
    "taxId": "4817XXX77",
    "website": "www.walmart.com",
    "email": "admin@walmart.com",
    "phone": "(+91) 98439 34402",
    "phoneCountry": "IN",
    "city": "Bentonville",
    "state": "Arkansas",
    "zip": "72716",
    "country": "United States"
  }
}
```

| Field          | Type        | Required | Notes                                            |
| -------------- | ----------- | -------- | ------------------------------------------------ |
| `avatarUrl`    | string\|null| yes      | Absolute URL or `null`                           |
| `businessName` | string      | yes      |                                                  |
| `type`         | string      | yes      | Business type label                              |
| `taxId`        | string      | yes      | Masked allowed (e.g. `4817XXX77`)                |
| `website`      | string      | optional |                                                  |
| `email`        | string      | yes      |                                                  |
| `phone`        | string      | yes      | Display format with country prefix               |
| `phoneCountry` | string      | yes      | ISO-2 country code (e.g. `IN`, `US`)             |
| `city`         | string      | yes      |                                                  |
| `state`        | string      | yes      |                                                  |
| `zip`          | string      | yes      |                                                  |
| `country`      | string      | yes      |                                                  |

### 5.2 Update Profile

**Endpoint:** `PUT /api/merchant/profile`

**Request body:** Same shape as `profile` above.

**Response 200:**
```json
{ "status": "success", "profile": { /* updated profile */ } }
```

### 5.3 Upload Avatar

**Endpoint:** `POST /api/merchant/profile/avatar`

- Body: `multipart/form-data` with field `file` (image)
- Response 200: `{ "status": "success", "avatarUrl": "https://cdn.example.com/...jpg" }`

---

## 6. Security (Settings)

### 6.1 Get Security State

**Endpoint:** `GET /api/security`

Used by `SecurityPanel.jsx`.

**Response 200:**

```json
{
  "status": "success",
  "twoFactor": {
    "enabled": true,
    "qrValue": "otpauth://totp/Facepe:admin@walmart.com?secret=JBSWY3DPEHPK3PXP&issuer=Facepe",
    "backupCodes": ["A1B2-C3D4", "A1B2-C3D4", "A1B2-C3D4", "A1B2-C3D4", "A1B2-C3D4", "A1B2-C3D4"]
  },
  "activeSessions": [
    {
      "id": "s1",
      "device": "Chrome • macOS 14",
      "lastActive": "Just now",
      "location": "Bangalore",
      "current": true
    }
  ]
}
```

| Field                  | Type    | Required | Notes                                              |
| ---------------------- | ------- | -------- | -------------------------------------------------- |
| `twoFactor.enabled`    | boolean | yes      |                                                    |
| `twoFactor.qrValue`    | string  | yes      | TOTP otpauth URI                                   |
| `twoFactor.backupCodes`| array of string | yes | 6 codes by default                            |
| `activeSessions[].id`  | string  | yes      | Session identifier (used for revoke)              |
| `activeSessions[].device` | string | yes    | `Browser • OS` formatted string                    |
| `activeSessions[].lastActive` | string | yes | Human-readable, e.g. `Just now`, `2 hours ago` |
| `activeSessions[].location`   | string | yes | City                                            |
| `activeSessions[].current`    | boolean | yes |                                                 |

### 6.2 Change Password

**Endpoint:** `POST /api/security/password`

**Request body:**
```json
{
  "currentPassword": "string",
  "newPassword": "string",
  "confirmPassword": "string"
}
```

**Response 200:** `{ "status": "success" }`

**Response 400:** `{ "status": "error", "code": "INVALID_PASSWORD", "message": "Current password is incorrect." }`

### 6.3 Toggle 2FA

**Endpoint:** `POST /api/security/2fa/enable`
**Endpoint:** `POST /api/security/2fa/disable`

Body: `{ "code": "123456" }` (TOTP confirmation)
Response: `{ "status": "success", "twoFactor": { /* updated */ } }`

### 6.4 Regenerate Backup Codes

**Endpoint:** `POST /api/security/2fa/backup-codes`
Response: `{ "status": "success", "backupCodes": ["...", ...] }`

### 6.5 Revoke Session

**Endpoint:** `DELETE /api/security/sessions/{id}`
Response: `{ "status": "success" }`

---

## 7. Notification Preferences (Settings)

### 7.1 Get Preferences

**Endpoint:** `GET /api/notifications`

Used by `NotificationPreferencesPanel.jsx`.

**Response 200:**

```json
{
  "status": "success",
  "settings": {
    "email": "admin@walmart.com",
    "phone": "+1(555)900-1000",
    "quietHoursStart": "10:00 AM",
    "quietHoursEnd": "10:00 AM"
  },
  "groups": [
    {
      "id": "transaction",
      "title": "Transaction Alerts",
      "events": [
        { "id": "txn-success",   "label": "Transaction Successful",          "email": false, "sms": true, "inApp": true },
        { "id": "txn-failed",    "label": "Transaction Failed",              "email": false, "sms": true, "inApp": true },
        { "id": "txn-high",      "label": "High-Value Transaction (>$500)",  "email": false, "sms": true, "inApp": true },
        { "id": "txn-cancelled", "label": "Transaction Cancelled",           "email": false, "sms": true, "inApp": true }
      ]
    },
    {
      "id": "system",
      "title": "System Alerts",
      "events": [ /* same shape */ ]
    },
    {
      "id": "reports",
      "title": "Reports",
      "events": [ /* same shape */ ]
    }
  ]
}
```

| Field                     | Type    | Required | Notes                            |
| ------------------------- | ------- | -------- | -------------------------------- |
| `settings.email`          | string  | yes      | Notification recipient email     |
| `settings.phone`          | string  | yes      | E.164 or display format          |
| `settings.quietHoursStart`| string  | yes      | `HH:mm AM/PM`                    |
| `settings.quietHoursEnd`  | string  | yes      | `HH:mm AM/PM`                    |
| `groups[].id`             | string  | yes      | `transaction` \| `system` \| `reports` |
| `groups[].title`          | string  | yes      | Section header                   |
| `groups[].events[].id`    | string  | yes      | Stable event id                  |
| `groups[].events[].label` | string  | yes      | Human label                      |
| `groups[].events[].email` | boolean | yes      | Channel toggle                   |
| `groups[].events[].sms`   | boolean | yes      | Channel toggle                   |
| `groups[].events[].inApp` | boolean | yes      | Channel toggle                   |

### 7.2 Update Preferences

**Endpoint:** `PUT /api/notifications`

**Request body:** Same shape as the `GET` response (without `status`). The backend should perform a full replace of preferences for the authenticated merchant.

**Response 200:** `{ "status": "success" }`

---

## 8. Lookup / Filter Options (recommended)

To populate the filter dropdowns in the Transactions table without hardcoding, expose:

- `GET /api/lookups/kiosks` → `{ "status": "success", "items": ["JGL124", "ABC456", ...] }`
- `GET /api/lookups/processors` → `{ "status": "success", "items": ["PayPal", "Stripe", "Square"] }`
- `GET /api/lookups/transaction-statuses` → `{ "status": "success", "items": ["Successful", "Pending", "Failed"] }`

---

## 9. Cross-cutting Conventions

### 9.1 Pagination

- Standard query params: `page` (1-indexed), `limit`.
- Response includes: `total`, `page`, `limit`. Frontend computes `totalPages = ceil(total / limit)`.

### 9.2 Errors

| HTTP | `code` (string)         | Meaning                                |
| ---- | ----------------------- | -------------------------------------- |
| 400  | `VALIDATION_ERROR`      | Request body/query invalid             |
| 401  | `UNAUTHORIZED`          | Missing/expired token                  |
| 403  | `FORBIDDEN`             | Authenticated but not allowed          |
| 404  | `NOT_FOUND`             | Resource missing                       |
| 409  | `CONFLICT`              | e.g. duplicate email                   |
| 422  | `INVALID_PASSWORD`, ... | Domain-specific validation             |
| 500  | `SERVER_ERROR`          | Unhandled                              |

### 9.3 Dates & Times

- Where possible, return ISO 8601 (`2026-03-25T14:32:15Z`) **alongside** any pre-formatted display strings the UI currently consumes. This will let the frontend gradually move off string parsing.

### 9.4 CORS

- Allow the merchant web origin (e.g. `https://merchant.facepe.com`) and dev origin (`http://localhost:5173`) with credentials.

---

## 10. Summary Table of Endpoints

| # | Method | Path                                  | Component(s)                              |
| - | ------ | ------------------------------------- | ----------------------------------------- |
| 1 | GET    | `/api/transactions`                   | `TransactionsTable`                       |
| 2 | GET    | `/api/transactions/{id}`              | `TransactionDrawer` (recommended)         |
| 3 | GET    | `/api/transactions/export`            | Export CSV button                         |
| 4 | POST   | `/api/transactions/sync`              | Sync Data button                          |
| 5 | GET    | `/api/revenue?period=`                | `RevenueChart`                            |
| 6 | GET    | `/api/status-breakdown?period=`       | `StatusBreakdownCard`, `StatusDonut`      |
| 7 | GET    | `/api/volume?period=`                 | `VolumeBarChart`                          |
| 8 | GET    | `/api/merchant/profile`               | `MerchantProfileForm`                     |
| 9 | PUT    | `/api/merchant/profile`               | `MerchantProfileForm` (save)              |
| 10| POST   | `/api/merchant/profile/avatar`        | `MerchantProfileForm` (upload)            |
| 11| GET    | `/api/security`                       | `SecurityPanel`                           |
| 12| POST   | `/api/security/password`              | `SecurityPanel` (change password)         |
| 13| POST   | `/api/security/2fa/enable`            | `SecurityPanel` (toggle 2FA)              |
| 14| POST   | `/api/security/2fa/disable`           | `SecurityPanel` (toggle 2FA)              |
| 15| POST   | `/api/security/2fa/backup-codes`      | `SecurityPanel` (regenerate)              |
| 16| DELETE | `/api/security/sessions/{id}`         | `SecurityPanel` (revoke)                  |
| 17| GET    | `/api/notifications`                  | `NotificationPreferencesPanel`            |
| 18| PUT    | `/api/notifications`                  | `NotificationPreferencesPanel` (save)     |
| 19| GET    | `/api/lookups/kiosks`                 | Transactions filter (recommended)         |
| 20| GET    | `/api/lookups/processors`             | Transactions filter (recommended)         |
| 21| GET    | `/api/lookups/transaction-statuses`   | Transactions filter (recommended)         |

---

## 11. Open Questions for Backend

1. Should auth be cookie-session or `Authorization: Bearer <jwt>`?
2. Is the `Transaction.amount` field a string (currency-formatted) on the wire or should the frontend do formatting from a numeric `amountCents`?
3. Is `volume.data[*].successful/pending/failed` a count or a monetary amount?
4. Should `revenue.data[*].value` ship in cents or dollars? Will it ever exceed `Number.MAX_SAFE_INTEGER`?
5. Is multi-tenant isolation handled implicitly by the auth token (recommended), or must the frontend pass a `merchantId`?
6. For paginated transaction filtering, is filtering performed server-side (preferred) or should the FE keep doing it client-side?
7. Should the backend return localized strings (`Successful`, `Pending`, ...) or stable enum codes (`SUCCESS`, `PENDING`) — the FE currently expects the former?
