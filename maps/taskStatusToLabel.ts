import { PrepTaskStatus } from "../mocks/mocks.interfaces";

export const taskStatusToLabelMap: Record<PrepTaskStatus, string> = {
  [PrepTaskStatus.ToDo]: "To Do",
  [PrepTaskStatus.Active]: "Active",
  [PrepTaskStatus.Done]: "Done",
  [PrepTaskStatus.Cancelled]: "Cancelled",
};