import { FaClipboard } from "react-icons/fa"
import { prepItems } from "./prepItems.mocks"
import { NewTabLink } from "../NewTabLink/NewTabLink"
import { PageTitle } from "../PageTitle/PageTitle"
import { PrepItemTileSmall } from "../PrepItemTileSmall/PrepItemTileSmall"

interface BoardProps {
  title: string
  description?: string
}

export function Board({ title, description }: BoardProps) {
  const categories = [...new Set(prepItems.map((item) => item.category))]

  return (
    <>
      <header className="mb-4 flex w-full flex-row items-center">
        <NewTabLink className="flex flex-row items-center text-sm" href="/board/1">
          <FaClipboard className="flex" />
          &nbsp;{title}
        </NewTabLink>
      </header>
      <PageTitle title={title} />
      <h2 className="mb-12">{description}</h2>
      <div className="w-full grid gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {categories.map((category) => (
          <div className="border border-slate-500 rounded p-4" key={category}>
            <div className="text-lg mb-2">{category}</div>
            <ul>
              {prepItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <li key={item.id}>
                    <PrepItemTileSmall name={item.name} isAssigned={Math.random() > 0.7} />
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  )
}
