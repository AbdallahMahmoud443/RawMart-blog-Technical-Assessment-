# Blog System — Docker Setup & Run Guide

<img src="https://github.com/AbdallahMahmoud443/RawMart-blog-Technical-Assessment-/blob/main/images/Home%20Page.png?raw=true"/>

## Overview
- Runs a Laravel 12 backend (PHP 8.4) with MySQL and Redis
- Includes dedicated queue worker and scheduler containers
- Serves React frontend via Nginx on port 3000

## Prerequisites
- Docker Desktop installed and running
- Windows PowerShell or any terminal that supports `docker compose`

## Project Structure
- Backend (Laravel): `Backend/`
- Frontend (React + Vite): `frontend/`
- Orchestration: `docker-compose.yml` at project root

## Configuration
- Backend environment: `Backend/.env` (copied from `Backend/.env.example` and adjusted)
  - DB_CONNECTION=mysql
  - DB_HOST=mysql
  - DB_PORT=3306
  - DB_DATABASE=db_blog
  - DB_USERNAME=root
  - DB_PASSWORD=123456
  - CACHE_STORE=redis
  - QUEUE_CONNECTION=redis
  - SESSION_DRIVER=redis
  - REDIS_CLIENT=phpredis
  - REDIS_HOST=redis
  - JWT_SECRET=… (already present)

- Frontend environment: optional `frontend/.env` (copy from `frontend/.env.example`)
  - VITE_API_URL=http://localhost:8000/api/v1
  - If not set, defaults to `http://localhost:8000/api/v1`.

## Services & Ports
- backend: Laravel HTTP server on `http://localhost:8000`
- queue: Laravel queue worker (uses Redis)
- scheduler: Laravel scheduler worker
- mysql: MySQL 8.0 on `localhost:3306` (container name: `mysql`)
- redis: Redis on `localhost:6379` (container name: `redis`)
- frontend: Nginx serving built React app on `http://localhost:3000`

## Compose Configuration Highlights
- Backend builds from `Backend/dockerfile` and mounts project code
- Queue and Scheduler use the same backend image, mount code, and load `Backend/.env`
- Frontend builds from `frontend/dockerfile` and serves `/dist` via Nginx

## First-Time Setup
1) Copy backend environment:

```bash
Copy-Item Backend/.env.example Backend/.env
```

2) Start the stack (PowerShell):

```bash
docker compose up -d --build
```

3) Run database migrations:

```bash
docker compose exec backend php artisan migrate --force
```

4) Seed initial data (optional):

```bash
docker compose exec backend php artisan db:seed --force
```

## Usage
- Backend API: `http://localhost:8000/api/v1`
- Frontend App: `http://localhost:3000`

## Common Commands
- Stop and remove everything:

```bash
docker compose down -v
```

- View logs:

```bash
docker compose logs backend --tail=100
docker compose logs queue --tail=100
docker compose logs scheduler --tail=100
docker compose logs mysql --tail=100
docker compose logs redis --tail=100
docker compose logs frontend --tail=100
```

- Rebuild a single service:

```bash
docker compose build backend
docker compose up -d backend
```

## Troubleshooting
- Windows PowerShell does not support `&&` chaining; run commands one by one.
- Scheduler/Queue errors referencing SQLite path:
  - Ensure `Backend/.env` exists and is mounted (compose uses `env_file`).
  - Confirm backend env has `DB_*` set to MySQL and `CACHE_STORE=redis`, `QUEUE_CONNECTION=redis`, `REDIS_CLIENT=phpredis`, `REDIS_HOST=redis`.
- If backend doesn’t start, check `docker compose logs backend` for port or env issues.
- If frontend API calls fail, verify `VITE_API_URL` points to `http://localhost:8000/api/v1`.

## Notes
- Backend dev server uses `php artisan serve` for simplicity. For production, consider PHP-FPM + Nginx and health checks.
- MySQL data is stored in the named volume `db-data`. Removing with `docker compose down -v` deletes data.
