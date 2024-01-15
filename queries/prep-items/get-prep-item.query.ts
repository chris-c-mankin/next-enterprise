import { useQuery, useQueryClient } from "@tanstack/react-query"
import { PrepBoardDto, PrepItemDto } from "../../mocks/mocks.interfaces"
import { QueryKeys } from "../query-keys"

export function useQueryGetPrepItem(prepBoardId: string, prepItemId: string) {
  const queryClient = useQueryClient()

  return useQuery<PrepItemDto>({
    queryKey: [QueryKeys.PREP_ITEMS, prepItemId],
    queryFn: async () => {
      const response = await fetch(`/api/prep-boards/${prepBoardId}/prep-items/${prepItemId}`)
      return (await response.json()) as PrepItemDto
    },
    initialData: queryClient
      .getQueryData<PrepBoardDto>([QueryKeys.PREP_BOARDS, prepBoardId])
      ?.prepItems.find((x) => x.id === prepItemId),
  })
}
