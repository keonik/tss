import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/client-auth";
import { cn } from "@/lib/utils";
import { signInSchema } from "@/lib/validator-schemas";
import { useForm } from "@tanstack/react-form";
import { Link, redirect, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { FormMessage } from "../ui/form";

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"form">) {
	const navigate = useNavigate();
	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onChange: signInSchema,
		},
		onSubmit: async ({ formApi, value: { email, password } }) => {
			if (formApi.getAllErrors().form.errors.length > 0) {
				toast.error("Please fill out all fields");
				return;
			}
			// Do something with form data
			const status = await signIn.email({
				email,
				password,
			});

			if (status.error) {
				toast.error("Error signing up, please try again", {
					description: status.error.message,
				});
				return;
			}
			if (status.data) {
				navigate({ to: "/dashboard" });
			}
		},
	});

	return (
		<form
			className={cn("flex flex-col gap-6", className)}
			{...props}
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
		>
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="text-2xl font-bold">Sign In</h1>
				<p className="text-muted-foreground text-sm text-balance">
					Enter your email below to login to your account
				</p>
			</div>
			<form.Field
				name="email"
				// biome-ignore lint/correctness/noChildrenProp: <explanation>
				children={(field) => {
					console.log(field.state.meta.errors);
					return (
						<div className="grid gap-3">
							<Label htmlFor={field.name}>Email</Label>
							<Input
								id={field.name}
								type={field.name}
								placeholder="m@example.com"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
							{field.state.meta.errors ? (
								<FormMessage>
									{field.state.meta.errors.map((e) => e?.message).join(", ")}
								</FormMessage>
							) : null}
						</div>
					);
				}}
			/>
			<form.Field
				name="password"
				// biome-ignore lint/correctness/noChildrenProp: <explanation>
				children={(field) => {
					return (
						<div className="grid gap-3">
							<Label htmlFor={field.name}>Password</Label>
							<Input
								id={field.name}
								type={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
							{field.state.meta.errors ? (
								<FormMessage>
									{field.state.meta.errors.map((e) => e?.message).join(", ")}
								</FormMessage>
							) : null}
						</div>
					);
				}}
			/>
			<Button type="submit">Sign In</Button>
			<div className="text-center text-sm">
				Don&apos;t have an account?{" "}
				<Link to="/auth/sign-up" className="underline underline-offset-4">
					Sign up
				</Link>
			</div>
		</form>
	);
}
