import { GiChefToque } from "react-icons/gi";

export function PageHeader() {
  return (
    <div className="grid grid-flow-cols justify-start gap-8 h-full items-center px-2">
      <div className="flex items-center">
        <GiChefToque className="white text-4xl mr-2" />
        <div className="text-2xl">
          Prep It
        </div>
      </div>
    </div>
  )
}