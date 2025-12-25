# Blog Platform API

<img src="https://github.com/AbdallahMahmoud443/RawMart-blog-Technical-Assessment-/blob/main/images/6903464216718ad4aeb631.webp?raw=true">

## Project Idea

Blog Platform API is a robust backend system designed to provide a scalable foundation for blog applications. This RESTful API solves the problem of content management by offering comprehensive functionality for creating, managing, and organizing blog posts with tags and comments.

The main goals of this project are:

-   Deliver a clean, maintainable API architecture that can handle high traffic
-   Provide secure authentication and authorization for users
-   Enable efficient content management with proper relationships between posts, tags, and comments
-   Implement a scalable architecture that can be extended with additional features

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

-   **Repository Pattern**: Used for data access abstraction (implemented through Eloquent)
-   **DTO (Data Transfer Object)**: Request classes validate and transform incoming data
-   **Policy Pattern**: Authorization logic is encapsulated in Policy classes
-   **Factory Pattern**: Used for creating test data and complex objects
-   **Resource Pattern**: API responses are transformed using Resource classes

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

-   **Laravel 12**: Modern PHP framework with expressive syntax and powerful features
-   **PHP 8.2+**: Latest PHP version with improved performance and features

### Authentication

-   **JWT Authentication**: Stateless authentication using tymon/jwt-auth
-   **Policies**: Fine-grained authorization through Laravel's Policy system

### Database

-   **MySQL**: Primary relational database
-   **Eloquent ORM**: Laravel's powerful ActiveRecord implementation
-   **Migrations**: Version-controlled database schema management

### Cache & Queue

-   **Redis**: High-performance caching and queue backend
-   **Predis**: PHP Redis client

### Testing

-   **PHPUnit**: Feature and unit testing framework
-   **Factories**: Test data generation
-   **Feature Tests**: End-to-end API testing

### DevOps / Tools

-   **Composer**: PHP dependency management
-   **Laravel Pint**: Code style fixing
-   **Dedoc Scramble**: Automatic API documentation generation

## API Endpoints

The API is organized into versioned endpoints following RESTful conventions. All API endpoints are prefixed with `/api/v1`.

<img src="https://github.com/AbdallahMahmoud443/RawMart-blog-Technical-Assessment-/blob/main/images/API_Docs.png?raw=true"/>

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

-   PHP 8.2 or higher
-   Composer
-   MySQL
-   Redis
-   Node.js and NPM (for asset compilation)

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

2. To run the redis queue worker:

```bash
php artisan queue:work redis
```

3. To run the schedule:

```bash
php artisan schedule:work
```

4. For development with hot reloading:

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
<img src="https://github.com/AbdallahMahmoud443/RawMart-blog-Technical-Assessment-/blob/main/images/testing.PNG?raw=true"/>
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
