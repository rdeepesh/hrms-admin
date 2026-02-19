import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  useEmployees,
  useDeleteEmployee,
} from "../hooks/useEmployees"
import {
  Loader2,
  Plus,
  UserRound,
  Mail,
  Hash,
  Building2,
  Settings2,
  Trash2,
  Users,
} from "lucide-react"
import { ConfirmDialog } from "../components/UI"
import type { Employee } from "../types/employee"

export default function Employees() {
  const navigate = useNavigate()
  const { data, isLoading, isError } = useEmployees()
  const deleteMutation = useDeleteEmployee()

  const employees: Employee[] = data ?? []
  const [deleteId, setDeleteId] = useState<Employee["_id"] | null>(null)

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-white" />
      </div>
    )

  if (isError)
    return (
      <div className="card p-6 text-zinc-300">
        Failed to load employees
      </div>
    )

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Employees
        </h1>

        <button
          onClick={() => navigate("/employees/add")}
          className="btn-primary inline-flex h-10 items-center gap-2 px-6"
        >
          <Plus size={16} />
          Add
        </button>
      </div>

      <div className="card overflow-hidden rounded-2xl border border-zinc-800">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900 text-zinc-100">
            <tr>
              <th className="p-4 text-left font-semibold">
                <span className="inline-flex items-center gap-2">
                  <Hash size={15} className="text-zinc-400" />
                  Employee Code
                </span>
              </th>
              <th className="p-4 text-left font-semibold">
                <span className="inline-flex items-center gap-2">
                  <UserRound size={15} className="text-zinc-400" />
                  Full Name
                </span>
              </th>
              <th className="p-4 text-left font-semibold">
                <span className="inline-flex items-center gap-2">
                  <Mail size={15} className="text-zinc-400" />
                  Email
                </span>
              </th>
              <th className="p-4 text-left font-semibold">
                <span className="inline-flex items-center gap-2">
                  <Building2 size={15} className="text-zinc-400" />
                  Department
                </span>
              </th>
              <th className="p-4 text-right font-semibold">
                <span className="inline-flex items-center gap-2">
                  <Settings2 size={15} className="text-zinc-400" />
                  Actions
                </span>
              </th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp: Employee) => (
              <tr
                key={emp._id}
                className="border-t border-zinc-800 text-zinc-200 hover:bg-zinc-950/70 transition"
              >
                <td className="p-4">{emp.employeeCode}</td>
                <td className="p-4">{emp.fullName}</td>
                <td className="p-4">{emp.email}</td>
                <td className="p-4">{emp.department}</td>

                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setDeleteId(emp._id)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-100 px-3 py-1.5 text-black hover:bg-white transition"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {employees.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 p-14 text-center text-zinc-500">
            <Users size={30} className="text-zinc-600" />
            <p className="text-3xl font-semibold text-zinc-700">-</p>
            <p className="text-2xl text-zinc-500">No employees found</p>
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={deleteId !== null}
        title="Delete Employee"
        message="Are you sure you want to delete this employee?"
        loading={deleteMutation.isPending}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) {
            deleteMutation.mutate(deleteId, {
              onSuccess: () => setDeleteId(null),
            })
          }
        }}
      />
    </div>
  )
}
