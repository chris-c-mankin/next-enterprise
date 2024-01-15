import { NextApiRequest } from "next"
import { getPrepBoardById } from "../../../../mocks/mocks.api"

export async function GET(_: NextApiRequest, { params }: { params: { boardId: string } }) {
  const boardId = params.boardId
  if (!boardId || typeof boardId !== "string") {
    throw new Error("Invalid boardId")
  }
  const result = await getPrepBoardById(boardId)
  return Response.json(result)
}
