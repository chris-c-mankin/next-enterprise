import { useMutation } from "@tanstack/react-query"

export function useMutationaResetPrepTask() {
  return useMutation({
    mutationFn: async (prepTaskId: string) => {
      const result = await fetch(`/api/prep-tasks/${prepTaskId}/reset`, {
        method: "POST",
      })
      return result.json()
    },
  })
}
