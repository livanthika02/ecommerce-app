# ShopEasy — E-Commerce Web Application

A full-stack online store: product catalog, cart, checkout, order tracking,
and role-based admin/user access.

**Stack:** React (Vite) + Node/Express + MongoDB (Mongoose) + JWT auth.

## Project structure

```
ecommerce-app/
  backend/     Express API, MongoDB models, JWT auth, seed script
  frontend/    React website (catalog, cart, checkout, admin dashboard)
  website/     shopeasy.html — a standalone single-file demo with no setup;
               open it directly in a browser (uses browser storage, not MongoDB)
```

Prices are shown in Indian Rupees (₹) throughout.

## 1. Prerequisites

- Node.js 18+
- A MongoDB database — either:
  - install MongoDB locally (https://www.mongodb.com/try/download/community), or
  - use a free MongoDB Atlas cluster (https://www.mongodb.com/cloud/atlas) and copy its connection string
- VS Code, with the built-in terminal (View → Terminal) — you'll run backend and
  frontend in two separate terminal tabs

## 0. Opening in VS Code

Unzip this folder, then in VS Code: `File → Open Folder…` and select the
`ecommerce-app` folder. Open two terminals (the `+` icon in the terminal panel)
— one for `backend/`, one for `frontend/` — since both need to run at the same
time in development.

## 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce   # or your Atlas connection string
JWT_SECRET=some_long_random_string
```

Run it:
```bash
npm run dev      # with nodemon, auto-restarts on changes
# or
npm start
```

The API runs at `http://localhost:5000`. Check `http://localhost:5000/api/health`.

Optional — seed demo accounts and sample products (run once, with the server's
MongoDB reachable):
```bash
npm run seed
```
This creates `admin@shopeasy.com` / `admin123` (admin) and
`user@shopeasy.com` / `user123` (customer), plus six sample products, so you
can log in immediately instead of registering from scratch.

## 3. Frontend setup

In a second terminal:
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`. Vite proxies `/api` requests to the backend automatically
(see `vite.config.js`), so no extra config is needed in development.

## 4. Using the app

- **Sign up** on the site — the **first account you ever register becomes an admin
  automatically**; everyone after that registers as a normal user.
- As an **admin**, go to the "Admin" link in the nav to add products, edit or
  delete them, and manage order statuses.
- As a **user**, browse the catalog, add items to your cart, and check out.
  Your orders appear under "My orders", and stock is decremented automatically
  when an order is placed.

## 5. How the pieces fit together

- **Auth**: `POST /api/auth/register` and `/login` issue a JWT; the frontend
  stores it in `localStorage` and attaches it as a `Bearer` token on every
  request. `GET /api/auth/me` restores the session on page reload.
- **Roles**: the `protect` middleware verifies the JWT; `adminOnly` additionally
  checks `req.user.role === "admin"`. Product writes and order management are
  admin-only; anyone can browse products.
- **Cart**: kept client-side (React context + `localStorage`) until checkout,
  so browsing doesn't require login. Checkout itself requires login.
- **Orders**: `POST /api/orders` validates stock, decrements it, and stores a
  snapshot of item name/price at time of purchase (so later price changes
  don't rewrite order history).

## 6. Extending it

Natural next steps if you want to keep building:
- Payment integration (Stripe/Razorpay) at checkout
- Product image uploads instead of image URLs
- Pagination on the product grid
- Email notifications on order status changes
- Unit/integration tests (Jest + Supertest for the API)

## 7. Production notes

This is set up for local development. Before deploying:
- Use a real secret manager for `JWT_SECRET`, never commit `.env`
- Restrict CORS origins in `server.js` instead of allowing all
- Build the frontend (`npm run build` in `frontend/`) and serve the static
  files from Express or a CDN, pointing `BASE_URL` in `api.js` at your deployed
  API domain
