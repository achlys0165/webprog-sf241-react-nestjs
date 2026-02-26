# webprog-sf241-react-nestjs
# Terminal Guestbook & Personal Profile

A full-stack, monorepo web application featuring a personal profile and an interactive, terminal-themed guestbook. Built as a final requirement to demonstrate secure REST API development, full-stack integration, and database management.

---
## 🚀 Tech Stack

* **Frontend:** React.js (bootstrapped with Vite)
* **Backend:** NestJS (Node.js framework)
* **Database:** Supabase (PostgreSQL)
* **Deployment:** Vercel (Serverless Functions for Backend, Static Hosting for Frontend)
* **Environment:** GitHub Codespaces / Local Environment
---
## 🗄️ Database Schema (Supabase)

To run this project locally, you must create a table in your Supabase project. Run the following SQL command in the Supabase SQL Editor to generate the required table:

```sql
create table guestbook (
  id bigint primary key generated always as identity,
  name text not null,
  message text not null,
  created_at timestamp with time zone default now()
);
```

---

## ⚙️ Local Setup Instructions

This project uses a monorepo structure. You will need two terminal windows to run the backend and frontend simultaneously.

### Prerequisites
* Node.js (v18+ recommended)
* npm or yarn
* A Supabase account with the table created from the schema above.

### 1. Clone the Repository
```bash
git clone <your-github-repo-url>
cd <your-repo-name>
```
### 2. Backend Setup (NestJS)

Navigate to the backend directory, install dependencies, and configure your secure environment variables.

```bash
cd backend
npm install
```

**Environment Variables:**
For security purposes, database keys are not committed to version control.
1. Locate the `.env.example` file in the `backend/` directory.
2. Create a new file named `.env` in the same directory.
3. Copy the contents of `.env.example` into `.env` and replace the placeholder values with your actual Supabase Project URL and Anon Key.

```text
# backend/.env
SUPABASE_URL=your_actual_supabase_url
SUPABASE_KEY=your_actual_supabase_anon_key
```
**Start the Backend Server:**
```bash
npm run start:dev
```
*The API will run locally at `http://localhost:3000/guestbook`.*

### 3. Frontend Setup (React/Vite)

Open a new terminal window, navigate to the frontend directory, install dependencies, and link the frontend to the local API.

```bash
cd frontend
npm install
```

**Environment Variables:**

1. Create a `.env` file in the `frontend/` directory.
2. Add the local API URL:

```text
# frontend/.env
VITE_API_URL=http://localhost:3000/guestbook
```

**Start the Frontend Server:**
```bash
npm run dev
```
*The React app will typically be available at `http://localhost:5173`. Click the local link provided in the terminal to view the application.*

---

## 📡 API Endpoints

The NestJS backend exposes the following RESTful endpoints at `/guestbook`:

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/guestbook` | Fetches all guestbook entries | None |
| `POST` | `/guestbook` | Creates a new entry | `{ "name": "string", "message": "string" }` |
| `PUT` | `/guestbook/:id` | Updates an existing entry | `{ "name": "string", "message": "string" }` |
| `DELETE` | `/guestbook/:id` | Deletes an entry | None |

---

## 🌐 Live Deployment

* **Frontend UI:** https://webprog-sf241-react-nestjs-fohp.vercel.app
* **Backend API:** https://webprog-sf241-react-nestjs.vercel.app/guestbook

---
*Developed by Jan Samuel G. Sultan*


