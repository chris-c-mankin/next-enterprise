interface BoardsListLayoutProps {
  children: React.ReactNode
  modal: React.ReactNode
}

export default function BoardsListLayout({ children, modal }: BoardsListLayoutProps) {
  return <section className="p-8">{children}{modal}</section>
}
