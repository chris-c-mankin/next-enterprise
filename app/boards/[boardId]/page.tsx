import { Board } from "../../../components/Board/Board.component"
import { getLoggedInUser, getUsers } from "../../../mocks/mocks.api"

export default async function Page({ params }: { params: { boardId: string } }) {
  const user = await getLoggedInUser()
  const users = await getUsers()

  return (
    <div className="p-8">
      <Board
        users={users}
        prepBoardId={params.boardId}
        userid={user.id}
      />
    </div>
  )
}
