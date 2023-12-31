import { Board } from "../../../../../components/Board/Board"

export default function Page() {
  return (
    <div className="fixed inset-0 z-10 mx-auto bg-black/60">
      <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-6 sm:w-10/12 md:w-8/12 lg:w-1/2">
        <Board title="Board 1" description="This is a description" />
      </div>
    </div>
  )
}
