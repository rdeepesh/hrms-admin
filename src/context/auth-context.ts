import { createContext, useContext } from "react"
import type { AdminUser } from "../types/auth"

export const ADMIN_EMAIL = "admin@hrms.com"
export const ADMIN_PASSWORD = "admin@hrms"

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthContextValue {
  user: AdminUser | null
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
}

export const AuthContext =
  createContext<AuthContextValue | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }

  return context
}
