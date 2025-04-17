import { Link, createFileRoute } from "@tanstack/react-router";

import { LoginForm } from "@/components/auth/login-form";
import { Button } from "@/components/ui/button";
import { redirect } from "@tanstack/react-router";

export default function AuthPage() {
	return (
		<div className="flex size-full grow flex-col items-center justify-center gap-3">
			<LoginForm />
		</div>
	);
}

const REDIRECT_URL = "/dashboard";

export const Route = createFileRoute("/auth/sign-in")({
	beforeLoad: async ({ context, location }) => {
		if (location.pathname === "/auth/settings") {
			return;
		}
		if (context.user) {
			throw redirect({
				to: REDIRECT_URL,
			});
		}
	},
	component: AuthLayout,
});

function AuthLayout() {
	return (
		<div className="flex flex-col gap-4 p-4">
			<Button type="button" asChild className="w-fit" size="lg">
				<Link to="/">Back to Home</Link>
			</Button>
			<AuthPage />
		</div>
	);
}
