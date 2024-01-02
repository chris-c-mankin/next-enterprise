import { NextResponse } from "next/server"
import { spawnPrepTask } from "../../../../../mocks/mocks.api"

export interface SpawnPrepTaskDto {
  prepItemId: string
  userId: string
}

export async function POST(reqest: Request) {
  const data = await reqest.json() as SpawnPrepTaskDto
  console.log('SpawnPrepTaskDto', data)
  const task = await spawnPrepTask(data.prepItemId, data.userId)
  return NextResponse.json(task)
}