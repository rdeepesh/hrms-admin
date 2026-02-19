export const ATTENDANCE_STATUS = ["present", "absent"] as const

export type AttendanceStatus =
  (typeof ATTENDANCE_STATUS)[number]

export interface AttendanceRecord {
  _id: string
  employeeId:
    | string
    | {
        _id: string
        fullName?: string
        employeeCode?: string
      }
  employee?:
    | string
    | {
        _id: string
        fullName?: string
        employeeCode?: string
      }
  date: string
  status: AttendanceStatus
  createdAt?: string
  updatedAt?: string
}

export interface AttendancePayload {
  employeeId: string
  date: string
  status: AttendanceStatus
}
