import { NextApiRequest } from "next"
import { getLoggedInUser, spawnPrepTask } from "../../../../../../../mocks/mocks.api"

export async function POST(request: NextApiRequest) {
  const loggedInUser = await getLoggedInUser()
  const boardId = request.query.boardId
  const prepItemId = request.query.prepItemId
  if (!boardId || typeof boardId !== "string") {
    throw new Error("Invalid boardId")
  }
  if (!prepItemId || typeof prepItemId !== "string") {
    throw new Error("Invalid prepItemId")
  }
  const task = await spawnPrepTask(boardId, prepItemId, loggedInUser.id)
  return Response.json({ data: task })
}
