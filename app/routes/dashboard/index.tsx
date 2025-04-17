import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
	beforeLoad: async ({ context }) => {
		if (!context.user) {
			throw redirect({
				to: "/auth/sign-in",
			});
		}
	},
	component: DashboardIndex,
});

function DashboardIndex() {
	return (
		<div className="flex flex-col gap-1">
			Dashboard index page
			<pre className="rounded-md border bg-card p-1 text-card-foreground">
				routes/dashboard/index.tsx
			</pre>
		</div>
	);
}
