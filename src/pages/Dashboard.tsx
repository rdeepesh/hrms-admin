import { CalendarCheck, Users } from "lucide-react"
import { useEmployees } from "../hooks/useEmployees"
import { useAttendance } from "../hooks/useAttendance"

export default function Dashboard() {
  const { data: employees, isLoading: employeesLoading } =
    useEmployees()
  const { data: attendance, isLoading: attendanceLoading } =
    useAttendance()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>

      <div className="card p-6">
        <div className="flex items-center justify-between">
          <p className="text-zinc-400 text-sm">Total Employees</p>
          <Users size={18} className="text-white" />
        </div>

        <p className="text-3xl font-bold text-white mt-2">
          {employeesLoading ? "..." : employees?.length ?? 0}
        </p>
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between">
          <p className="text-zinc-400 text-sm">Total Attendance</p>
          <CalendarCheck size={18} className="text-white" />
        </div>

        <p className="text-3xl font-bold text-white mt-2">
          {attendanceLoading ? "..." : attendance?.length ?? 0}
        </p>
      </div>
    </div>
  )
}
