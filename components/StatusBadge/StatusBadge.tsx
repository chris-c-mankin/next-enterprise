interface StatusBadgeProps {
  label: string
  color: string
}

export function StatusBadge(props: StatusBadgeProps) {
  return (
    <div className={`px-2 py-1 rounded-md ${props.color} text-white`}>
      {props.label}
    </div>
  )
}