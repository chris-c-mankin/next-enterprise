import { revalidatePath } from "next/cache"
import { Board } from "../../../components/Board/Board"
import { assignPrepTask, getLoggedInUser, getPrepBoardById, getUsers, spawnPrepTask } from "../../../mocks/mocks.api"
import { SpawnPrepTaskDto } from "../../api/prepItems/[id]/spawnPrepTask/route"

export default async function Page({ params }: { params: { id: string } }) {
  const prepBoard = await getPrepBoardById(params.id)
  const user = await getLoggedInUser()
  const users = await getUsers()

  async function spawnPrepTaskHandler(dto: SpawnPrepTaskDto) {
    "use server"
    await spawnPrepTask(dto.prepItemId, dto.userId)
    revalidatePath(`/board/${params.id}`)
  }

  async function assignPrepTaskHandler(prepTaskId: string, assignedToId: string) {
    "use server"
    await assignPrepTask(prepTaskId, assignedToId)
    revalidatePath(`/board/${params.id}`)
  }

  console.log(prepBoard)
  return (
    <div className="p-8">
      <Board
        users={users}
        prepBoard={prepBoard}
        userid={user.id}
        handlers={{
          spawnPrepTask: spawnPrepTaskHandler,
          assignPrepTask: assignPrepTaskHandler,
        }}
      />
    </div>
  )
}
