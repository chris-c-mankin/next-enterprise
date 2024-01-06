import { PrepTaskStatus } from "../mocks/mocks.interfaces"
import { Colors } from "../styles/colors"

export const taskStatusToColorMap: Record<PrepTaskStatus, string> = {
  [PrepTaskStatus.ToDo]: Colors.toDo,
  [PrepTaskStatus.Active]: Colors.inProgress,
  [PrepTaskStatus.Done]: Colors.done,
  [PrepTaskStatus.Cancelled]: Colors.cancelled,
}
