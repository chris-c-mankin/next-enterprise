"use client"
import Link from "next/link"
import { useState } from "react"
import { RxPlusCircled } from "react-icons/rx"
import { PrepItemDto, PrepTaskDto, UserDto } from "../../mocks/mocks.interfaces"
import { useQueryGetPrepItem } from "../../queries/prep-items/get-prep-item.query"
import { useMutationSpawnPrepTask } from "../../queries/prep-items/spawn-prep-task.query"
import { useQueryGetPrepTask } from "../../queries/prep-tasks/get-prep-task.query"
import { PrepTaskAssignedToButton } from "../PrepTaskAssignedToButton/PrepTaskAssignedToButton.component"
import { PrepTaskStatusButton } from "../PrepTaskStatusButton/PrepTaskStatusButton.component"

interface PrepItemTileSmallProps {
  boardId: string
  prepItemId: string
  prepTaskId?: string
  users: UserDto[]
  userid: string
}

export function PrepItemTileSmall(props: PrepItemTileSmallProps) {
  const [createdPrepTask, setCreatedPrepTask] = useState<PrepTaskDto | undefined>(undefined)

  const prepItemQueryResult = useQueryGetPrepItem(props.boardId, props.prepItemId)
  const prepTaskQueryResult = useQueryGetPrepTask(props.boardId, props.prepTaskId || createdPrepTask?.id)

  const spawnPrepTask = useMutationSpawnPrepTask()

  function onClickSpawPrepTask() {
    spawnPrepTask.mutate(
      { prepItemId: props.prepItemId, boardId: props.boardId },
      {
        onSuccess: (prepTask) => {
          setCreatedPrepTask(prepTask)
        },
      }
    )
  }

  const prepItem = prepItemQueryResult.data
  const prepTask = prepTaskQueryResult.data

  if (!prepItem) {
    return null
  }

  return (
    <PrepItemTileSmallComponent
      boardId={props.boardId}
      prepItem={prepItem}
      prepTask={prepTask}
      users={props.users}
      userid={props.userid}
      onSpawnPrepTask={onClickSpawPrepTask}
    />
  )
}

interface PrepItemTileSmallComponentProps {
  boardId: string
  prepItem: PrepItemDto
  prepTask?: PrepTaskDto
  users: UserDto[]
  userid: string
  onSpawnPrepTask: () => void
}

function PrepItemTileSmallComponent(props: PrepItemTileSmallComponentProps) {
  return (
    <div className="my-4 flex flex-row items-center gap-2">
      <Link href={`/boards/${props.boardId}/prepItems/${props.prepItem.id}`}>
        <div className="">{props.prepItem.name}</div>
      </Link>
      <div className="flex gap-4">
        {props.prepTask ? null : (
          <button onClick={props.onSpawnPrepTask} className="flex flex-row items-center gap-2">
            <RxPlusCircled className="flex" />
          </button>
        )}

        {props.prepTask && <PrepTaskInlineMenu prepTask={props.prepTask} users={props.users} />}
      </div>
    </div>
  )
}

function PrepTaskInlineMenu(props: { prepTask: PrepTaskDto, users: UserDto[] }) {
  return (
    <>
      <PrepTaskAssignedToButton prepTask={props.prepTask} users={props.users} />
      <PrepTaskStatusButton prepTask={props.prepTask} />
    </>
  )
}
