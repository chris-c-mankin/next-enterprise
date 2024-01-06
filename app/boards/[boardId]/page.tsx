import { revalidatePath } from "next/cache"
import { Board } from "../../../components/Board/Board"
import { assignPrepTask, cancelPrepTask, completePrepTask, getLoggedInUser, getPrepBoardById, getUsers, spawnPrepTask, startPrepTask, unstartPrepTask } from "../../../mocks/mocks.api"
import { PrepTaskStatus } from "../../../mocks/mocks.interfaces"
import { SpawnPrepTaskDto } from "../../api/prepItems/[id]/spawnPrepTask/route"

export default async function Page({ params }: { params: { boardId: string } }) {
  const prepBoard = await getPrepBoardById(params.boardId)
  const user = await getLoggedInUser()
  const users = await getUsers()

  async function spawnPrepTaskHandler(dto: SpawnPrepTaskDto) {
    "use server"
    await spawnPrepTask(dto.prepItemId, dto.userId)
    revalidatePath(`/boards/${params.boardId}`)
  }

  async function assignPrepTaskHandler(prepTaskId: string, assignedToId: string) {
    "use server"
    await assignPrepTask(prepTaskId, assignedToId)
    revalidatePath(`/boards/${params.boardId}`)
  }

  async function transistionPrepTaskHandler(prepTaskId: string, status: PrepTaskStatus) {
    "use server"
    switch (status) {
      case PrepTaskStatus.ToDo:
        await unstartPrepTask(prepTaskId)
        break
      case PrepTaskStatus.Active:
        await startPrepTask(prepTaskId)
        break
      case PrepTaskStatus.Done:
        await completePrepTask(prepTaskId)
        break
      case PrepTaskStatus.Cancelled:
        await cancelPrepTask(prepTaskId)
        break
    }
    revalidatePath(`/boards/${params.boardId}`)
  }

  return (
    <div className="p-8">
      <Board
        users={users}
        prepBoard={prepBoard}
        userid={user.id}
        handlers={{
          spawnPrepTask: spawnPrepTaskHandler,
          assignPrepTask: assignPrepTaskHandler,
          transistionPrepTask: transistionPrepTaskHandler,
        }}
      />
    </div>
  )
}
