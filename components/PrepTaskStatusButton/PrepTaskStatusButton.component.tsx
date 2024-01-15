import { taskStatusToColorMap } from "../../maps/taskStatusToColor"
import { taskStatusToLabelMap } from "../../maps/taskStatusToLabel"
import { PrepTaskDto, PrepTaskStatus } from "../../mocks/mocks.interfaces"
import { useMutationaCancelPrepTask } from "../../queries/prep-tasks/cancel-prep-task.query"
import { useMutationaCompletePrepTask } from "../../queries/prep-tasks/complete-prep-task.query"
import { useMutationaResetPrepTask } from "../../queries/prep-tasks/reset-prep-task.query"
import { useMutationStartPrepTask } from "../../queries/prep-tasks/start-prep-task.query"
import { StatusBadge } from "../StatusBadge/StatusBadge"
import { TaskStatusPopover } from "../TaskStatusPopover/TaskStatusPopover"

export interface PrepTaskStatusButtonProps {
  prepTask: PrepTaskDto
}

export function PrepTaskStatusButton(props: PrepTaskStatusButtonProps) {
  const startPrepTaskMutation = useMutationStartPrepTask()
  const completePrepTaskMutation = useMutationaCompletePrepTask()
  const cancelPrepTaskMutation = useMutationaCancelPrepTask()
  const resetPrepTaskMutation = useMutationaResetPrepTask()

  function onTransistionPrepTask(status: PrepTaskStatus) {
    switch (status) {
      case PrepTaskStatus.ToDo:
        startPrepTaskMutation.mutate(props.prepTask.id)
        break
      case PrepTaskStatus.Active:
        completePrepTaskMutation.mutate(props.prepTask.id)
        break
      case PrepTaskStatus.Done:
        resetPrepTaskMutation.mutate(props.prepTask.id)
        break
      case PrepTaskStatus.Cancelled:
        cancelPrepTaskMutation.mutate(props.prepTask.id)
        break
    }
  }

  return (
    <TaskStatusPopover onClickStatus={onTransistionPrepTask}>
      <StatusBadge
        color={taskStatusToColorMap[props.prepTask.status]}
        label={taskStatusToLabelMap[props.prepTask.status]}
      />
    </TaskStatusPopover>
  )
}
