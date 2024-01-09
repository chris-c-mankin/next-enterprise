import { useMutation } from "@tanstack/react-query"

export function useMutationaCancelPrepTask() {
  return useMutation({
    mutationFn: async (prepTaskId: string) => {
      const result = await fetch(`/api/prep-tasks/${prepTaskId}/cancel`, {
        method: "POST",
      })
      return result.json()
    },
  })
}
