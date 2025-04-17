import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { User } from "better-auth";
import { LogOut, Settings } from "lucide-react";
import type React from "react";
import { buttonVariants } from "../ui/button";

interface UserAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
	user: User;
	onSettings?: () => void;
	onSignOut: () => void;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
	user,
	onSettings,
	onSignOut,
	...props
}) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar
					{...props}
					className={cn(
						buttonVariants({ size: "icon", variant: "outline" }),
						"cursor-pointer",
					)}
				>
					{user.image ? <AvatarImage src={user.image} alt={user.name} /> : null}
					<AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>{user.email}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={onSettings}
					disabled={!onSettings}
					className="flex items-center gap-4"
				>
					<Settings />
					<p>Settings</p>
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={onSignOut}
					className="flex items-center gap-4"
				>
					<LogOut />
					<p>Sign Out</p>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserAvatar;
