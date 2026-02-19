import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import { employeeApi } from "../api/employee.api"
import type { Employee, EmployeePayload } from "../types/employee"

export function useEmployees() {
  return useQuery<Employee[]>({
    queryKey: ["employees"],
    queryFn: employeeApi.getAll,
  })
}

export function useCreateEmployee() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (data: EmployeePayload) =>
      employeeApi.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["employees"] })
    },
  })
}

export function useUpdateEmployee() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: Employee["_id"]
      data: EmployeePayload
    }) => employeeApi.update(id, data),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["employees"] })
    },
  })
}

export function useDeleteEmployee() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (id: Employee["_id"]) => employeeApi.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["employees"] })
    },
  })
}
