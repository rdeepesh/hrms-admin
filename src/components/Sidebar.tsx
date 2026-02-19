import { NavLink } from "react-router-dom"
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  X,
} from "lucide-react"

interface SidebarItem {
  name: string
  path: string
  icon: React.ElementType
}

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const menu: SidebarItem[] = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Employees", path: "/employees", icon: Users },
  { name: "Attendance", path: "/attendance", icon: CalendarCheck },
]

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen w-64 bg-black border-r border-zinc-800 transform transition-transform duration-200 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <div className="h-16 flex items-center justify-between px-4 md:px-6 border-b border-zinc-800">
        <h1 className="text-lg font-bold text-white">HRMS Admin</h1>
        <button
          type="button"
          onClick={onClose}
          className="md:hidden inline-flex items-center justify-center w-8 h-8 rounded-lg border border-zinc-700 text-zinc-200 hover:bg-zinc-900 transition"
          aria-label="Close sidebar"
        >
          <X size={16} />
        </button>
      </div>

      <nav className="p-4 space-y-1">
        {menu.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
                ${
                  isActive
                    ? "bg-white text-black"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {item.name}
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}
