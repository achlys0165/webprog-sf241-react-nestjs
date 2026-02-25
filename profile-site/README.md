# Personal Profile Site

Full-stack personal profile + guestbook built with **NestJS**, **React + Vite**, and **Supabase**.

## Project Structure

```
profile-site/
├── backend/          # NestJS API → deploy to Vercel
├── frontend/         # React + Vite → deploy to Vercel
├── supabase-schema.sql
└── .devcontainer/    # GitHub Codespaces config
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/profile` | Get profile |
| PUT | `/api/profile` | Update profile |
| GET | `/api/guestbook` | All entries |
| GET | `/api/guestbook/:id` | Single entry |
| POST | `/api/guestbook` | Create entry |
| PUT | `/api/guestbook/:id` | Update entry |
| DELETE | `/api/guestbook/:id` | Delete entry |

---

## Local Development (Codespaces)

### 1. Supabase — enable RLS
Go to **Supabase → SQL Editor** and run `supabase-schema.sql`.

### 2. Backend `.env`
```bash
cd backend
cp .env.example .env
# Fill in your SUPABASE_URL and SUPABASE_ANON_KEY
```

### 3. Install & run
```bash
# Terminal 1
cd backend && npm install && npm run start:dev

# Terminal 2
cd frontend && npm install && npm run dev
```

---

## Deploying to Vercel

You deploy **backend** and **frontend** as two separate Vercel projects.

### Step 1 — Push to GitHub
Make sure your code is in a GitHub repo.

### Step 2 — Deploy the Backend

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your repo, set **Root Directory** to `backend`
3. Vercel will auto-detect Node.js
4. Add these **Environment Variables**:
   ```
   SUPABASE_URL        = https://your-project.supabase.co
   SUPABASE_ANON_KEY   = your-anon-key
   FRONTEND_URL        = https://your-frontend.vercel.app
   ```
5. Deploy — note the URL, e.g. `https://profile-backend-xyz.vercel.app`

### Step 3 — Deploy the Frontend

1. Go to Vercel → **Add New Project** again
2. Import the same repo, set **Root Directory** to `frontend`
3. Add this **Environment Variable**:
   ```
   VITE_API_URL = https://profile-backend-xyz.vercel.app
   ```
   (the backend URL from Step 2 — no trailing slash)
4. Deploy

### Step 4 — Update Backend CORS
Go back to your **backend** Vercel project → Settings → Environment Variables,
update `FRONTEND_URL` to your actual frontend Vercel URL, then redeploy.

---

## Supabase Credentials

Find these at: **Supabase Dashboard → Project Settings → API**

- **Project URL** → `SUPABASE_URL`  
- **anon / public key** → `SUPABASE_ANON_KEY`
