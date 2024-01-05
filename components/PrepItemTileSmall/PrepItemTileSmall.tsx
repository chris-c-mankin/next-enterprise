"use client"
import { RxAvatar, RxPlusCircled } from "react-icons/rx"
import { SpawnPrepTaskDto } from "../../app/api/prepItems/[id]/spawnPrepTask/route"
import { PrepItemDto, PrepTaskDto, UserDto } from "../../mocks/mocks.interfaces"
import { UserAvatar } from "../UserAvatar/UserAvatar"
import { UsersListPopover } from "../UsersListPopover/UsersListPopover"

interface PrepItemTileSmallProps {
  users: UserDto[]
  prepItem: PrepItemDto
  prepTask?: PrepTaskDto
  userid: string
  handlers: {
    spawnPrepTask: (dto: SpawnPrepTaskDto) => Promise<void>
    assignPrepTask: (prepTaskId: string, assignedToId: string) => Promise<void>
  }
}

export function PrepItemTileSmall({ prepItem, prepTask, userid, handlers, users }: PrepItemTileSmallProps) {
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
      <div className="">{prepItem.name}</div>
      <div className="">
        {prepTask ? null : <PrepTaskSpawnButton onClickSpawnPrepTask={onClickSpawnPrepTask} />}
        <AssignedTo prepTask={prepTask} users={users} onAssignPrepTask={onClickAssignPrepTask} />
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
