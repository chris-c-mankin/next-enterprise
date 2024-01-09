import { useMutation } from "@tanstack/react-query"

export function useMutationSpawPrepTask() {
  return useMutation({
    mutationFn: async ({ boardId, prepItemId }: { boardId: string; prepItemId: string }) => {
      const result = await fetch(`/api/boards/${boardId}/prep-items/${prepItemId}/spawn-prep-task`, {
        method: "POST",
      })
      return result.json()
    },
  })
}
