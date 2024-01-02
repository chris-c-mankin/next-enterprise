import { BoardTile } from "../../components/BoardTile/BoardTile"
import { PageTitle } from "../../components/PageTitle/PageTitle"
import { getPrepBoards } from "../../mocks/mocks.api"

export default async function Page() {
  const prepBoards = await getPrepBoards();
  return (
    <>
      <PageTitle title="Boards" />
      <div className="grid grid-cols-4 gap-4 md:grid-cols-3 sm:grid-cols-1">
        {prepBoards.map((item) => (
          <div key={item.name} className="">
            <BoardTile id={item.id} name={item.name} description={item.description} />
          </div>
        ))}
      </div>
    </>
  )
}
