# Rustik Plank — Full Stack eCommerce Application

A complete, dynamic eCommerce application built from the Rustik Plank PSD design, using Next.js, Node.js, Express.js, and MongoDB.

---

## Tech Stack

| Layer      | Technology                                      |
|------------|-------------------------------------------------|
| Frontend   | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| State      | Zustand (cart, auth, wishlist)                  |
| Backend    | Node.js, Express.js                             |
| Database   | MongoDB + Mongoose                              |
| Auth       | JWT (bcryptjs + jsonwebtoken)                   |
| HTTP       | Axios                                           |

---

## Project Structure

```
rustik-plank/
├── backend/                  # Express.js API
│   ├── src/
│   │   ├── models/           # Mongoose schemas
│   │   ├── controllers/      # Route handlers
│   │   ├── routes/           # Express routers
│   │   └── middleware/       # Auth middleware
│   ├── server.js             # Entry point
│   ├── seed.js               # Database seeder
│   └── .env.example
│
└── frontend/                 # Next.js app
    ├── app/                  # App Router pages
    │   ├── page.tsx          # Home
    │   ├── shop/             # Product listing
    │   ├── product/[slug]/   # Product detail
    │   ├── cart/             # Shopping cart
    │   ├── checkout/         # Checkout
    │   ├── auth/             # Login & Register
    │   ├── account/          # User account & orders
    │   ├── wishlist/         # Saved products
    │   ├── blog/             # Blog listing & posts
    │   ├── about/            # About us
    │   ├── contact/          # Contact form
    │   └── admin/            # Admin panel
    ├── components/
    │   ├── layout/           # Header, Footer, MainLayout
    │   ├── home/             # Hero, CategoryPanels, ProductTabs, HotDeal, Blog
    │   └── product/          # ProductCard
    └── lib/
        ├── api.ts            # Axios API layer
        └── store.ts          # Zustand stores
```

---

## Features

### Customer-Facing
- ✅ Home page matching PSD: hero, category panels, featured/special/popular tabs, hot deal + countdown, blog section
- ✅ Shop page with sidebar filters (category, featured, special, popular, hot deals)
- ✅ Sort by newest, price, rating, popularity
- ✅ Pagination on all listings
- ✅ Product detail with image gallery, reviews, star ratings, add to cart
- ✅ Shopping cart (persistent via localStorage)
- ✅ Checkout with address form and payment method selection
- ✅ User registration & login (JWT auth)
- ✅ Account dashboard with profile editing and password change
- ✅ Order history with status tracking
- ✅ Wishlist (persistent, toggle from any product)
- ✅ Blog with individual post pages
- ✅ About Us and Contact pages
- ✅ Fully responsive (mobile, tablet, desktop)

### Admin Panel (`/admin`)
- ✅ Dashboard with stats and recent orders
- ✅ Product CRUD: create, edit, delete, flag (featured/special/popular/hotDeal)
- ✅ Category CRUD
- ✅ Order management: view all orders, update status
- ✅ Blog post CRUD with HTML content support

---

## Quick Start

### Prerequisites
- Node.js v18+
- MongoDB running locally (`mongod`)
- npm or yarn

---

### 1. Backend Setup

```bash
cd backend

# Copy and configure environment
cp .env.example .env
# Edit .env: set MONGODB_URI, JWT_SECRET

# Install dependencies
npm install

# Seed the database (creates admin + sample data)
node seed.js

# Start development server
npm run dev
# → API running on http://localhost:5000
```

**Admin credentials (after seeding):**
- Email: `admin@rustikplank.com`
- Password: `admin123`

---

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
# → App running on http://localhost:3000
```

---

### 3. Environment Variables

**backend/.env**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/rustik-plank
JWT_SECRET=your_super_secret_key_change_this
JWT_EXPIRE=30d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**frontend/.env.local**
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## API Endpoints

### Auth
| Method | Endpoint              | Access  |
|--------|-----------------------|---------|
| POST   | /api/auth/register    | Public  |
| POST   | /api/auth/login       | Public  |
| GET    | /api/auth/me          | Private |
| PUT    | /api/auth/profile     | Private |
| PUT    | /api/auth/password    | Private |

### Products
| Method | Endpoint                     | Access  |
|--------|------------------------------|---------|
| GET    | /api/products                | Public  |
| GET    | /api/products/featured-all   | Public  |
| GET    | /api/products/:id            | Public  |
| POST   | /api/products                | Admin   |
| PUT    | /api/products/:id            | Admin   |
| DELETE | /api/products/:id            | Admin   |
| POST   | /api/products/:id/reviews    | Private |

### Categories
| Method | Endpoint             | Access |
|--------|----------------------|--------|
| GET    | /api/categories      | Public |
| POST   | /api/categories      | Admin  |
| PUT    | /api/categories/:id  | Admin  |
| DELETE | /api/categories/:id  | Admin  |

### Orders
| Method | Endpoint             | Access  |
|--------|----------------------|---------|
| POST   | /api/orders          | Private |
| GET    | /api/orders/my       | Private |
| GET    | /api/orders/all      | Admin   |
| GET    | /api/orders/:id      | Private |
| PUT    | /api/orders/:id/pay  | Private |
| PUT    | /api/orders/:id/status | Admin |

### Blog, Cart, Wishlist, Deals
All standard CRUD endpoints under `/api/blog`, `/api/cart`, `/api/wishlist`, `/api/deals`.

---

## Design Colors (from PSD)

| Token         | Value     | Usage                     |
|---------------|-----------|---------------------------|
| Orange        | `#f78c2a` | Primary CTA, badges, hover |
| Dark          | `#1f1f1f` | Text, headings, footer    |
| Brown         | `#8b5d33` | Accent, display text      |
| Cream         | `#f4f4f4` | Section backgrounds       |
| Warm grey     | `#c5c5c5` | Header bar, nav           |
| Footer grey   | `#dedede` | Footer background         |
| Border        | `#d5d5d5` | Dividers, borders         |

---

## Production Deployment

```bash
# Backend (PM2 recommended)
npm install -g pm2
pm2 start server.js --name rustik-backend

# Frontend
npm run build
npm start
# or deploy to Vercel: vercel --prod
```

For production, set `NODE_ENV=production` and use a MongoDB Atlas connection string.
