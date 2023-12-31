export interface NewTabLinkProps {
  href: string
  children?: React.ReactNode
  className?: string
}

export function NewTabLink(props: NewTabLinkProps) {
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      className={props.className}
    >
      {props.children}
    </a> 
  )
}