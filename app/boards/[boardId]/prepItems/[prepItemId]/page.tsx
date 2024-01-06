export default function Page({ params }: { params: { boardId: string; prepItemId: string } }) {
  return (
    <div>
      <div>{params.boardId}</div>
      <div>{params.prepItemId}</div>
    </div>
  )
}
