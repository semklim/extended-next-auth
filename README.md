# Next.js Authentication with Custom Token Handling

This project demonstrates how to extend NextAuth.js to handle access and refresh tokens from back-end in a Next.js application.

## Type Declarations for NextAuth.js

First, we extend NextAuth's default types to include our custom properties in `src/types/next-auth.d.ts`.

## NextAuth Configuration

### 1. Session Handling

In `authConfig.ts`, we configure NextAuth to use JWT strategy and handle custom tokens:

### 2. Token Refresh Implementation

The `refreshAccessToken` function handles token refresh when the access token expires:


## Key Features

1. **Automatic Token Refresh**
   - Access tokens automatically refresh in the background
   - Refresh happens during any authenticated request when token is expired
   - Uses NextAuth.js JWT callback for seamless integration

2. **Type Safety**
   - Full TypeScript support with custom type declarations
   - Extended NextAuth.js types for custom properties
   - Type-safe session and token handling

3. **Session Integration**
   - Custom tokens available in both client and server components
   - Seamless integration with Next.js App Router
   - Built-in error handling for failed refreshes


## Prerequisites

- Node.js 18.18.0 or later
- npm 9.x or later

## Environment Setup

1. Clone the repository:
```bash
git clone https://github.com/semklim/next-auth.git
cd next-auth
```

2. Install dependencies:
```bash
npm install --force
```

3. Create a `.env` file in the root directory based on `.env.example`:
```bash
cp .env.example .env
```

4. Generate a secure AUTH_SECRET for NextAuth:
```bash
openssl rand -base64 32
```

5. Update the `.env` file with your generated secret and other required variables:
```
NEXT_PUBLIC_APP_URL=http://localhost:3001
HOST_NAMES=localhost

# AuthJS
NEXTAUTH_URL="http://localhost:3001" # When deploying to production, set this to your production URL (AuthJS will use this to dynamically generate redirect URLs)
AUTH_SECRET="your-auth-secret" # Generate a random secret: openssl rand -base64 32
```

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3001](http://localhost:3001).

### Authentication

The application uses NextAuth for authentication. Default credentials for development:

- Email: admin@example.com
- Password: password123

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run build-stats` - Build with bundle analysis
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check for code issues
- `npm run lint:fix` - Run ESLint and automatically fix issues

## Project Structure

```
admin-panel/
├── public/           # Static assets
├── src/
│   ├── app/          # Next.js app router pages
│   ├── components/   # Reusable UI components
│   ├── libs/         # Utility libraries and configurations
│   ├── styles/       # Global styles
│   └── validation/   # Form validation schemas
├── .env.example      # Example environment variables
└── README.md         # Project documentation
```

## Technologies

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- NextAuth.js for authentication (with custom token handling)
- Zod for form validation
- React Hook Form
- Shadcn UI components