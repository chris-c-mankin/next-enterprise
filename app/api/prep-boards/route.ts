import { getPrepBoards } from "../../../mocks/mocks.api";

export async function GET() {
  const result = await getPrepBoards()
  return Response.json({ items: result })
}