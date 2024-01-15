import { NextApiRequest } from "next"
import { getPrepItemById } from "../../../../../../mocks/mocks.api"

export async function GET(_: NextApiRequest, { params }: { params: { boardId: string; prepItemId: string } }) {
  const boardId = params.boardId
  const prepItemId = params.prepItemId
  if (!boardId || typeof boardId !== "string") {
    throw new Error("Invalid boardId")
  }
  if (!prepItemId || typeof prepItemId !== "string") {
    throw new Error("Invalid prepItemId")
  }
  const result = await getPrepItemById(boardId, prepItemId)
  return Response.json(result)
}
