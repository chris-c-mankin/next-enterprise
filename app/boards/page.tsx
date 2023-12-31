import { BoardTile } from "../../components/BoardTile/BoardTile"
import { PageTitle } from "../../components/PageTitle/PageTitle"

export default function Page() {
  return (
    <>
      <PageTitle title="Boards" />
      <div className="flex flex-row flex-wrap gap-8">
        {[
          { title: "Board 1", description: "This is a description" },
          { title: "Board 2", description: "This is a description" },
          { title: "Board 3", description: "This is a description" },
          { title: "Board 4", description: "This is a description" },
          { title: "Board 5", description: "This is a description" },
          { title: "Board 6", description: "This is a description" },
        ].map((item) => (
          <div key={item.title} className="w-100 flex-initial">
            <BoardTile title={item.title} description={item.description} />
          </div>
        ))}
      </div>
    </>
  )
}
