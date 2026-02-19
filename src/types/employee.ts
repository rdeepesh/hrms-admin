export const DEPARTMENTS = [
  "Engineering",
  "Human Resources",
  "Finance",
  "Marketing",
  "Sales",
  "Operations",
] as const

export type Department = (typeof DEPARTMENTS)[number]

export interface Employee {
  _id: string
  employeeCode: string
  fullName: string
  email: string
  department: Department
  createdAt?: string
  updatedAt?: string
}

export type EmployeePayload = Pick<
  Employee,
  "employeeCode" | "fullName" | "email" | "department"
>
