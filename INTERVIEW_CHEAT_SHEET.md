30-Second Pitch

I built a full‑stack restaurant ordering app that lets customers browse the menu, add items to a cart, apply coupons, and checkout, while admins manage menu items, tables, coupons and orders. The frontend is a React + Vite single‑page app with Redux for state (see client/src/store), and the backend is a Node + Express API with Mongoose models and controllers (see server/src/controllers and server/src/models). Checkout integrates payment and session handling so guest carts and logged‑in users work seamlessly.

1–2 Minute Explanation (Speakable)

Problem statement:
I built a system to let customers order food online and let restaurant staff manage menus, tables, coupons and orders. It covers web ordering, session persistence for guests, coupon validation, and payment handling.

Why I built it:
I wanted to practice end‑to‑end development — UI and state management in React, secure APIs in Express, database modeling with Mongoose, and real integrations like payments and Firebase notifications.

Tech stack and architecture:
- Frontend: React + Vite, Tailwind CSS, Redux slices in `client/src/store` (cart, coupon, auth).
- Routing & UI: routes and protected pages under `client/src/routes` and layouts in `client/src/components/layouts`.
- Backend: Node.js + Express with MVC structure: routes in `server/src/router`, controllers in `server/src/controllers`, models in `server/src/models`.
- Auth & session: JWT tokens and middleware (`server/src/middlewares/verifyToken.js`, `requireUserOrGuestSession.js`).
- Integrations: Razorpay payment service in `server/src/services/integrations/razorpay.service.js` and Firebase admin in `server/src/firebase/firebaseAdmin.js`.

Key features & workflow:
- Browse & cart: Users browse menu (`client/src/components/MenuSection.jsx`), add items which update `cartSlice` (`client/src/store/cartSlice.js`).
- Coupons: Frontend uses `couponSlice` and server validates codes and applies discounts using utility logic.
- Checkout: Checkout page (`client/src/pages/order/CheckOutPage.jsx`) posts an order to the API. The request passes through session/auth middlewares, the controller creates an order (`server/src/controllers/order.controller.js`), processes payment via the payment service, saves the `order` model (`server/src/models/order.js`) and returns confirmation.
- Admin: Admin pages and protected routes let staff CRUD menus, coupons, tables, and view orders (admin routes under `server/src/router/admin` and admin UI under `client/src/components/admin`).

Challenges & learnings:
- Session handling: I designed guest sessions and a merge strategy on login so carts are not lost (`requireUserOrGuestSession` and session controllers).
- Coupon & pricing logic: Centralized business rules in utilities so controllers remain small and testable.
- Payments: Implemented pending/confirmed order states and idempotency checks to avoid duplicate charges; learned to treat callbacks/webhooks carefully.
- Architecture: Separating controllers, services and utils improved maintainability and made testing easier.

Three Common Follow‑Up Questions (with answers — speakable)

Q1: How do you protect admin routes and enforce roles?
A1: I use JWTs for authentication and a `checkRole` middleware on the server to ensure the user has the `admin` role before accessing admin routes. The frontend also wraps admin routes in protected components under `client/src/routes`.

Q2: How do you handle a guest cart when a user logs in?
A2: The app persists a guest session on the server and stores a small guest token client‑side. On login the backend merges the guest cart with the user cart via session logic so the user keeps their items.

Q3: How do you ensure payment reliability and avoid duplicate orders?
A3: Orders are created in a pending state before payment confirmation. The payment service validates transactions and webhooks/callbacks confirm and atomically update order state. I add idempotency checks in the payment flow to prevent duplicates.

Quick memorization bullets (for 30s interview answers):
- I built a full‑stack restaurant ordering app: React + Vite frontend with Redux, Node + Express backend with Mongoose.
- Users can browse, add to cart, apply coupons, and checkout; admins manage menus, tables, coupons and orders.
- Checkout goes: frontend `cartSlice` → POST to order API (`server/src/controllers/order.controller.js`) → payment service (`razorpay.service.js`) → save `order` model.

References (key files):
- Frontend store: `client/src/store/store.js`
- Checkout page: `client/src/pages/order/CheckOutPage.jsx`
- Cart slice: `client/src/store/cartSlice.js`
- Backend order controller: `server/src/controllers/order.controller.js`
- Order model: `server/src/models/order.js`
- Session middleware: `server/src/middlewares/requireUserOrGuestSession.js`
- Payment integration: `server/src/services/integrations/razorpay.service.js`

You can copy‑paste these lines and practice them aloud in an interview.
