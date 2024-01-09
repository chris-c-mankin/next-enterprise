import { NextApiRequest } from "next"
import { getPrepBoardById } from "../../../../mocks/mocks.api"

export async function GET(request: NextApiRequest) {
  const boardId = request.query.boardId
  if (!boardId || typeof boardId !== "string") {
    throw new Error("Invalid boardId")
  }
  const result = await getPrepBoardById(boardId)
  return Response.json({ data: result })
}
