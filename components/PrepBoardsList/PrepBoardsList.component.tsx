"use client"

import { useQueryListPrepBoards } from "../../queries/prep-boards/list-prep-boards.query";
import { PrepBoardTile } from "../PrepBoardTile/PrepBoardTile";

export function PrepBoardsList() {
  const prepBoardsQueryResult = useQueryListPrepBoards();

  if (prepBoardsQueryResult.isLoading) {
    return <div>Loading...</div>;
  }

  if (!prepBoardsQueryResult.data) {
    return null;
  }

  const prepBoards = prepBoardsQueryResult.data.items ?? [];

  console.log(prepBoards);

  return (
    <div className="grid grid-cols-4 gap-4 md:grid-cols-3 sm:grid-cols-1">
        {prepBoards.map((item) => (
          <div key={item.name} className="">
            <PrepBoardTile id={item.id} name={item.name} description={item.description} />
          </div>
        ))}
      </div>
  )
}