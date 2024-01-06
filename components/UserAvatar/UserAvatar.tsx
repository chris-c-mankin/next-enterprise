import { UserDto } from "../../mocks/mocks.interfaces";

export interface UserAvatarProps {
  user: UserDto
  size: "small" | "medium" | "large"
}

const sizes = {
  small: "w-8 h-8 text-xs",
  medium: "w-12 h-12 text-sm",
  large: "w-16 h-16 text-lg",
}

export function UserAvatar({ user, size }: UserAvatarProps) {
  const avatarSize = sizes[size]
  return (
    <div className={`z-0 flex flex-row cursor-pointer items-center justify-center gap-2 rounded-full ${user.profile.avatarColor} ${avatarSize}`}>
      <div>{user.firstName.charAt(0)}{user.lastName.charAt(0)}</div>
    </div>
  )
}