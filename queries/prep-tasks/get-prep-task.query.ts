import { useQuery, useQueryClient } from "@tanstack/react-query"
import { PrepBoardDto, PrepTaskDto } from "../../mocks/mocks.interfaces"
import { QueryKeys } from "../query-keys"

export function useQueryGetPrepTask(prepBoardId: string, prepTaskId?: string) {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: [QueryKeys.PREP_TASKS, prepTaskId],
    queryFn: async () => {
      const response = await fetch(`/api/prep-tasks/${prepTaskId}`)
      return (await response.json()) as PrepTaskDto
    },
    enabled: !!prepTaskId,
    initialData: queryClient
      .getQueryData<PrepBoardDto>([QueryKeys.PREP_BOARDS, prepBoardId])
      ?.prepTasks.find((x) => x.id === prepTaskId),
  })
}
