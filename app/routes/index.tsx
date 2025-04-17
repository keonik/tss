// app/routes/index.tsx
import * as fs from "node:fs";
import UserAvatar from "@/components/auth/UserAvatar";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { signOut } from "@/lib/client-auth";
import {
	Link,
	createFileRoute,
	useNavigate,
	useRouter,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { toast } from "sonner";

const filePath = "count.txt";

async function readCount() {
	return Number.parseInt(
		await fs.promises.readFile(filePath, "utf-8").catch(() => "0"),
	);
}

const getCount = createServerFn({
	method: "GET",
}).handler(() => {
	return readCount();
});

const updateCount = createServerFn({ method: "POST" })
	.validator((d: number) => d)
	.handler(async ({ data }) => {
		const count = await readCount();
		await fs.promises.writeFile(filePath, `${count + data}`);
	});

export const Route = createFileRoute("/")({
	component: Home,
	loader: async () => await getCount(),
});

function Home() {
	const router = useRouter();
	const navigate = useNavigate();
	const state = Route.useLoaderData();
	const user = Route.useRouteContext().user;

	const handleSignOut = async () => {
		const status = await signOut();
		if (status.error) {
			toast.error("Error signing out, please try again");
			return;
		}
		navigate({ to: "/auth/sign-in" });
		toast.success("Sign out successful");
		router.invalidate();
	};
	return (
		<div className="h-svh">
			<nav className="flex items-center justify-between px-6 gap-8 py-2 bg-accent">
				<h1 className="text-2xl font-bold">TanStack Start(er)</h1>{" "}
				<div className="flex gap-4 items-center">
					<ThemeSwitcher />
					{!user ? (
						<Link to="/auth/sign-in">
							<Button variant="link">Sign In</Button>
						</Link>
					) : (
						<UserAvatar user={user} onSignOut={handleSignOut} />
					)}
				</div>
			</nav>
			<div className="flex flex-col items-center justify-center h-screen">
				<Button
					type="button"
					onClick={() => {
						updateCount({ data: 1 }).then(() => {
							router.invalidate();
						});
					}}
				>
					Add 1 to {state}?
				</Button>
			</div>
		</div>
	);
}
