"use client"
import { RxAvatar, RxPlusCircled } from "react-icons/rx"
import { SpawnPrepTaskDto } from "../../app/api/prepItems/[id]/spawnPrepTask/route"
import { PrepItemDto, PrepTaskDto } from "../../mocks/mocks.interfaces"
import { UserAvatar } from "../UserAvatar/UserAvatar"

interface PrepItemTileSmallProps {
  prepItem: PrepItemDto
  prepTask?: PrepTaskDto
  userid: string
  handlers: {
    spawnPrepTask: (dto: SpawnPrepTaskDto) => Promise<void>
  }
}

export function PrepItemTileSmall({ prepItem, prepTask, userid, handlers }: PrepItemTileSmallProps) {
  function onClickSpawnPrepTask() {
    const request: SpawnPrepTaskDto = {
      prepItemId: prepItem.id,
      userId: userid,
    }
    handlers.spawnPrepTask(request)
  }


  return (
    <div className="my-4 flex flex-row items-center gap-2">
      <div className="">{prepItem.name}</div>
      <div className="">
        {prepTask ? null : ( 
          <PrepTaskSpawnButton onClickSpawnPrepTask={onClickSpawnPrepTask} />
        )}
        <AssignedTo prepTask={prepTask} />
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

function AssignedTo({ prepTask }: { prepTask?: PrepTaskDto }) {
  if (!prepTask) {
    return null
  }
  if (prepTask?.assignedTo) {
    return <UserAvatar user={prepTask.assignedTo} size="small" />
  }
  return <RxAvatar size={24} className="flex text-slate-500" />
}
