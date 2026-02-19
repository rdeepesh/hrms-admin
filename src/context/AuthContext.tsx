import {
  useMemo,
  useState,
  type ReactNode,
} from "react"
import type { AdminUser } from "../types/auth"
import {
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  AuthContext,
  type AuthContextValue,
  type LoginCredentials,
} from "./auth-context"

const SESSION_KEY = "admin_session"
const USER_KEY = "auth_user"

function getStoredUser(): AdminUser | null {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as AdminUser
  } catch {
    localStorage.removeItem(USER_KEY)
    return null
  }
}

export function AuthProvider({
  children,
}: {
  children: ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] =
    useState<boolean>(() => localStorage.getItem(SESSION_KEY) === "true")
  const [user, setUser] = useState<AdminUser | null>(
    getStoredUser
  )

  const login = async (credentials: LoginCredentials) => {
    if (
      credentials.email !== ADMIN_EMAIL ||
      credentials.password !== ADMIN_PASSWORD
    ) {
      throw new Error("Invalid credentials")
    }

    const nextUser: AdminUser = { email: credentials.email }

    localStorage.setItem(SESSION_KEY, "true")
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser))

    setIsAuthenticated(true)
    setUser(nextUser)
  }

  const logout = () => {
    localStorage.removeItem(SESSION_KEY)
    localStorage.removeItem(USER_KEY)
    setIsAuthenticated(false)
    setUser(null)
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated,
      login,
      logout,
    }),
    [user, isAuthenticated]
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
