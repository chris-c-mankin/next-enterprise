import { useQuery } from "@tanstack/react-query"
import { PrepBoardDto } from "../../mocks/mocks.interfaces"
import { QueryKeys } from "../query-keys"

export function useQueryGetPrepBoard(boardId: string) {
  return useQuery({
    queryKey: [QueryKeys.PREP_BOARDS],
    queryFn: async () => {
      const result = await fetch(`/api/prep-boards/${boardId}`)
      return await result.json() as PrepBoardDto
    },
  })
}
