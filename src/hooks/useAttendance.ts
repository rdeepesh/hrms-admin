import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { attendanceApi } from "../api/attendance.api"
import type {
  AttendancePayload,
  AttendanceRecord,
} from "../types/attendance"

export function useAttendance() {
  return useQuery<AttendanceRecord[]>({
    queryKey: ["attendance"],
    queryFn: attendanceApi.getAll,
  })
}

export function useMarkAttendance() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (data: AttendancePayload) =>
      attendanceApi.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["attendance"] })
    },
  })
}
