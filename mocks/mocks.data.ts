import { faker } from "@faker-js/faker"
import * as fs from "fs"
import { PrepBoardDto, PrepTaskStatus, UserDto } from "./mocks.interfaces"

export interface Mocks {
  users: UserDto[]
  prepBoards: PrepBoardDto[]
}

const mocks: Mocks = {
  users: [],
  prepBoards: [],
}

const mockPrepItemCategories = ["Produce", "Meat", "Dairy", "Dry Goods", "Frozen", "Other"]

try {
  const data = fs.readFileSync("mocks.data.json", "utf8")
  const parsedData = JSON.parse(data) as any
  if (!parsedData.users || !parsedData.prepBoards) {
    throw new Error("Invalid data")
  }
  mocks.users = parsedData.users
  mocks.prepBoards = parsedData.prepBoards
} catch {
  const users: UserDto[] = Array.from({ length: 5 }, () => ({
    id: faker.string.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number(),
    createdDate: faker.date.past(),
  }))

  const prepBoards: PrepBoardDto[] = Array.from({ length: 5 }, () => ({
    id: faker.string.uuid(),
    name: faker.commerce.department(),
    description: faker.commerce.productDescription(),
    createdBy: users[0]!,
    createdDate: faker.date.past(),
    prepItems: [],
    prepTasks: [],
  }))

  for (const prepBoard of prepBoards) {
    prepBoard.prepItems = Array.from({ length: 50 }, () => ({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      createdBy: users[0]!,
      category: mockPrepItemCategories[Math.round(Math.random() * mockPrepItemCategories.length)]!,
    }))

    prepBoard.prepTasks = Array.from({ length: 10 }, () => ({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      createdBy: users[0]!,
      assignedTo: users[1]!,
      prepItem: prepBoard.prepItems[Math.round(Math.random() * prepBoard.prepItems.length)]!,
      createdDate: faker.date.past(),
      status: PrepTaskStatus.ToDo,
    }))
  }

  fs.writeFileSync("mocks.data.json", JSON.stringify({ users, prepBoards }, null, 2), "utf8")

  mocks.users = users
  mocks.prepBoards = prepBoards
}

export function saveMocks() {
  fs.writeFileSync("mocks.data.json", JSON.stringify(mocks, null, 2), "utf8")
}

export default mocks
