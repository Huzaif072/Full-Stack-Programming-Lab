# CRM System — Customer Relationship Management

**Air University | Full Stack Programming Lab | BSSE VI-B | Spring 2026**

A full-stack Customer Relationship Management (CRM) application built with Next.js 14, Express.js, and MongoDB.

## Features

- JWT authentication (register/login)
- Customer CRUD with search, filter, and URL-persisted query params
- Dashboard with stats and recent customers
- Invoice generation with preview and client-side PDF download
- Toast notifications with slide-in notification panel
- Rule-based chatbot assistant (no external AI)
- Responsive design (375px – 1440px)

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), React, Tailwind CSS, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose |
| Auth | JWT, bcryptjs |
| PDF | jsPDF (client-side) |
| Notifications | react-hot-toast |
| Icons | Lucide React |

## Prerequisites

- Node.js 18+
- MongoDB (local installation or MongoDB Atlas URI)

## Setup

### 1. Clone the repository

```bash
git clone <your-github-repo-url>
cd Final_Term_Project_CRM
```

### 2. Server setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env`:

```
MONGO_URI=mongodb://localhost:27017/crm_db
JWT_SECRET=your_secure_secret_key
PORT=5000
```

Seed the database (creates admin user + 15 customers):

```bash
node seed.js
```

Start the server:

```bash
npm run dev
```

### 3. Client setup

```bash
cd client
npm install
cp .env.example .env.local
```

Edit `client/.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Default Credentials

After running the seed script:

- **Email:** `admin@crm.com`
- **Password:** `admin123`

## Project Structure

```
Final_Term_Project_CRM/
├── client/          # Next.js frontend
├── server/          # Express backend
├── stitch/          # UI design references (Stitch/Figma exports)
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/customers` | List customers (search & status filters) |
| POST | `/api/customers` | Create customer |
| GET | `/api/customers/:id` | Get customer by ID |
| PUT | `/api/customers/:id` | Update customer |
| DELETE | `/api/customers/:id` | Delete customer |
| GET | `/api/invoices` | List invoices |
| POST | `/api/invoices` | Create invoice |
| GET | `/api/invoices/:id` | Get invoice by ID |

## GitHub Repository

`https://github.com/Huzaif072/Full-Stack-Programming-Lab`

## License

Academic project — Air University, Spring 2026.
