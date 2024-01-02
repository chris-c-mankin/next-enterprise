import { revalidatePath } from "next/cache"
import { Board } from "../../../components/Board/Board"
import { getLoggedInUser, getPrepBoardById, spawnPrepTask } from "../../../mocks/mocks.api"
import { SpawnPrepTaskDto } from "../../api/prepItems/[id]/spawnPrepTask/route"

export default async function Page({ params }: { params: { id: string } }) {
  const prepBoard = await getPrepBoardById(params.id)
  const user = await getLoggedInUser()

  async function spawnPrepTaskHandler(dto: SpawnPrepTaskDto) {
    "use server"
    await spawnPrepTask(dto.prepItemId, dto.userId)
    revalidatePath(`/board/${params.id}`)
  }

  console.log(prepBoard)
  return (
    <div className="p-8">
      <Board
        prepBoard={prepBoard}
        userid={user.id}
        handlers={{
          spawnPrepTask: spawnPrepTaskHandler,
        }}
      />
    </div>
  )
}
