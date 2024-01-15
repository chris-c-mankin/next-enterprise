import { useQuery } from "@tanstack/react-query"
import { PrepBoardDto } from "../../mocks/mocks.interfaces"
import { QueryKeys } from "../query-keys"

export function useQueryListPrepBoards() {
  return useQuery<{ items: PrepBoardDto[]}>({
    queryKey: [QueryKeys.PREP_BOARDS],
    queryFn: async () => {
      const result = await fetch("/api/prep-boards")
      return await result.json() as { items: PrepBoardDto[]}
    },
  })
}
