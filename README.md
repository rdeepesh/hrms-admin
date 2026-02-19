# HRMS Frontend

A modern HRMS admin frontend built with React, TypeScript, and Vite. This app provides authenticated admin access to manage employees and attendance records through a REST API.

## Project Overview

This frontend is designed for HR/admin workflows and includes:

- Admin login with protected routes
- Dashboard with employee and attendance summary counts
- Employee management (list, add, edit, delete)
- Attendance management (mark attendance and view history)
- API-driven data fetching with caching and automatic refresh

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router DOM
- TanStack React Query
- Axios
- Tailwind CSS v4
- Lucide React (icons)
- React Hot Toast
- date-fns

## Project Setup

### Prerequisites

- Node.js 18+ (recommended: latest LTS)
- npm
- Running backend API (default expected: `http://localhost:8000/api`)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
VITE_API_URL=http://localhost:8000/api
```

### Run Development Server

```bash
npm run dev
```

App runs on Vite default URL (typically `http://localhost:5173`).

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Demo Admin Credentials

Current demo credentials used in the app:

- Email: `admin@hrms.com`
- Password: `admin@hrms`

These are currently hardcoded in `src/context/auth-context.ts` and are intended for assessment/demo use.

## Main Routes

- `/login` - Admin login page
- `/` - Dashboard
- `/employees` - Employee list
- `/employees/add` - Add employee
- `/attendance` - Attendance management

## API Expectations

The frontend expects these backend endpoints:

- `GET /employees`
- `POST /employees`
- `DELETE /employees/:id`
- `GET /attendance`
- `POST /attendance`

Base URL is controlled through `VITE_API_URL`.

## Project Structure

```text
src/
  api/          # Axios client and API modules
  components/   # Layout, UI, and route guard components
  context/      # Authentication context
  hooks/        # React Query hooks
  pages/        # Route pages (Dashboard, Employees, Attendance, Login)
  types/        # TypeScript models
```

## Notes

- Authentication is client-side for demo/assessment scope.
- API requests use `withCredentials: true` in Axios client configuration.
