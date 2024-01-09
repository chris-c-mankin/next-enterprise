import { useMutation } from "@tanstack/react-query"

export function useMutationaCompletePrepTask() {
  return useMutation({
    mutationFn: async (prepTaskId: string) => {
      const result = await fetch(`/api/prep-tasks/${prepTaskId}/complete`, {
        method: "POST",
      })
      return result.json()
    },
  })
}
