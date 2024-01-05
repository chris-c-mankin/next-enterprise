import { UserDto } from "../../mocks/mocks.interfaces"
import { Popover } from "../Popover/Popover"
import { UserAvatar } from "../UserAvatar/UserAvatar"

export interface UsersListPopoverProps {
  children: JSX.Element
  users: UserDto[]
  onClickUser: (userId: string) => void
}

export function UsersListPopover(props: UsersListPopoverProps) {
  return (
    <Popover renderContent={() => (
      <div className="flex flex-col gap-2">
        {props.users.map(user => (
          <button
            key={user.id}
            onClick={() => props.onClickUser(user.id)}
            className="flex flex-row items-center gap-2">
            <div className="flex flex-row items-center gap-2">
              <UserAvatar user={user} size="small" />
              <div>{user.firstName} {user.lastName}</div>
            </div>
          </button>
        ))}
      </div>
    )}>
      {props.children}
    </Popover>
  )
}