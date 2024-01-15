import { RxAvatar } from "react-icons/rx"
import { PrepTaskDto, UserDto } from "../../mocks/mocks.interfaces"
import { useMutationAssignPrepTask } from "../../queries/prep-tasks/assign-prep-task.query"
import { UserAvatar } from "../UserAvatar/UserAvatar"
import { UsersListPopover } from "../UsersListPopover/UsersListPopover"

export interface PrepTaskAssignedToButtonProps {
  prepTask: PrepTaskDto
  users: UserDto[]
}

export function PrepTaskAssignedToButton(props: PrepTaskAssignedToButtonProps) {
  const assignPrepTaskMutation = useMutationAssignPrepTask()

  function onAssignPrepTask(assignedToId: string) {
    assignPrepTaskMutation.mutate({ prepTaskId: props.prepTask.id, assignedToId })
  }

  if (props.prepTask?.assignedTo) {
    return (
      <UsersListPopover onClickUser={onAssignPrepTask} users={props.users}>
        <UserAvatar user={props.prepTask.assignedTo} size="small" />
      </UsersListPopover>
    )
  }
  return (
    <UsersListPopover onClickUser={onAssignPrepTask} users={props.users}>
      <RxAvatar
        data-ripple-light="true"
        data-popover-target="popover"
        size={24}
        className="flex cursor-pointer text-slate-500 hover:text-slate-200"
      />
    </UsersListPopover>
  )
}