import { useMutation, useQueryClient } from "@tanstack/react-query"
import { PrepTaskDto } from "../../mocks/mocks.interfaces"
import { QueryKeys } from "../query-keys"

export function useMutationAssignPrepTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ prepTaskId, assignedToId }: { prepTaskId: string; assignedToId: string }) => {
      const result = await fetch(`/api/prep-tasks/${prepTaskId}/assign`, {
        method: "POST",
        body: JSON.stringify({ assignedToId }),
      })
      return (await result.json()) as PrepTaskDto
    },
    onSuccess(_, { prepTaskId }) {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PREP_TASKS, prepTaskId],
      })
    },
  })
}
