# Blog Platform API

![](C:\laragon\www\blog-system\images\6903464216718ad4aeb631.webp)



## Project Idea

Blog Platform API is a robust backend system designed to provide a scalable foundation for blog applications. This RESTful API solves the problem of content management by offering comprehensive functionality for creating, managing, and organizing blog posts with tags and comments.

The main goals of this project are:

- Deliver a clean, maintainable API architecture that can handle high traffic
- Provide secure authentication and authorization for users
- Enable efficient content management with proper relationships between posts, tags, and comments
- Implement a scalable architecture that can be extended with additional features

This is a REST API backend that serves as the core engine for blog platforms, supporting frontend applications and mobile clients.

## Architecture

The application follows a layered architecture designed for separation of concerns and maintainability:

1. **Controller Layer**: Thin controllers that delegate to appropriate Actions
2. **Action Layer**: Specific action classes that handle individual use cases
3. **Service Layer**: Contains business logic and orchestrates operations
4. **Domain Layer**: Models representing business entities (Post, Comment, Tag, User)
5. **Infrastructure Layer**: Database, cache, and external service integrations

Request flow through the system:

1. HTTP request hits the router
2. Router directs to appropriate controller method
3. Controller delegates to the relevant Action class
4. Action may use one or more Service classes to handle business logic
5. Services interact with Models and other infrastructure components
6. Response flows back through the same layers with appropriate transformations

## Design Patterns Used in the Project

### Action Pattern

Action classes encapsulate single use cases or operations. Each Action class is responsible for one specific task, such as creating a post, updating a comment, or authenticating a user. Actions provide a clean way to organize application logic and make the codebase more maintainable.

### Service Layer Pattern

Service classes contain business logic that doesn't naturally fit into a single model. Services orchestrate operations across multiple models and handle complex business rules. This pattern keeps controllers thin and models focused on data representation.

### Additional Patterns

- **Repository Pattern**: Used for data access abstraction (implemented through Eloquent)
- **DTO (Data Transfer Object)**: Request classes validate and transform incoming data
- **Policy Pattern**: Authorization logic is encapsulated in Policy classes
- **Factory Pattern**: Used for creating test data and complex objects
- **Resource Pattern**: API responses are transformed using Resource classes

## Advantages of Using Action & Service Patterns

### Single Responsibility Principle

Each Action class has one responsibility, making the code easier to understand and maintain. This separation ensures that changes to one feature don't impact others.

### Testability

Actions and Services can be unit tested in isolation, making it easier to achieve high test coverage. Dependencies can be easily mocked, and each component can be tested independently.

### Reusability

Service classes can be reused across multiple Actions, reducing code duplication. Common business logic is centralized, making it easier to maintain and update.

### Maintainability

With clear separation of concerns, locating and fixing bugs becomes simpler. New developers can quickly understand the codebase structure and find relevant code.

### Cleaner Controllers

Controllers become thin and focused solely on HTTP concerns. This makes the routing layer more readable and easier to understand.

## Folder Structure

```
Backend/
├── app/
│   ├── Actions/           # Action classes for specific use cases
│   │   ├── Auth/          # Authentication actions
│   │   ├── Comments/      # Comment-related actions
│   │   ├── Media/         # Media handling actions
│   │   ├── Posts/         # Post-related actions
│   │   └── Tags/          # Tag-related actions
│   ├── Exceptions/        # Custom exception handlers
│   ├── Http/
│   │   ├── Controllers/   # API controllers
│   │   ├── Payloads/      # Request payload DTOs
│   │   ├── Requests/      # Form request validation
│   │   ├── Resources/     # API response transformers
│   │   └── Responses/     # Custom response classes
│   ├── Jobs/              # Queueable jobs
│   │   └── v1/
│   ├── Models/            # Eloquent models
│   ├── Policies/          # Authorization policies
│   │   └── v1/
│   ├── Providers/         # Service providers
│   └── Services/          # Business logic services
│       └── v1/
├── bootstrap/             # Application bootstrap files
├── config/                # Configuration files
├── database/
│   ├── factories/         # Model factories for testing
│   ├── migrations/        # Database migrations
│   └── seeders/           # Database seeders
├── public/                # Public web root
├── resources/             # View files and assets
├── routes/
│   ├── api/               # API route definitions
│   │   └── v1/            # Version 1 API routes
│   ├── console/           # Console routes
│   └── web/               # Web routes
├── storage/               # Storage directory
└── tests/
    ├── Feature/           # Feature tests
    │   ├── Auth/          # Authentication tests
    │   ├── Comment/       # Comment feature tests
    │   └── Post/          # Post feature tests
    └── Unit/              # Unit tests
```

## Tech Stack

### Backend Framework

- **Laravel 12**: Modern PHP framework with expressive syntax and powerful features
- **PHP 8.2+**: Latest PHP version with improved performance and features

### Authentication

- **JWT Authentication**: Stateless authentication using tymon/jwt-auth
- **Policies**: Fine-grained authorization through Laravel's Policy system

### Database

- **MySQL**: Primary relational database
- **Eloquent ORM**: Laravel's powerful ActiveRecord implementation
- **Migrations**: Version-controlled database schema management

### Cache & Queue

- **Redis**: High-performance caching and queue backend
- **Predis**: PHP Redis client

### Testing

- **PHPUnit**: Feature and unit testing framework
- **Factories**: Test data generation
- **Feature Tests**: End-to-end API testing

![](C:\laragon\www\blog-system\images\testing.PNG)

### DevOps / Tools

- **Composer**: PHP dependency management
- **Laravel Pint**: Code style fixing
- **Dedoc Scramble**: Automatic API documentation generation

## API Endpoints

The API is organized into versioned endpoints following RESTful conventions. All API endpoints are prefixed with `/api/v1`.

![](C:\laragon\www\blog-system\images\API_Docs.png)

### Authentication Endpoints

Go To Documentation `/docs/api` generated by `scramble `

| Method | Endpoint              | Description                           | Authentication |
| ------ | --------------------- | ------------------------------------- | -------------- |
| POST   | `/api/v1/auth/signup` | Register a new user                   | No             |
| POST   | `/api/v1/auth/login`  | Authenticate a user and get JWT token | No             |

### Post Endpoints

| Method | Endpoint                    | Description                   | Authentication |
| ------ | --------------------------- | ----------------------------- | -------------- |
| GET    | `/api/v1/posts`             | Get a paginated list of posts | No             |
| GET    | `/api/v1/posts/{id}`        | Get a specific post by ID     | No             |
| POST   | `/api/v1/posts/create`      | Create a new post             | Yes            |
| PUT    | `/api/v1/posts/update/{id}` | Update an existing post       | Yes            |
| DELETE | `/api/v1/posts/delete/{id}` | Delete a post                 | Yes            |

### Comment Endpoints

| Method | Endpoint                          | Description                      | Authentication |
| ------ | --------------------------------- | -------------------------------- | -------------- |
| GET    | `/api/v1/comments/{post_id}/{id}` | Get a specific comment on a post | Yes            |
| POST   | `/api/v1/comments`                | Create a new comment             | Yes            |
| PUT    | `/api/v1/comments/update/{id}`    | Update an existing comment       | Yes            |
| DELETE | `/api/v1/comments/delete/{id}`    | Delete a comment                 | Yes            |

### Tag Endpoints

| Method | Endpoint       | Description            | Authentication |
| ------ | -------------- | ---------------------- | -------------- |
| GET    | `/api/v1/tags` | Get a list of all tags | No             |

### Authentication

Most endpoints require JWT authentication. To authenticate, include the token in the Authorization header:

```
Authorization: Bearer {your_jwt_token}
```

### Response Format

All API responses follow a consistent JSON format:

#### Success Response

```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation successful"
}
```

#### Error Response

```json
{
 "title": "Resource not found",
 "detail": $e->getMessage(),
  "instance": $request->path(),
  "code": "RESOURCE_NOT_FOUND",
  "link": "http://localhost:8000/api/v1/errors/404",
  "status": Response::HTTP_NOT_FOUND
}
```

## How to Run the Project

### Prerequisites

- PHP 8.2 or higher
- Composer
- MySQL
- Redis
- Node.js and NPM (for asset compilation)

### Installation Steps

1. Clone the repository:

```bash
git clone <repository-url>
cd blog-system/Backend
```

2. Install dependencies:

```bash
composer install
npm install
```

3. Environment setup:

```bash
cp .env.example .env
php artisan key:generate
```

4. Configure your database in the `.env` file:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=blog_platform
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

5. Database migration and seeding:

```bash
php artisan migrate
php artisan db:seed
```

### Commands to Run the Project Locally

1. Start the development server:

```bash
php artisan serve
```

2. To run the queue worker:

```bash
php artisan queue:work
```

3. For development with hot reloading:

```bash
composer run dev
```

### Commands to Run Tests

1. Run all tests:

```bash
php artisan test
```

2. Run specific test suites:

```bash
# Run feature tests only
php artisan test --testsuite=Feature

# Run specific test file
php artisan test tests/Feature/Post/CreatePostTest.php
```

### Common Troubleshooting

1. **JWT Secret Key Error**: If you encounter JWT errors, run:

```bash
php artisan jwt:secret
```

2. **Permission Issues**: Ensure storage and bootstrap/cache directories are writable:

```bash
chmod -R 775 storage bootstrap/cache
```

3. **Composer Autoloader**: If you encounter class not found errors:

```bash
composer dump-autoload
```

4. **Cache Clearing**: If configuration changes don't reflect:

```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
```

# Rawmart Blog Frontend

![](C:\laragon\www\blog-system\images\Home Page.png)

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

## User Interface

![](C:\laragon\www\blog-system\images\Register With Validation.png)

![](C:\laragon\www\blog-system\images\Login With Validation.png)

![](C:\laragon\www\blog-system\images\login with cred.png)



![](C:\laragon\www\blog-system\images\Post list.png)

![](C:\laragon\www\blog-system\images\post list with auth.png)

![](C:\laragon\www\blog-system\images\post info with auth.png)

![](C:\laragon\www\blog-system\images\post list without auth.png)

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
