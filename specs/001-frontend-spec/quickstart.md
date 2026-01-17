# Frontend Quickstart Guide

## Prerequisites

- Node.js 18+ installed
- Access to backend API (FastAPI server running)
- Better Auth secret key

## Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Environment Configuration**:
   Create a `.env.local` file in the frontend directory with:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
   NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
   BETTER_AUTH_SECRET=your-secret-key
   ```

## Development

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

## Building for Production

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Start production server**:
   ```bash
   npm start
   ```

## Key Features

- **Authentication**: Login/registration with Better Auth
- **Todo Management**: Create, read, update, delete todos
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Security**: JWT token management and secure API communication