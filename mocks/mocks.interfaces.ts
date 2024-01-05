export interface UserDto {
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  createdDate: Date
  profile: {
    avatarColor: string
  }
}

export interface PrepItemDto {
  id: string
  name: string
  description?: string
  createdBy: UserDto
  category: string
}

export interface PrepBoardDto {
  id: string
  name: string
  description?: string
  createdBy: UserDto
  createdDate: Date
  prepItems: PrepItemDto[]
  prepTasks: PrepTaskDto[]
}

export interface PrepTaskDto {
  id: string
  name: string
  description?: string
  assignedTo?: UserDto
  createdBy: UserDto
  createdDate: Date
  prepItem: PrepItemDto
  status: PrepTaskStatus
}

export enum PrepTaskStatus {
  ToDo = "To Do",
  InProgress = "In Progress",
  Complete = "Complete",
  Cancelled = "Cancelled",
}
