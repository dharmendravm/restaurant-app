# TableOrbit – Restaurant Web App

## 1. Overview

TableOrbit is a full‑stack restaurant web app that provides:

- QR-based, table-linked guest experience
- User authentication (login, register)
- Protected customer pages (Home, Menu)
- Admin-only menu management UI
- Loyalty / membership oriented frontend UI
- Node.js + Express + MongoDB backend APIs

Project is split into two main folders:

- `server/` – Node.js + Express + MongoDB backend
- `client/` – React + Vite + Tailwind + Redux frontend

---

## 2. Tech Stack

### Backend (`server/`)

- Node.js, Express (`app.js`)
- MongoDB + Mongoose (`config/database.js`, `models/`)
- JWT auth (`jsonwebtoken`, `utils/jwt.js`)
- Role-based access control (`middlewares/checkRole.js`)
- Centralized error handling middleware
- QR code generation for tables (`qrcode`)

### Frontend (`client/`)

- React (via Vite)
- React Router (`react-router-dom`)
- Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
- Tailwind CSS
- Axios
- React Hook Form + Zod (potential for validation)
- Custom Toast system (`@/components/ui/toast`)

---

## 3. Folder Structure (High Level)

```text
Restaurant-app/
  client/
    src/
      app/
        App.jsx
        main.jsx
      pages/
        HomePage.jsx
        Menu.jsx
        Welcome.jsx
        auth/
          Login.jsx
          Register.jsx
        admin/
          AdminMenu.jsx
      routes/
        ProtectedRoutes.jsx
        AdminRoute.jsx
      redux/
        store.js
        authSlice.js
        guestSlice.js
      components/
        ui/...
        shared/...
      layout/
        AppLayout.jsx
        BrandLogo.jsx
      utils/
        axios.js
    vite.config.js
    tailwind.config.js
    package.json
  server/
    app.js
    config.js
    config/
      database.js
    controllers/
      auth.controller.js
      session.controller.js
      table.controller.js
      user.controller.js
    router/
      auth.route.js
      menu.route.js
      session.route.js
      table.route.js
      user.route.js
    models/
      user.js
      table.js
      session.js
    middlewares/
      verifyToken.js
      checkRole.js
      errormiddleware.js
    utils/
      jwt.js
    package.json
```

---

## 4. Environment & Configuration

### 4.1 Backend (`server/`) – `.env`

Create a `.env` file inside `server/` with at least:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/restaurant-app
JWT_SECRET=your-very-secure-secret
NODE_ENV=development
```

These are consumed from `config.js` and `config/database.js`.

### 4.2 Frontend (`client/`) – `.env`

Create a `.env` file inside `client/` with:

```env
VITE_API_URL=http://localhost:3000
```

This is used as the base URL for all API calls from the frontend.

---

## 5. Installation & Running

### 5.1 Install Dependencies

**Backend:**

```bash
cd server
npm install
```

**Frontend:**

```bash
cd client
npm install
```

### 5.2 Run in Development

**Backend (dev with nodemon):**

```bash
cd server
npm run server
```

**Backend (simple start):**

```bash
cd server
npm start
```

**Frontend (Vite dev server):**

```bash
cd client
npm run dev
```

Default Vite dev URL: `http://localhost:5173`

Ensure `VITE_API_URL` in the client matches your backend URL and port.

---

## 6. Backend Documentation (`server/`)

### 6.1 Entry Point – `app.js`

Key responsibilities:

- Set up Express app and JSON body parsing
- Configure CORS for:
  - `http://localhost:5173`
  - `http://localhost:5174`
  - `https://restaurant-app-gold-three.vercel.app`
- Connect to MongoDB via `ConnectDB()` (`config/database.js`)
- Base route: `GET /` → `"Server is Live"`
- Mount API routes:
  - `/api/v1/auth` → `authRoutes`
  - `/api/v1` → `sessionRoute`
  - `/api/v1` → `tableRoute`
  - `/api/v1` → `menuRoute`
  - `/api/v1` → `getTotalUsers` router
- Register `notFound` and `errorHandler` middlewares

### 6.2 Configuration & DB

**`config.js`**

- Reads environment variables (`PORT`, `MONGO_URI`, `JWT_SECRET`, `NODE_ENV`).

**`config/database.js`**

- Connects to MongoDB using `mongoose.connect(MONGO_URI)`.
- Logs success or error via `logDB` (from `globallogs.js`).

### 6.3 Models

#### 6.3.1 User – `models/user.js`

Main fields:

- `name`, `email`, `phone`, `password`
- `accountType` – `"REGISTERED" | "GUEST"` (default `"REGISTERED"`)
- `role` – `"customer" | "admin"` (default `"customer"`)
- `totolSpends`, `totalOrders`, `loyalPoints`
- `isActive`
- `referenceToken`, `referenceTokenExpiresTime`
- `lastLogin` – default `Date.now`

#### 6.3.2 Table – `models/table.js`

- `tableNumber` – Number, required, unique
- `qrSlug` – random hex slug for QR
- `qrCodeURL` – URL for scanning, e.g. `http://localhost:5173/welcome?qr=<slug>`
- `qrImage` – QR code as a Data URL string
- `capacity` – number of seats
- `isActive` – Boolean, default `true`

#### 6.3.3 Session – `models/session.js`

- `sessionToken` – String
- `deviceId` – String
- `userId` – ref to `User`
- `userAgent` – String
- `tableNumber` – Number
- `qrCodeUrl` – String
- `convertedSession` – Boolean
- `lastActivity` – Date

### 6.4 Auth Controllers & Routes

**Routes file:** `router/auth.route.js` (mounted at `/api/v1/auth`)

#### 6.4.1 `POST /api/v1/auth/register`

**Request body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9999999999",
  "password": "secret123"
}
```

**Flow:**

- Validate required fields.
- Check if user already exists by `email`.
- Hash password with `bcryptjs`.
- Create `User` document.

**Response (201):**

```json
{
  "success": true,
  "data": { "_id": "...", "name": "...", "email": "...", ... },
  "message": "Account created sucsessfully"
}
```

#### 6.4.2 `POST /api/v1/auth/login`

**Request body:**

```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

**Flow:**

- Find user by `email`.
- Compare passwords with `bcrypt.compare`.
- Generate:
  - `accessToken` – short-lived JWT (15m)
  - `refreshToken` – long-lived JWT (7d)
- Save refresh token, expiry and lastLogin on user.

**Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": { "_id": "...", "name": "...", "email": "...", "role": "customer" },
  "accessToken": "...",
  "refreshToken": "..."
}
```

### 6.5 JWT Utilities – `utils/jwt.js`

- `generateAccessToken(payload)` – signs token with `JWT_SECRET`, expires in 15 minutes.
- `generateRefreshToken(payload)` – signs token with `JWT_SECRET`, expires in 7 days.

### 6.6 Middlewares

#### 6.6.1 `verifyToken` – `middlewares/verifyToken.js`

- Reads `Authorization: Bearer <accessToken>` header.
- Verifies JWT using `JWT_SECRET`.
- Loads user from DB with `User.findById(decoded.id).select("-password -refreshToken")`.
- Attaches `req.user` and calls `next()`.
- Handles:
  - Missing token → `401` with `"Access denied. No token provided."`
  - Invalid token → `401` with `"Invalid token"`
  - Expired token → `401` with `"Token expired"`

Also defines a stub `verfiySessionToken` for future session-token-based flow.

#### 6.6.2 `checkRole` – `middlewares/checkRole.js`

Usage example:

```js
router.get(
  "/menu",
  verifyToken,
  checkRole(["customer", "admin"]),
  handler
);
```

- Accepts an array of allowed roles.
- If `req.user.role` is not in allowed list, returns `403 Access denied`.

#### 6.6.3 Error Handling – `middlewares/errormiddleware.js`

- `notFound` – for unmatched routes, creates an error with `404` status.
- `errorHandler` – logs details and returns JSON payload:
  - `success: false`
  - `message: <error message>`
  - In non-production, also returns `stack`, `path`, `method`.

### 6.7 Business Controllers & Routes

#### 6.7.1 Session – Guest / Table Session

**Route file:** `router/session.route.js` (mounted at `/api/v1`)

- `POST /api/v1/session`

**Controller:** `controllers/session.controller.js`

**Request body:**

```json
{
  "deviceId": "some-device-id",
  "qrSlug": "abc123"
}
```

**Flow:**

- Finds `Table` by `qrSlug`.
- Generates a random 32-byte hex `sessionToken`.
- Sets `expiresAt` to 24 hours ahead.
- Creates `Session` record with `deviceId`, `tableNumber`, `sessionToken`, `expiresAt`.

**Current response:**

```json
{
  "success": true
}
```

_Note: Frontend `guestSlice` currently expects `data.sessionToken` in the response, so this may need alignment if you want to persist the token client-side._

#### 6.7.2 Tables – `router/table.route.js`

- `POST /api/v1/tabels`  (note: route name has a small typo)

**Controller:** `controllers/table.controller.js`

- `registerTable`:
  - Body: `{ tableNumber, capacity }`
  - Generates `qrSlug` (random hex string).
  - Builds `qrCodeURL` as `http://localhost:5173/welcome?qr=<qrSlug>`.
  - Uses `qrcode` to build a QR Data URL (`qrImage`).
  - Saves a `Table` document.
  - Responds with `201` and `{ success: true, data: table }`.

- `getTableBySlug` (implemented but not yet wired to a route):
  - Intended to fetch table by `qrSlug` (e.g. `/tables/:slug`).
  - Returns table data if `qrSlug` exists and `isActive: true`.

#### 6.7.3 Menu – `router/menu.route.js`

- `GET /api/v1/menu`
  - Middlewares:
    - `verifyToken`
    - `checkRole(["customer", "admin"])`
  - Currently returns plain text: `"hello from verifyToken/menu"`.

#### 6.7.4 Users (Admin) – `router/user.route.js`

- `POST /api/v1/admin/all`
  - Middlewares:
    - `verifyToken`
    - `checkRole(["admin"])`
  - Controller: `getTotalUsers`

**Controller file:** `controllers/user.controller.js`

- `getTotalUsers`:
  - Finds all users, excluding password.
  - Returns:

    ```json
    {
      "success": true,
      "totalUsers": <number>,
      "users": [ ... ]
    }
    ```

- `getUserByToken`:
  - Intended to fetch profile from `req.user.id` (needs minor fixes – currently missing `await`).

- `updateUser`:
  - Updates `name`, `email`, `role` based on `req.params.id`.

- `deactivateUser`:
  - Sets `isActive: false` for the given user.

- `deleteUser`:
  - Permanently deletes a user by ID.

---

## 7. Frontend Documentation (`client/`)

### 7.1 Entry & Providers

**`src/main.jsx`**

- Simply imports `./app/main.jsx`.

**`src/app/main.jsx`**

- Creates React root and wraps the app in:
  - `StrictMode`
  - Redux `Provider` (store from `../redux/store.js`)
  - `ToastProvider` (for global toasts)

### 7.2 Routing – `src/app/App.jsx`

Uses `BrowserRouter`, `Routes`, `Route` to define routes.

#### Public Routes

- `/welcome` → `Welcome`
- `/login` → `Login`
- `/register` → `Register`

#### Protected Customer Routes

Wrapped with `<ProtectedRoutes>` and `<AppLayout>`:

- `/` → Home dashboard
  - Layout: `AppLayout`
  - Page: `HomePage`

- `/menu` → Menu listing
  - Layout: `AppLayout`
  - Page: `Menu`

#### Admin Route

Wrapped with `<AdminRoute>` and `<AppLayout>`:

- `/admin/menu` → Admin menu management
  - Layout: `AppLayout`
  - Page: `AdminMenu`

### 7.3 Route Guards

**`ProtectedRoutes.jsx`**

- Checks `localStorage.getItem("accessToken")`.
- If no token → `<Navigate to="/login" />`.

**`AdminRoute.jsx`**

- Reads `role` from Redux state (`state.auth`).
- Also checks `accessToken` in `localStorage`.
- If not logged in → redirect to `/login`.
- If `role !== "admin"` → redirect to `/`.

### 7.4 Redux Store & Slices

**Store – `src/redux/store.js`**

- Combines:
  - `auth` → `authSlice`
  - `guest` → `guestSlice`

#### 7.4.1 Auth Slice – `authSlice.js`

- `API_URL = import.meta.env.VITE_API_URL`.

**Thunks:**

- `login` (`"/auth/login"`):
  - Sends `POST ${API_URL}/api/v1/auth/login` with `{ email, password }`.
  - On success:
    - Sets `name`, `email`, `role`, `accessToken`, `refreshToken` in state.
    - Stores `accessToken` and `refreshToken` in `localStorage`.

- `register` (`"/auth/register"`):
  - Sends `POST ${API_URL}/api/v1/auth/register` with `{ name, email, phone, password }`.
  - On success, also attempts to store tokens from response (backend may need to be updated if you want to return tokens here).

State shape:

- `loading`, `error`
- `name`, `email`, `role`
- `accessToken`, `refreshToken`

#### 7.4.2 Guest Slice – `guestSlice.js`

- `API_URL = import.meta.env.VITE_API_URL`.

**Thunk:** `session`

- Sends `POST ${API_URL}/api/v1/session` with `{ deviceId, qrSlug }`.
- Reducer currently expects `action.payload.data.sessionToken` and stores it in:
  - `state.sessionToken`
  - `localStorage["sessionToken"]`

_Current backend response does not yet send `sessionToken` in `data`, so you can adjust backend or this slice._

### 7.5 Main Pages

#### 7.5.1 Home – `HomePage.jsx`

- On mount, makes a GET request to `/api/v1/menu` with `Authorization: Bearer <accessToken>`.
- Displays:
  - Hero section with CTA buttons (Order Now, View Menu).
  - "Signature Dishes" grid using `MenuCard` components (currently static data array).

#### 7.5.2 Menu – `Menu.jsx`

- Uses a static `initialItems` array of dishes.
- Renders a responsive grid of `MenuCard` components.
- Designed so that later it can be wired with a real menu API.

#### 7.5.3 Welcome – `Welcome.jsx`

- Entry screen for users arriving via QR or direct link.
- Shows:
  - Brand logo via `BrandLogo`.
  - "Welcome Bonus" card.
  - Buttons:
    - `Log In` → `/login`
    - `Continue as Guest` – currently placeholder `to="#"` (future: trigger `guestSlice.session`).
    - `Register Now` → `/register`.
  - Right side: cards describing product features (table-linked experience, ingredient transparency, silent service, dynamic rewards, live kitchen heat map).

#### 7.5.4 Login – `Login.jsx`

- Fields:
  - `email`
  - `password`
- Uses Redux `dispatch(login(formData))` + `.unwrap()`.
- On success:
  - Shows toast `"Welcome back"`.
  - `navigate("/")`.
- On error:
  - Shows toast with error message.
- Shows inline error box if `state.auth.error` is set.
- Includes placeholders for Google login and loyalty information on the side.

#### 7.5.5 Register – `Register.jsx`

- Fields:
  - `name`, `email`, `phone`, `password`, `confirmPassword`.
- Calls `dispatch(register(formData)).unwrap()` on submit.
- On success:
  - Toast: `"Account created"`.
  - Redirect: `/`.
- Shows terms checkbox and right-side loyalty/membership details.

#### 7.5.6 Admin Menu – `AdminMenu.jsx`

- Admin-only interface for managing menu items (currently in local state only).

Main features:

- **List of items** (initial items + newly added ones).
- **Add new dish** form with fields:
  - `title`, `subtitle`, `price`, `category`, `image`.
- **Actions:**
  - Add item – prepends item to the list and fires a success toast.
  - Remove item – removes from the list and fires an info toast.

Later, this can be wired to real Node/Express menu APIs instead of local state.

### 7.6 Styling & UI Components

- Tailwind CSS is configured in `tailwind.config.js` with content paths:
  - `./index.html`
  - `./src/**/*.{js,ts,jsx,tsx}`
- Common UI components:
  - `components/ui/MenuCard.jsx` – reusable menu card.
  - `components/ui/Button.jsx`, `InputFild.jsx`, `MemberShipCard.jsx`, `TierCard.jsx`, `GoogleUI.jsx`, `toast.jsx`.
  - `layout/AppLayout.jsx`, `layout/Navbar.jsx`, `layout/BrandLogo.jsx`.

**Axios Utility – `src/utils/axios.js`**

- Contains commented-out code for a shared Axios instance with request interceptor to attach token from `localStorage`.
- You can enable and use this to centralize auth headers.

---

## 8. Application Flows

### 8.1 Registered User Flow

1. User lands on `/welcome` (direct or via QR redirection).
2. Navigates to `/login` or `/register`.
3. On successful login/register:
   - Redux auth state updated.
   - `accessToken` and `refreshToken` saved in `localStorage`.
4. Protected routes:
   - `/` – home dashboard with hero + featured menu.
   - `/menu` – main menu listing.
5. APIs used:
   - `POST /api/v1/auth/login`
   - `POST /api/v1/auth/register`
   - `GET /api/v1/menu` (requires Bearer token).

### 8.2 Admin Flow

1. Admin logs in using `/login` (with a user who has `role: "admin"`).
2. Navigates to `/admin/menu`.
3. `AdminRoute` guard ensures:
   - Authenticated.
   - `role === "admin"`.
4. Manages menu items in the Admin UI (currently stored only in local state).

### 8.3 Guest / Table Flow (Current State)

1. Backend: Admin (or system) calls `POST /api/v1/tabels` to register tables.
   - Generates `qrSlug`, `qrCodeURL` and `qrImage`.
2. QR codes point to a frontend URL like:
   - `http://localhost:5173/welcome?qr=<qrSlug>`.
3. A guest device can call `POST /api/v1/session` with `{ deviceId, qrSlug }`.
4. Backend creates a `Session` document and (currently) returns `{ success: true }`.
   - Frontend `guestSlice` is prepared to store a `sessionToken` if backend starts returning it.

---

## 9. Future Improvements / Notes

- Align guest session API response (`/api/v1/session`) with `guestSlice` expectations (return `data.sessionToken`).
- Wire Admin Menu UI (`/admin/menu`) with real backend endpoints for CRUD operations on menu items.
- Add routes for `getTableBySlug` so QR can directly resolve active table details from backend.
- Complete implementation of `getUserByToken` and `verfiySessionToken` for richer profile/session handling.
- Refine register endpoint to also return tokens if you want seamless login after sign-up.

---

This README documents the current behavior of both backend and frontend, entry points, APIs, guards, and main flows, so contributors can onboard quickly and extend the system safely.
