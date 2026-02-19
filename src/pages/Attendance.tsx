import { useMemo, useRef, useState } from "react"
import { format } from "date-fns"
import toast from "react-hot-toast"
import {
  CalendarCheck,
  CalendarDays,
  UserRound,
  ShieldCheck,
  Loader2,
} from "lucide-react"
import { useEmployees } from "../hooks/useEmployees"
import {
  useAttendance,
  useMarkAttendance,
} from "../hooks/useAttendance"
import {
  ATTENDANCE_STATUS,
  type AttendancePayload,
  type AttendanceRecord,
  type AttendanceStatus,
} from "../types/attendance"
import type { Employee } from "../types/employee"

function getEmployeeLabel(
  record: AttendanceRecord,
  employees: Employee[]
): string {
  const employeeRef = record.employeeId ?? record.employee

  if (typeof employeeRef === "object" && employeeRef) {
    return (
      employeeRef.fullName ||
      employeeRef.employeeCode ||
      "Unknown"
    )
  }

  const match = employees.find((e) => e._id === employeeRef)
  return match?.fullName || "Unknown"
}

function formatStatus(status: AttendanceStatus): string {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

export default function Attendance() {
  const { data: employeesData, isLoading: employeesLoading } =
    useEmployees()
  const {
    data: attendanceData,
    isLoading: attendanceLoading,
    isError,
  } = useAttendance()
  const markMutation = useMarkAttendance()

  const employees: Employee[] = employeesData ?? []

  const today = new Date().toISOString().split("T")[0]
  const dateInputRef = useRef<HTMLInputElement | null>(null)

  const [form, setForm] = useState<AttendancePayload>({
    employeeId: "",
    date: "",
    status: "present",
  })

  const sortedRecords = useMemo(
    () =>
      [...(attendanceData ?? [])].sort(
        (a, b) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
      ),
    [attendanceData]
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await markMutation.mutateAsync(form)
      toast.success("Attendance marked")
      setForm({
        employeeId: "",
        date: "",
        status: "present",
      })
    } catch {
      toast.error("Failed to mark attendance")
    }
  }

  if (employeesLoading || attendanceLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-white" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="card p-6 text-zinc-300">
        Failed to load attendance records
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Attendance Management
        </h1>
      </div>

      <div className="card p-6 border border-zinc-800 rounded-2xl">
        <h2 className="text-lg font-semibold text-white mb-4">
          Mark Attendance
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid gap-4 md:grid-cols-3"
        >
          <div className="relative">
            <UserRound
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            />
            <select
              value={form.employeeId}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  employeeId: e.target.value,
                }))
              }
              className="input h-11 pl-10"
              required
            >
              <option value="" disabled>
                Select Employee
              </option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.fullName} ({emp.employeeCode})
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <CalendarDays
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            />
            <input
              ref={dateInputRef}
              type="date"
              value={form.date}
              max={today}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  date: e.target.value,
                }))
              }
              className="input h-11 pl-10"
              required
              onClick={() => dateInputRef.current?.showPicker?.()}
            />
          </div>

          <div className="relative">
            <ShieldCheck
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            />
            <select
              value={form.status}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  status: e.target.value as AttendanceStatus,
                }))
              }
              className="input h-11 pl-10"
              required
            >
              {ATTENDANCE_STATUS.map((status) => (
                <option key={status} value={status}>
                  {formatStatus(status)}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <button
              type="submit"
              disabled={markMutation.isPending}
              className="btn-primary inline-flex h-10 items-center gap-2 px-6"
            >
              <CalendarCheck size={16} />
              {markMutation.isPending
                ? "Saving..."
                : "Mark Attendance"}
            </button>
          </div>
        </form>
      </div>

      <div className="card overflow-hidden rounded-2xl border border-zinc-800">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900 text-zinc-100">
            <tr>
              <th className="p-4 text-left font-semibold">Employee</th>
              <th className="p-4 text-left font-semibold">Date</th>
              <th className="p-4 text-left font-semibold">Status</th>
            </tr>
          </thead>

          <tbody>
            {sortedRecords.map((record) => (
              <tr
                key={record._id}
                className="border-t border-zinc-800 text-zinc-200"
              >
                <td className="p-4">
                  {getEmployeeLabel(record, employees)}
                </td>
                <td className="p-4">
                  {format(new Date(record.date), "dd MMM yyyy")}
                </td>
                <td className="p-4">
                  <span
                    className={
                      record.status === "present"
                        ? "text-white"
                        : "text-zinc-400"
                    }
                  >
                    {formatStatus(record.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {sortedRecords.length === 0 && (
          <div className="p-10 text-center text-zinc-500">
            No attendance records found
          </div>
        )}
      </div>
    </div>
  )
}
