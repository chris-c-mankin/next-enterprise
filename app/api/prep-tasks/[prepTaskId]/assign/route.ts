import { NextRequest, NextResponse } from "next/server"
import { assignPrepTask } from "../../../../../mocks/mocks.api"

export interface AssignPrepTaskDto {
  assignedToId: string
}

export async function POST(request: NextRequest, { params }: { params: { prepTaskId: string } }) {
  const { assignedToId } = await request.json() as AssignPrepTaskDto
  const { prepTaskId } = params
  const result = await assignPrepTask(prepTaskId, assignedToId)
  return NextResponse.json(result)
}
