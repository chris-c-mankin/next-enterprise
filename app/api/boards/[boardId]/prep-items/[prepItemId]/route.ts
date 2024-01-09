import { NextApiRequest } from "next"
import { getPrepItemById } from "../../../../../../mocks/mocks.api"

export async function GET(request: NextApiRequest) {
  const boardId = request.query.boardId
  const prepItemId = request.query.prepItemId
  if (!boardId || typeof boardId !== "string") {
    throw new Error("Invalid boardId")
  }
  if (!prepItemId || typeof prepItemId !== "string") {
    throw new Error("Invalid prepItemId")
  }
  const result = await getPrepItemById(boardId, prepItemId)
  return Response.json({ data: result })
}
