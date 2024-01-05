"use server"
import { revalidatePath } from "next/cache"
import { spawnPrepTask } from "../../mocks/mocks.api"
import { SpawnPrepTaskDto } from "../api/prepItems/[id]/spawnPrepTask/route"

export async function spawnPrepTaskHandler(dto: SpawnPrepTaskDto) {
  await spawnPrepTask(dto.prepItemId, dto.userId)
  revalidatePath(`/board`)
}
