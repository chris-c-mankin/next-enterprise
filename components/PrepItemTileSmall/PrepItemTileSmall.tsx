"use client"
import Link from "next/link"
import { RxAvatar, RxPlusCircled } from "react-icons/rx"
import { SpawnPrepTaskDto } from "../../app/api/boards/[boardId]/prep-items/[prepItemId]/spawn-prep-task/route"
import { taskStatusToColorMap } from "../../maps/taskStatusToColor"
import { taskStatusToLabelMap } from "../../maps/taskStatusToLabel"
import { PrepItemDto, PrepTaskDto, PrepTaskStatus, UserDto } from "../../mocks/mocks.interfaces"
import { StatusBadge } from "../StatusBadge/StatusBadge"
import { TaskStatusPopover } from "../TaskStatusPopover/TaskStatusPopover"
import { UserAvatar } from "../UserAvatar/UserAvatar"
import { UsersListPopover } from "../UsersListPopover/UsersListPopover"

interface PrepItemTileSmallProps {
  boardId: string
  users: UserDto[]
  prepItem: PrepItemDto
  prepTask?: PrepTaskDto
  userid: string
  handlers: {
    spawnPrepTask: (dto: SpawnPrepTaskDto) => Promise<void>
    assignPrepTask: (prepTaskId: string, assignedToId: string) => Promise<void>
    transistionPrepTask: (prepTaskId: string, status: PrepTaskStatus) => Promise<void>
  }
}

export function PrepItemTileSmall({ boardId, prepItem, prepTask, userid, handlers, users }: PrepItemTileSmallProps) {
  function onClickSpawnPrepTask() {
    const request: SpawnPrepTaskDto = {
      prepItemId: prepItem.id,
      userId: userid,
    }
    handlers.spawnPrepTask(request)
  }

  function onClickAssignPrepTask(assignedToId: string) {
    if (!prepTask) {
      return
    }
    handlers.assignPrepTask(prepTask.id, assignedToId)
  }

  return (
    <div className="my-4 flex flex-row items-center gap-2">
      <Link href={`/boards/${boardId}/prepItems/${prepItem.id}`}>
        <div className="">{prepItem.name}</div>
      </Link>
      <div className="flex gap-4">
        {prepTask ? null : <PrepTaskSpawnButton onClickSpawnPrepTask={onClickSpawnPrepTask} />}
        <AssignedTo prepTask={prepTask} users={users} onAssignPrepTask={onClickAssignPrepTask} />
        {prepTask && (
          <TaskStatusPopover
            onClickStatus={(status: PrepTaskStatus) => handlers.transistionPrepTask(prepTask.id, status)}
          >
            <StatusBadge color={taskStatusToColorMap[prepTask.status]} label={taskStatusToLabelMap[prepTask.status]} />
          </TaskStatusPopover>
        )}
      </div>
    </div>
  )
}

function PrepTaskSpawnButton({ onClickSpawnPrepTask }: { onClickSpawnPrepTask: () => void }) {
  // function onClick() {
  //   const request: SpawnPrepTaskDto = {
  //     prepItemId: prepItem.id,
  //     userId: userid,
  //   }
  //   fetch(`/api/prepItems/${prepItem.id}/spawnPrepTask`, {
  //     method: "POST",
  //     body: JSON.stringify(request),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  // }
  return (
    <button onClick={onClickSpawnPrepTask} className="flex flex-row items-center gap-2">
      <RxPlusCircled className="flex" />
    </button>
  )
}

function AssignedTo({
  prepTask,
  users,
  onAssignPrepTask,
}: {
  prepTask?: PrepTaskDto
  users: UserDto[]
  onAssignPrepTask: (assignedToId: string) => void
}) {
  if (!prepTask) {
    return null
  }
  if (prepTask?.assignedTo) {
    return (
      <UsersListPopover onClickUser={onAssignPrepTask} users={users}>
        <UserAvatar user={prepTask.assignedTo} size="small" />
      </UsersListPopover>
    )
  }
  return (
    <UsersListPopover onClickUser={onAssignPrepTask} users={users}>
      <RxAvatar
        data-ripple-light="true"
        data-popover-target="popover"
        size={24}
        className="flex cursor-pointer text-slate-500 hover:text-slate-200"
      />
    </UsersListPopover>
  )
}
