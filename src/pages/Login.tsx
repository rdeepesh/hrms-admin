import { useState } from "react"
import {
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom"
import { ShieldCheck, Lock, Mail } from "lucide-react"
import toast from "react-hot-toast"
import {
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  useAuth,
} from "../context/auth-context"

interface LoginLocationState {
  from?: string
}

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isAuthenticated } = useAuth()

  const state = location.state as LoginLocationState | null
  const redirectPath = state?.from || "/"

  const [email, setEmail] = useState<string>(ADMIN_EMAIL)
  const [password, setPassword] = useState<string>(
    ADMIN_PASSWORD
  )
  const [loading, setLoading] = useState<boolean>(false)

  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login({ email, password })
      toast.success("Login successful")
      navigate(redirectPath, { replace: true })
    } catch {
      toast.error("Invalid admin credentials")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md card p-8 space-y-6 border border-zinc-800">
        <div className="space-y-2">
          <div className="w-11 h-11 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center">
            <ShieldCheck size={20} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-sm text-zinc-400">
            Sign in to access the HRMS admin portal.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input h-12 pl-12"
              placeholder="Email"
              required
            />
          </div>

          <div className="relative">
            <Lock
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input h-12 pl-12"
              placeholder="Password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full h-11"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-xs text-zinc-300 space-y-1">
          <p className="font-semibold text-zinc-200">Demo admin credentials</p>
          <p>Email: {ADMIN_EMAIL}</p>
          <p>Password: {ADMIN_PASSWORD}</p>
        </div>
      </div>
    </div>
  )
}
