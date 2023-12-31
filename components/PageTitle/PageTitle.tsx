export interface PageTitleProps {
  title: string
  description?: string
}

export function PageTitle({ title }: PageTitleProps) {
  return (
    <h1 className="text-2xl mb-8">{title}</h1>
  )
}