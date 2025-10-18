# Chakshi Backend

## Overview

Chakshi Backend is a Node.js + TypeScript backend service designed for a legal platform that serves advocates, students, and administrators. The system provides comprehensive APIs for user management, case handling, document uploads, payment processing, and educational content delivery. Built with Express.js, it integrates with Supabase for authentication and storage, uses Prisma ORM with PostgreSQL for data persistence, and includes Razorpay for payment processing.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Core Framework & Language
- **Node.js with TypeScript**: Chosen for type safety, better developer experience, and robust error handling. TypeScript provides compile-time type checking and improved IDE support.
- **Express.js**: Selected as the web framework for its maturity, extensive middleware ecosystem, and flexibility in building RESTful APIs.

### Database Layer
- **Prisma ORM**: Implements type-safe database access with auto-generated TypeScript types. Provides migration management and query building capabilities.
- **PostgreSQL**: Primary database for structured data storage, chosen for ACID compliance and complex query support.
- **Database Models**: Supports User, Profile, Case, Document, Notification, Template, Course, Enrollment, and Payment entities with proper relationships.

### Authentication & Authorization
- **Supabase Auth Integration**: Uses Supabase for user authentication with JWT token verification. Implements role-based access control (ADMIN, ADVOCATE, STUDENT roles).
- **JWT Middleware**: Custom middleware verifies Supabase tokens and maps users to local database records for role enforcement.

### File Storage & Uploads
- **Supabase Storage**: Handles file uploads using signed URLs for secure, direct-to-storage uploads. Implements metadata tracking in the database.
- **Upload Flow**: Generates signed URLs for frontend uploads, then confirms successful uploads with metadata updates.

### API Design
- **RESTful Architecture**: Follows REST principles with proper HTTP methods and status codes.
- **Modular Route Structure**: Organized by feature modules (auth, dashboard, uploads) with separate controllers and route definitions.
- **OpenAPI Documentation**: Auto-generated API documentation using Swagger JSDoc annotations.

### Security Implementation
- **Helmet**: Adds security headers for protection against common vulnerabilities.
- **CORS Configuration**: Configurable cross-origin resource sharing for frontend integration.
- **Rate Limiting**: Implements request rate limiting to prevent abuse.
- **Input Validation**: Uses Joi schemas for request validation with detailed error responses.

### Error Handling & Logging
- **Centralized Error Handler**: Global error middleware catches and formats all errors consistently.
- **Winston Logging**: Structured logging with different levels and file/console outputs based on environment.
- **Async Handler Wrapper**: Wraps async route handlers to automatically catch and forward errors.

### Development & Testing
- **Jest Testing Framework**: Configured for unit and integration testing with TypeScript support.
- **ESLint & Prettier**: Code quality and formatting tools with TypeScript-specific rules.
- **Nodemon Development**: Auto-restart development server with TypeScript compilation via tsx.

## External Dependencies

### Authentication & Storage
- **Supabase**: Provides user authentication, JWT token management, and file storage services. Uses service role key for server-side operations and anon key for client operations.

### Payment Processing
- **Razorpay**: Integrated for payment order creation and webhook verification. Supports Indian payment methods and currency.

### Database
- **PostgreSQL**: External database service for data persistence. Configured through DATABASE_URL environment variable.

### Optional Services
- **Redis**: Configured for potential caching and session storage, though not actively used in current implementation.

### Development Tools
- **Docker Support**: Includes Dockerfile and docker-compose configurations for containerized development and production deployment.

### Environment Configuration
The system requires several environment variables for external service integration:
- Supabase URL and service keys
- Database connection string
- Razorpay API credentials
- JWT secrets for token signing
- CORS origin configuration