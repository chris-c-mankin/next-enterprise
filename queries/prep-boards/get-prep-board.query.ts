import { useQuery } from "@tanstack/react-query"
import { QueryKeys } from "../query-keys"

export function useQueryGetPrepBoard(boardId: string) {
  return useQuery({
    queryKey: [QueryKeys.PREP_BOARDS],
    queryFn: async () => {
      const result = await fetch(`/api/prep-boards/${boardId}`)
      return result.json()
    },
  })
}
