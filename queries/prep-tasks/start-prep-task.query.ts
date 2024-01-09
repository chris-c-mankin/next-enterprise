import { useMutation } from "@tanstack/react-query"

export function useMutationStartPrepTask() {
  return useMutation({
    mutationFn: async (prepTaskId: string) => {
      const result = await fetch(`/api/prep-tasks/${prepTaskId}/start`, {
        method: "POST",
      })
      return result.json()
    },
  })
}
