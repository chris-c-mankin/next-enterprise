import { taskStatusToColorMap } from "../../maps/taskStatusToColor"
import { taskStatusToLabelMap } from "../../maps/taskStatusToLabel"
import { PrepTaskStatus } from "../../mocks/mocks.interfaces"
import { Popover } from "../Popover/Popover"
import { StatusBadge } from "../StatusBadge/StatusBadge"

export interface TaskStatusPopoverProps {
  children: JSX.Element
  onClickStatus: (status: PrepTaskStatus) => void
}

const statuses = [PrepTaskStatus.ToDo, PrepTaskStatus.Active, PrepTaskStatus.Done, PrepTaskStatus.Cancelled]

export function TaskStatusPopover(props: TaskStatusPopoverProps) {
  return (
    <Popover
      renderContent={(onClose) => (
        <div className="flex flex-col gap-2">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => {
                props.onClickStatus(status)
                onClose()
              }}
              className="flex flex-row items-center gap-2"
            >
              <StatusBadge color={taskStatusToColorMap[status]} label={taskStatusToLabelMap[status]} />
            </button>
          ))}
        </div>
      )}
    >
      {props.children}
    </Popover>
  )
}
