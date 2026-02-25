# Personal Profile Site

A full-stack personal profile website with a guestbook, built with **NestJS**, **React**, and **Supabase**.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | NestJS (Node.js) |
| Frontend | React + Vite + TypeScript |
| Database | Supabase (PostgreSQL) |
| Styling | Pure CSS with CSS variables |

## Project Structure

```
profile-site/
├── .devcontainer/          # GitHub Codespaces config
│   └── devcontainer.json
├── backend/                # NestJS API
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── supabase/       # Supabase client service
│   │   ├── guestbook/      # Guestbook CRUD module
│   │   └── profile/        # Profile GET/PUT module
│   ├── .env.example
│   └── package.json
├── frontend/               # React app
│   ├── src/
│   │   ├── App.tsx
│   │   ├── lib/api.ts      # Axios API calls
│   │   ├── components/
│   │   │   └── Navbar.tsx
│   │   └── pages/
│   │       ├── Home.tsx
│   │       └── Guestbook.tsx
│   └── package.json
├── supabase-schema.sql     # Database setup script
└── package.json            # Root scripts
```

## API Endpoints

### Profile
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/profile` | Get profile data |
| PUT | `/api/profile` | Update profile data |

### Guestbook
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/guestbook` | Get all entries |
| GET | `/api/guestbook/:id` | Get single entry |
| POST | `/api/guestbook` | Create new entry |
| PUT | `/api/guestbook/:id` | Update entry message |
| DELETE | `/api/guestbook/:id` | Delete entry |

---

## Setup Instructions

### Step 1 — Set up Supabase

1. Go to [supabase.com](https://supabase.com) and create a free project
2. Once created, go to **SQL Editor** in your Supabase dashboard
3. Copy the contents of `supabase-schema.sql` and run it
4. Go to **Project Settings → API** and note down:
   - **Project URL** (e.g., `https://abcxyz.supabase.co`)
   - **anon/public** key

### Step 2 — Configure the backend

```bash
cd backend
cp .env.example .env
```

Edit `.env` and fill in your Supabase credentials:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
FRONTEND_URL=http://localhost:5173
PORT=3000
```

### Step 3 — Install dependencies

From the project root:

```bash
npm run install:all
```

Or manually:
```bash
cd backend && npm install
cd ../frontend && npm install
```

### Step 4 — Run the app

Open **two terminals**:

**Terminal 1 — Backend:**
```bash
cd backend
npm run start:dev
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```

- Frontend: http://localhost:5173
- API: http://localhost:3000/api

---

## GitHub Codespaces

This project includes a `.devcontainer` config. When you open this repo in Codespaces:

1. The container will automatically install all dependencies (`postCreateCommand`)
2. Ports 3000 and 5173 are auto-forwarded
3. The Vite dev server URL will open automatically in your browser

**You still need to:**
- Create your `.env` file in the `backend/` folder (the `.env.example` is provided)
- Run the Supabase SQL schema

---

## Customizing Your Profile

Update your profile data by calling the API (or directly editing the row in Supabase):

```bash
curl -X PUT http://localhost:3000/api/profile \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "title": "Full-Stack Engineer",
    "bio": "Building great things on the web.",
    "location": "Quezon City, PH",
    "github_url": "https://github.com/janedoe",
    "linkedin_url": "https://linkedin.com/in/janedoe",
    "skills": ["TypeScript", "React", "NestJS", "PostgreSQL"]
  }'
```

---

## Security Note

The current setup uses Supabase **anon key** with permissive RLS policies — anyone can POST, PUT, and DELETE guestbook entries. For a production site, consider:

- Adding authentication (Supabase Auth + JWT)
- Rate limiting on the NestJS API
- Restricting DELETE/PUT to authenticated users only
