# Todo App Frontend

This is the frontend implementation for the Todo application, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- User authentication (registration and login)
- Todo management (create, read, update, delete)
- Responsive design for desktop, tablet, and mobile
- Secure API communication with JWT tokens
- Loading and error states
- Accessibility features

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- React Context API for state management
- clsx for conditional classnames

## Getting Started

### Prerequisites

- Node.js 18+
- Backend API running (FastAPI server)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your-secret-key
```

3. Run the development server:
```bash
npm run dev
```

The application will be available at http://localhost:3000

## Project Structure

```
frontend/
├── app/                 # Next.js App Router pages
│   ├── (auth)/         # Authentication pages
│   ├── (dashboard)/    # Dashboard pages
│   └── globals.css     # Global styles
├── components/         # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── todos/          # Todo management components
│   └── ui/             # Base UI components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and API client
├── types/              # TypeScript type definitions
└── public/             # Static assets
```

## Environment Variables

- `NEXT_PUBLIC_API_BASE_URL`: Backend API URL
- `NEXT_PUBLIC_BETTER_AUTH_URL`: Authentication service URL
- `BETTER_AUTH_SECRET`: Secret key for authentication

## API Integration

The frontend communicates with the backend through the centralized API client in `lib/api.ts`, which automatically attaches JWT tokens to requests.

## Security

- JWT tokens are stored in localStorage
- All API requests include authentication headers
- Protected routes are wrapped with authentication checks
- Input validation is performed on forms

## Responsive Design

The application uses Tailwind CSS utility classes to provide a responsive layout that works on all device sizes.