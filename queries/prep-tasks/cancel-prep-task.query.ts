import { useMutation, useQueryClient } from "@tanstack/react-query"
import { QueryKeys } from "../query-keys"

export function useMutationaCancelPrepTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (prepTaskId: string) => {
      const result = await fetch(`/api/prep-tasks/${prepTaskId}/cancel`, {
        method: "POST",
      })
      return result.json()
    },
    onSuccess(_, prepTaskId) {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PREP_TASKS, prepTaskId],
      })
    },
  })
}
