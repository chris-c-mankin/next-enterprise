import { NextApiRequest } from "next"
import { getLoggedInUser, spawnPrepTask } from "../../../../../../../mocks/mocks.api"

export async function POST(_: NextApiRequest, { params }: { params: { boardId: string; prepItemId: string } }) {
  const loggedInUser = await getLoggedInUser()
  const boardId = params.boardId
  const prepItemId = params.prepItemId
  if (!boardId || typeof boardId !== "string") {
    throw new Error("Invalid boardId")
  }
  if (!prepItemId || typeof prepItemId !== "string") {
    throw new Error("Invalid prepItemId")
  }
  const task = await spawnPrepTask(boardId, prepItemId, loggedInUser.id)
  return Response.json({ data: task })
}
