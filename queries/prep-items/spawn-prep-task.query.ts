import { useMutation } from "@tanstack/react-query"
import { PrepTaskDto } from "../../mocks/mocks.interfaces";

export function useMutationSpawnPrepTask() {
  return useMutation({
    mutationFn: async ({ boardId, prepItemId }: { boardId: string; prepItemId: string }) => {
      const result = await fetch(`/api/prep-boards/${boardId}/prep-items/${prepItemId}/spawn-prep-task`, {
        method: "POST",
      })
      return await result.json() as PrepTaskDto
    },
  })
}
