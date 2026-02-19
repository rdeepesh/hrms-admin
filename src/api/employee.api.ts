import { api } from "./client"
import type { Employee, EmployeePayload } from "../types/employee"

export const employeeApi = {
  async getAll(): Promise<Employee[]> {
    const res = await api.get("/employees")
    return res.data
  },

  async create(data: EmployeePayload): Promise<Employee> {
    const res = await api.post("/employees", data)
    return res.data
  },

  async update(id: Employee["_id"], data: EmployeePayload): Promise<Employee> {
    const res = await api.put(`/employees/${id}`, data)
    return res.data
  },

  async delete(id: Employee["_id"]): Promise<void> {
    await api.delete(`/employees/${id}`)
  },
}
