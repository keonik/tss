import { SignUpForm } from "@/components/auth/sign-up-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/sign-up")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col gap-4 p-4">
			<Button type="button" asChild className="w-fit" size="lg">
				<Link to="/">Back to Home</Link>
			</Button>
			<div className="flex flex-col gap-4 p-4 items-center justify-center">
				<div className="min-w-md flex flex-col p-6 gap-3">
					<SignUpForm />
				</div>
			</div>
		</div>
	);
}
