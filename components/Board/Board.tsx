"use client"
import { useMemo, useState } from "react"
import { FaClipboard } from "react-icons/fa"
import { SpawnPrepTaskDto } from "../../app/api/prepItems/[id]/spawnPrepTask/route"
import { PrepBoardDto, PrepItemDto, UserDto } from "../../mocks/mocks.interfaces"
import { MultiSelectInput } from "../MultiSelectInput/MultiSelectInput"
import { NewTabLink } from "../NewTabLink/NewTabLink"
import { PageTitle } from "../PageTitle/PageTitle"
import { PrepItemTileSmall } from "../PrepItemTileSmall/PrepItemTileSmall"
import { SelectInput } from "../SelectInput/SelectInput"
import { UserAvatar } from "../UserAvatar/UserAvatar"

interface BoardProps {
  prepBoard: PrepBoardDto
  userid: string
  users: UserDto[]
  handlers: {
    spawnPrepTask: (dto: SpawnPrepTaskDto) => Promise<void>
    assignPrepTask: (prepTaskId: string, assignedToId: string) => Promise<void>
  }
}

type SelectOption = { value: string; label: string }
const itemTypeOptions = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "tasks",
    label: "Tasks",
  },
  {
    value: "items",
    label: "Items",
  },
]

export function Board({ prepBoard, userid, handlers, users }: BoardProps) {
  const prepItems = prepBoard.prepItems
  const categories = [...new Set(prepItems.map((item) => item.category))]

  const [itemTypeFilter, setItemTypeFilter] = useState<SelectOption>({
    value: "all",
    label: "All",
  })

  const [assignedToFilter, setAssignedToFilter] = useState<string[]>([])

  const userFilterOptions = useMemo(() => {
    return users.map((user) => ({
      value: user.id,
      label: `${user.firstName} ${user.lastName}`,
    }))
  }, [users])

  const prepItemsToDisplay = useMemo(() => {
    const predicates: ((item: PrepItemDto) => boolean)[] = []
    if (assignedToFilter.length > 0)
      predicates.push((item) => filterByAssignedTo(item, prepBoard, assignedToFilter))
    if (itemTypeFilter.value === "tasks")
      predicates.push((item) => filterByTasks(item, prepBoard))
    if (itemTypeFilter.value === "items")
      predicates.push((item) => filterByItems(item, prepBoard))

    return prepItems.filter((item) => predicates.every((predicate) => predicate(item)))
  }, [assignedToFilter, itemTypeFilter.value, prepBoard, prepItems])

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
      <div className="mb-8 grid grid-flow-col gap-4 justify-start">
        <div>
          <SelectInput
            label="Item Type"
            options={itemTypeOptions}
            onChange={(value) => setItemTypeFilter(itemTypeOptions.find((option) => option.value === value)!)}
            selected={itemTypeFilter}
          />
        </div>
        <div>
          <MultiSelectInput
            label="Assigned To"
            onChange={setAssignedToFilter}
            options={userFilterOptions}
            selected={assignedToFilter}
            renderLabel={(option) => {
              const user = users.find((user) => user.id === option.value)!
              return (
                <div className="flex flex-row items-center gap-2">
                  <UserAvatar user={user} size="small" />
                  <div>
                    {user.firstName} {user.lastName}
                  </div>
                </div>
              )
            }}
          />
        </div>
      </div>
      <div className="grid w-full gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div className="rounded border border-slate-500 p-4" key={category}>
            <div className="mb-2 text-lg">{category}</div>
            <ul>
              {prepItemsToDisplay
                .filter((item) => item.category === category)
                .map((item) => (
                  <li key={item.id}>
                    <PrepItemTileSmall
                      users={users}
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

function filterByAssignedTo(item: PrepItemDto, prepBoard: PrepBoardDto, assignedToFilter: string[]) {
  const prepTask = prepBoard.prepTasks.find((task) => task.prepItem.id === item.id)
  if (!prepTask) return false
  return assignedToFilter.some((userId) => prepTask.assignedTo?.id === userId)
}

function filterByTasks(item: PrepItemDto, prepBoard: PrepBoardDto) {
  return prepBoard.prepTasks.some((task) => task.prepItem.id === item.id)
}

function filterByItems(item: PrepItemDto, prepBoard: PrepBoardDto) {
  return !prepBoard.prepTasks.some((task) => task.prepItem.id === item.id)
}