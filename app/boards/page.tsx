import { PageTitle } from "../../components/PageTitle/PageTitle"
import { PrepBoardsList } from "../../components/PrepBoardsList/PrepBoardsList.component"

export default async function Page() {
  return (
    <>
      <PageTitle title="Boards" />
      <PrepBoardsList />
    </>
  )
}
