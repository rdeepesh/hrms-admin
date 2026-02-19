import { Menu, User, LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/auth-context"

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate("/login", { replace: true })
  }

  return (
    <header className="h-16 bg-black border-b border-zinc-800 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex md:hidden items-center justify-center w-9 h-9 rounded-lg border border-zinc-700 text-zinc-200 hover:bg-zinc-900 transition"
          aria-label="Open sidebar"
        >
          <Menu size={16} />
        </button>
        <h2 className="text-lg font-semibold text-white">Dashboard</h2>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center shrink-0">
            <User size={16} className="text-white" />
          </div>
          <span className="hidden sm:inline text-sm text-zinc-300 truncate max-w-36">
            {user?.email || "Admin"}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border border-zinc-700 text-zinc-200 hover:bg-zinc-900 transition"
        >
          <LogOut size={14} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  )
}
