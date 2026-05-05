# Lab 11 - Ecommerce Application (Next.js + Node.js + Express + MongoDB)

This project contains a basic ecommerce app with a separated backend and frontend:

- `backend/` - Node.js + Express.js + MongoDB API
- `frontend/` - Next.js + Tailwind CSS UI

## Features

- MongoDB connection through Mongoose
- Product model and seed data
- API endpoint to fetch all products: `GET /api/products`
- Next.js frontend that fetches and displays product cards from backend

## Project Structure

```text
Lab_11_MERN_Stack_Node_MongoDB_Lab/
├── backend/
│   ├── src/
│   │   ├── config/db.js
│   │   ├── controllers/productController.js
│   │   ├── data/products.js
│   │   ├── models/Product.js
│   │   ├── routes/productRoutes.js
│   │   ├── seed.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   ├── components/ProductCard.js
│   ├── .env.local.example
│   ├── next.config.js
│   ├── package.json
│   ├── postcss.config.js
│   └── tailwind.config.js
└── README.md
```

## Setup and Run

### 1) Backend Setup

```bash
cd backend
npm install
```

Create `.env` from `.env.example`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/ecommerce_lab
```

Seed initial products:

```bash
npm run seed
```

Start backend:

```bash
npm run dev
```

### 2) Frontend Setup

In another terminal:

```bash
cd frontend
npm install
```

Create `.env.local` from `.env.local.example`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

Start frontend:

```bash
npm run dev
```

Open: `http://localhost:3000`

## API Endpoint

- `GET /api/products`
  - Returns all product documents from MongoDB in JSON format.
