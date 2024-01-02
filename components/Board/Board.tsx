import { FaClipboard } from "react-icons/fa"
import { SpawnPrepTaskDto } from "../../app/api/prepItems/[id]/spawnPrepTask/route"
import { PrepBoardDto } from "../../mocks/mocks.interfaces"
import { NewTabLink } from "../NewTabLink/NewTabLink"
import { PageTitle } from "../PageTitle/PageTitle"
import { PrepItemTileSmall } from "../PrepItemTileSmall/PrepItemTileSmall"

interface BoardProps {
  prepBoard: PrepBoardDto
  userid: string
  handlers: {
    spawnPrepTask: (dto: SpawnPrepTaskDto) => Promise<void>
  }
}

export function Board({ prepBoard, userid, handlers }: BoardProps) {
  const prepItems = prepBoard.prepItems
  const categories = [...new Set(prepItems.map((item) => item.category))]

  return (
    <>
      <header className="mb-4 flex w-full flex-row items-center">
        <NewTabLink className="flex flex-row items-center text-sm" href="/board/1">
          <FaClipboard className="flex" />
          &nbsp;{prepBoard.name}
        </NewTabLink>
      </header>
      <PageTitle title={prepBoard.name} />
      <h2 className="mb-12">{prepBoard.description}</h2>
      <div className="grid w-full gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div className="rounded border border-slate-500 p-4" key={category}>
            <div className="mb-2 text-lg">{category}</div>
            <ul>
              {prepItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <li key={item.id}>
                    <PrepItemTileSmall
                      userid={userid}
                      prepItem={item}
                      prepTask={prepBoard.prepTasks.find((task) => task.prepItem.id === item.id)}
                      handlers={handlers}
                    />
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  )
}
