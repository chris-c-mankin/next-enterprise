import Link from "next/link"

export interface BoardTileProps {
  title: string
  description?: string
}

export function BoardTile({ title, description }: BoardTileProps) {
  return (
    <Link href={'/board/1'}>
      <div className="rounded-lg border border-slate-500 p-8 hover:border-slate-400">
        <p className="text-xl">{title}</p>
        {description && <p className="text-slate-400">{description}</p>}
      </div>
    </Link>
  )
}
