import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  useCreateEmployee,
  useUpdateEmployee,
  useEmployees,
} from "../hooks/useEmployees"
import {
  DEPARTMENTS,
  type EmployeePayload,
} from "../types/employee"

export default function EmployeeForm() {
  const { id } = useParams()
  const navigate = useNavigate()

  const editing = Boolean(id)

  const { data: employees } = useEmployees()
  const createMutation = useCreateEmployee()
  const updateMutation = useUpdateEmployee()

  const editingEmployee =
    editing && id ? employees?.find((e) => e._id === id) : undefined

  const [draft, setDraft] = useState<Partial<EmployeePayload>>({})

  const form: EmployeePayload = {
    employeeCode:
      draft.employeeCode ?? editingEmployee?.employeeCode ?? "",
    fullName: draft.fullName ?? editingEmployee?.fullName ?? "",
    email: draft.email ?? editingEmployee?.email ?? "",
    department:
      draft.department ??
      editingEmployee?.department ??
      "Engineering",
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setDraft((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editing && id) {
        await updateMutation.mutateAsync({
          id,
          data: form,
        })
      } else {
        await createMutation.mutateAsync(form)
      }

      navigate("/employees")
    } catch (err) {
      console.error(err)
    }
  }

  const loading =
    createMutation.isPending || updateMutation.isPending

  return (
    <div className="max-w-4xl mx-auto card p-8 space-y-6 rounded-2xl">
      <h1 className="text-4xl font-bold text-white tracking-tight">
        {editing ? "Edit Employee" : "Add Employee"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="employeeCode"
          value={form.employeeCode}
          onChange={handleChange}
          placeholder="EMP001"
          className="input h-12 px-4"
          required
        />

        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="input h-12 px-4"
          required
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="input h-12 px-4"
          type="email"
          required
        />

        <select
          name="department"
          value={form.department}
          onChange={handleChange}
          className="input h-12 px-4 pr-10"
          required
        >
          {DEPARTMENTS.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>

        <div className="flex gap-4 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary h-12 flex-1"
          >
            {loading
              ? "Saving..."
              : editing
              ? "Update"
              : "Create"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/employees")}
            className="btn-secondary h-12 flex-1"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
