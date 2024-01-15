import { NextRequest, NextResponse } from "next/server";
import { getPrepTaskById } from "../../../../mocks/mocks.api";

export async function GET(_request: NextRequest, { params }: { params: { prepTaskId: string } }) {
  const { prepTaskId } = params
  if (!prepTaskId || typeof prepTaskId !== 'string') {
    throw new Error('prepTaskId is required')
  }
  const result = await getPrepTaskById(prepTaskId)
  return NextResponse.json({ data: result })
}