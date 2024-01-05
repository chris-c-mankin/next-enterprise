import { revalidatePath } from "next/cache"
import { Board } from "../../../../../components/Board/Board"
import {
  assignPrepTask,
  getLoggedInUser,
  getPrepBoardById,
  getUsers,
  spawnPrepTask,
} from "../../../../../mocks/mocks.api"
import { SpawnPrepTaskDto } from "../../../../api/prepItems/[id]/spawnPrepTask/route"

export default async function Page({ params }: { params: { id: string } }) {
  const prepBoard = await getPrepBoardById(params.id)
  const users = await getUsers()
  const loggedInUser = await getLoggedInUser()

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

  return (
    <div className="fixed inset-0 z-10 mx-auto bg-black/60">
      <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-6 sm:w-10/12 md:w-8/12 lg:w-1/2">
        <Board
          prepBoard={prepBoard}
          users={users}
          userid={loggedInUser.id}
          handlers={{
            spawnPrepTask: spawnPrepTaskHandler,
            assignPrepTask: assignPrepTaskHandler,
          }}
        />
      </div>
    </div>
  )
}
