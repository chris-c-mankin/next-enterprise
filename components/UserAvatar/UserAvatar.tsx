import { UserDto } from "../../mocks/mocks.interfaces";

export interface UserAvatarProps {
  user: UserDto
  size: "small" | "medium" | "large"
}

const avatarColors = [
  "bg-red-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-purple-500",
  "bg-pink-500",
]

const sizes = {
  small: "w-8 h-8 text-xs",
  medium: "w-12 h-12 text-sm",
  large: "w-16 h-16 text-lg",
}

export function UserAvatar({ user, size }: UserAvatarProps) {
  const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)]
  const avatarSize = sizes[size]
  return (
    <div className={`flex flex-row items-center justify-center gap-2 rounded-full ${randomColor} ${avatarSize}`}>
      <div>{user.firstName.charAt(0)}{user.lastName.charAt(0)}</div>
    </div>
  )
}