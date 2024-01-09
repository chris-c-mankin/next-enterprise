import { NextApiRequest } from "next";
import { startPrepTask } from "../../../../../mocks/mocks.api";

export async function POST(request: NextApiRequest) {
  const prepTaskId = request.query.prepTaskId
  if (!prepTaskId || typeof prepTaskId !== "string") {
    throw new Error("Invalid prepTaskId")
  }
  const result = await startPrepTask(prepTaskId);
  return Response.json({ data: result });
}