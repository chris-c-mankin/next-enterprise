import { RxAvatar } from "react-icons/rx";

interface PrepItemTileSmallProps {
  name: string;
  isAssigned?: boolean;
}

export function PrepItemTileSmall(props: PrepItemTileSmallProps) {
  return (
    <div className="flex flex-row items-center gap-2 my-4">
      <div className="">{props.name}</div>
      <div className="">
        {props.isAssigned ? (
        <RxAvatar size={24} className="flex text-green-500" />
        ) : (
        <RxAvatar size={24} className="flex text-slate-500" />
        )}
        </div>
    </div>
  );
}