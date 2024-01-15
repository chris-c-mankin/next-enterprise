import Link from "next/link"

export interface BoardTileProps {
  id: string
  name: string
  description?: string
}

export function PrepBoardTile({ name, description, id }: BoardTileProps) {
  return (
    <Link href={`/boards/${id}`}>
      <div className="rounded-lg border border-slate-500 p-8 hover:border-slate-400">
        <p className="text-xl">{name}</p>
        {description && <p className="text-slate-400">{description}</p>}
      </div>
    </Link>
  )
}
