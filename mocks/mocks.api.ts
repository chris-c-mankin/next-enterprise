import mocks, { saveMocks } from "./mocks.data"
import { PrepBoardDto, PrepItemDto, PrepTaskDto, PrepTaskStatus, UserDto } from "./mocks.interfaces"

export async function getUsers(): Promise<UserDto[]> {
  return mocks.users
}

export function getLoggedInUser(): Promise<UserDto> {
  return Promise.resolve(mocks.users[0]!)
}

export async function getPrepBoards(): Promise<PrepBoardDto[]> {
  return mocks.prepBoards
}

export async function getPrepBoardById(prepBoardId: string): Promise<PrepBoardDto> {
  const prepBoard = mocks.prepBoards.find((prepBoard) => prepBoard.id === prepBoardId)
  if (!prepBoard) {
    throw new Error("PrepBoard not found")
  }
  return prepBoard
}

export async function getPrepItemById(prepBoardId: string, prepItemId: string): Promise<PrepItemDto> {
  const prepBoard = mocks.prepBoards.find((prepBoard) => prepBoard.id === prepBoardId)
  if (!prepBoard) {
    throw new Error("PrepBoard not found")
  }
  const prepItem = prepBoard.prepItems.find((prepItem) => prepItem.id === prepItemId)
  if (!prepItem) {
    throw new Error("PrepItem not found")
  }
  return prepItem
}

export function spawnPrepTask(prepBoardId: string, prepItemId: string, createdById: string): Promise<PrepTaskDto> {
  const prepBoard = mocks.prepBoards.find((prepBoard) => prepBoard.id === prepBoardId)
  if (!prepBoard) {
    throw new Error("PrepBoard not found")
  }
  const prepItem = prepBoard.prepItems.find((prepItem) => prepItem.id === prepItemId)
  const createdBy = mocks.users.find((user) => user.id === createdById)
  if (!prepBoard || !prepItem || !createdBy) {
    throw new Error("PrepBoard or PrepItem not found")
  }
  const prepTask: PrepTaskDto = {
    id: Math.random().toString(),
    name: prepItem.name,
    description: prepItem.description,
    createdBy,
    createdDate: new Date(),
    prepItem,
    status: PrepTaskStatus.ToDo,
  }

  prepBoard.prepTasks.push(prepTask)
  saveMocks()
  return Promise.resolve(prepTask)
}

export function assignPrepTask(prepTaskId: string, assignedToId: string): Promise<PrepTaskDto> {
  const prepTask = mocks.prepBoards
    .flatMap((prepBoard) => prepBoard.prepTasks)
    .find((prepTask) => prepTask.id === prepTaskId)
  const assignedTo = mocks.users.find((user) => user.id === assignedToId)
  if (!prepTask || !assignedTo) {
    throw new Error("PrepTask or User not found")
  }
  prepTask.assignedTo = assignedTo
  saveMocks()
  return Promise.resolve(prepTask)
}

export async function resetPrepTask(prepTaskId: string): Promise<PrepTaskDto> {
  const prepTask = mocks.prepBoards
    .flatMap((prepBoard) => prepBoard.prepTasks)
    .find((prepTask) => prepTask.id === prepTaskId)
  if (!prepTask) {
    throw new Error("PrepTask not found")
  }
  prepTask.status = PrepTaskStatus.ToDo
  saveMocks()
  return prepTask
}

export async function startPrepTask(prepTaskId: string): Promise<PrepTaskDto> {
  const prepTask = mocks.prepBoards
    .flatMap((prepBoard) => prepBoard.prepTasks)
    .find((prepTask) => prepTask.id === prepTaskId)
  if (!prepTask) {
    throw new Error("PrepTask not found")
  }
  prepTask.status = PrepTaskStatus.Active
  saveMocks()
  return prepTask
}

export async function completePrepTask(prepTaskId: string): Promise<PrepTaskDto> {
  const prepTask = mocks.prepBoards
    .flatMap((prepBoard) => prepBoard.prepTasks)
    .find((prepTask) => prepTask.id === prepTaskId)
  if (!prepTask) {
    throw new Error("PrepTask not found")
  }
  prepTask.status = PrepTaskStatus.Done
  saveMocks()
  return prepTask
}

export async function cancelPrepTask(prepTaskId: string): Promise<PrepTaskDto> {
  const prepTask = mocks.prepBoards
    .flatMap((prepBoard) => prepBoard.prepTasks)
    .find((prepTask) => prepTask.id === prepTaskId)
  if (!prepTask) {
    throw new Error("PrepTask not found")
  }
  prepTask.status = PrepTaskStatus.Cancelled
  saveMocks()
  return prepTask
}
