import { api } from "./client"
import type {
  AttendancePayload,
  AttendanceRecord,
} from "../types/attendance"

function unwrapArrayResponse<T>(data: unknown): T[] {
  if (Array.isArray(data)) return data as T[]

  const payload = data as { data?: unknown } | undefined
  if (Array.isArray(payload?.data)) return payload.data as T[]

  return []
}

function unwrapObjectResponse<T>(data: unknown): T {
  if (data && typeof data === "object" && "data" in (data as object)) {
    const payload = data as { data?: T }
    if (payload.data) return payload.data
  }

  return data as T
}

export const attendanceApi = {
  async getAll(): Promise<AttendanceRecord[]> {
    const res = await api.get("/attendance")
    return unwrapArrayResponse<AttendanceRecord>(res.data)
  },

  async create(data: AttendancePayload): Promise<AttendanceRecord> {
    const res = await api.post("/attendance", data)
    return unwrapObjectResponse<AttendanceRecord>(res.data)
  },
}
