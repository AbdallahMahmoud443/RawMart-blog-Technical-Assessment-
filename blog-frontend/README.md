# Rawmart Blog Frontend

A modern, developer-friendly React SPA for blogging, built with Vite. It provides authenticated post creation and discussion with clean UX, route guards, and robust client-side error handling.

## Project Idea

- Solves the need for a simple, fast blog UI that supports secure authoring and community comments.
- Goals: smooth authenticated UX, resilient data fetching, clear post lifecycle, and maintainable architecture.
- Core features:
  - JWT-based login and signup
  - Posts CRUD with tags and 24h expiration indicator
  - Comment add/update/delete with owner controls
  - Protected routes for create/edit
  - Client-side routing and error pages (404, 500)

## Architecture

- SPA built on React 18 + React Router 6 with a top-level `Layout` and nested routes (`src/routes/index.jsx:16-37`).
- Authentication state via a Provider pattern (`src/context/AuthContext.jsx:6-97`) consuming a service layer (`src/services/auth.js:3-15`).
- HTTP client is a configured Axios instance (`src/config/axis.config.js:5-12`) with request/response interceptors for:
  - Attaching `Authorization` header except on auth endpoints (`src/config/axis.config.js:13-21`).
  - Redirecting on `401` to `/login`, `404` to `/404` for GETs, and `5xx` to `/500` (`src/config/axis.config.js:25-52`).
- Data layer uses React Query for caching and mutations with domain hooks:
  - Posts: `useGetPosts`, `useGetPost`, `useCreatePost`, `useUpdatePost`, `useDeletePost` under `src/hooks/posts/`.
  - Comments: `useCreateComment`, `useUpdateComment`, `useDeleteComment` under `src/hooks/comments/`.
- Route guard (`src/components/ProtectedRoute.jsx:4-17`) protects create/edit flows.
- UI composition uses feature components (e.g., `Navbar`, `PostItem`, `Comments`) and pages under `src/pages/`.
- Design patterns:
  - Provider pattern for auth
  - Service layer abstraction for API modules
  - Domain-specific hooks wrapping queries/mutations
  - Route guard component for access control
  - Request/response interceptor for cross-cutting concerns

## Folder Structure

```
.
├─ src/
│  ├─ components/           # Reusable UI (layout, navbar, footer, post/comment items, guards)
│  ├─ config/               # Axios client configuration and interceptors
│  ├─ context/              # Auth provider and hook
│  ├─ hooks/                # React Query hooks by domain (posts, comments)
│  ├─ pages/                # Route pages (landing, auth, posts, errors)
│  ├─ routes/               # App routing
│  ├─ services/             # API modules (auth, posts, comments, tags)
│  ├─ utils/                # Small utilities (form helpers, image URL)
│  ├─ App.jsx               # Root composition (Router + Providers)
│  ├─ main.jsx              # App mount and QueryClient setup
│  └─ index.css             # Global styles
├─ .env.example             # Environment example with API base URL
├─ vite.config.js           # Vite configuration
├─ package.json             # Scripts and dependencies
└─ dist/                    # Production build output (after `npm run build`)
```

## Tech Stack

- Frontend:
  - React 18, Vite 5
  - React Router 6
  - TanStack React Query 5
  - Axios
  - React Hook Form
  - React Hot Toast
  - date-fns (optional utilities)
- Backend API (assumed):
  - REST API at `VITE_API_URL` with endpoints:
    - `/auth/login`, `/auth/signup`
    - `/posts/`, `/posts/create`, `/posts/update/:id`, `/posts/delete/:id`
    - `/comments/`, `/comments/update/:id`, `/comments/delete/:id`
  - Returns JWT access tokens and post resources with `expire_date`
- Tooling:
  - ESLint
  - `@vitejs/plugin-react`

## How to Run the Project

- Prerequisites:
  - Node.js 18+ (required by Vite 5)
  - npm
- Installation:
  - Clone the repo and install dependencies:
    ```bash
    npm install
    ```
- Environment configuration:
  - Create `.env` from `.env.example` and set your API:
    - Windows (PowerShell): `Copy-Item .env.example .env`
    - macOS/Linux: `cp .env.example .env`
  - Configure `VITE_API_URL` (defaults to `http://localhost:8000/api/v1`).
- Run locally:
  - Start dev server: `npm run dev`
  - Lint code: `npm run lint`
  - Build: `npm run build`
  - Preview production build: `npm run preview`

### Troubleshooting

- 401 Unauthorized:
  - Axios interceptor clears auth and redirects to `/login` (`src/config/axis.config.js:30-36`).
  - Ensure your API issues valid JWTs and CORS is enabled.
- 404 on fetch:
  - GET requests with 404 redirect to `/404` (`src/config/axis.config.js:38-43`).
  - Check `VITE_API_URL` and endpoint paths.
- 5xx server errors:
  - Redirects to `/500` (`src/config/axis.config.js:44-49`).
  - Verify backend availability and logs.
- Node/version issues:
  - Use Node 18+ for Vite 5 compatibility.
- Stale auth/data:
  - Clear `localStorage` (`token`, `user`) and reload.
  - React Query caches are invalidated on mutations (e.g., `useCreatePost`/`useDeletePost`).
