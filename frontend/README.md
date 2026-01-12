# Todo App Frontend

This is the frontend for the Todo App Phase II, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- User authentication (signup/login)
- Task management (create, read, update, delete)
- Task completion toggling
- Responsive design
- JWT-based authentication
- Secure API communication

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Better Auth (for authentication)
- React

## Getting Started

### Option 1: Using Docker (Recommended for WSL/Linux environments)

Due to file system permission issues in WSL environments (as evidenced by TAR_ENTRY_ERROR warnings during npm install), Docker is the recommended approach. These errors occur because of interoperability issues between Windows and Linux file systems in WSL:

- ENOENT (no such file or directory) errors when accessing files in node_modules
- TAR_ENTRY_ERROR when extracting package files
- Permission denied (EACCES) errors when modifying files

Docker solves these issues by running the application in a consistent Linux environment with proper file system support.

1. Use the convenience script:
```bash
# On Linux/Mac:
./run-dev.sh

# On Windows:
run-dev.bat

# Or run manually:
docker-compose up --build
```

2. The application will be available at [http://localhost:3000](http://localhost:3000)

3. To stop the container:
```bash
docker-compose down
```

4. To run in detached mode (background):
```bash
# Using the script:
./run-dev.sh -d

# Or manually:
docker-compose up --build -d
```

### Option 2: Using Docker (Alternative)

If you prefer a one-time build approach:
```bash
# Build the image
docker build -t todo-frontend .

# Run the container
docker run -p 3000:3000 -v $(pwd):/app -it todo-frontend
```

### Option 3: Direct Installation (For native macOS/Windows environments)

Note: This approach may not work properly in WSL due to file permission issues with node_modules.

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
# Update the values in .env.local as needed
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Environment Variables

- `NEXT_PUBLIC_API_BASE_URL`: The base URL for the backend API
- `NEXT_PUBLIC_BETTER_AUTH_URL`: The URL for Better Auth
- `BETTER_AUTH_SECRET`: The secret key for Better Auth

## Project Structure

```
frontend/
├── app/                 # Next.js App Router pages
│   ├── (auth)/          # Authentication pages (signup, login)
│   ├── tasks/           # Task management pages
│   └── layout.tsx       # Root layout with navigation
├── components/          # Reusable React components
├── lib/                 # Utility functions and API client
├── types/               # TypeScript type definitions
├── public/              # Static assets
└── styles/              # Global styles
```

## API Integration

The application uses a centralized API client at `lib/api.ts` that handles:
- JWT token management
- Request/response handling
- Error handling
- Automatic token attachment to requests

## Authentication

Authentication is handled through the AuthProvider component which:
- Manages user state
- Handles login/logout
- Stores tokens in localStorage
- Provides authentication context to the app