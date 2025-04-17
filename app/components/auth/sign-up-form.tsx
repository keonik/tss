import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/client-auth";
import { cn } from "@/lib/utils";
import { signUpSchema } from "@/lib/validator-schemas";
import { useForm } from "@tanstack/react-form";
import { Link, redirect, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { FormMessage } from "../ui/form";

export function SignUpForm({
	className,
	...props
}: React.ComponentProps<"form">) {
	const navigate = useNavigate();

	const form = useForm({
		defaultValues: {
			email: "",
			name: "",
			password: "",
			confirm: "",
		},
		validators: {
			onChange: signUpSchema,
		},
		onSubmit: async ({
			formApi,
			value: { email, name, password, confirm },
		}) => {
			if (formApi.getAllErrors().form.errors.length > 0) {
				toast.error("Please fill out all fields");
				return;
			}
			// Do something with form data
			const signup = await signUp.email({
				email: `${email}`,
				password: `${password}`,
				name: `${name}`,
			});

			if (signup.error) {
				toast.error("Error signing up, please try again", {
					description: signup.error.message,
				});
				return;
			}
			if (signup.data) {
				toast.success("Sign up successful");
				navigate({ to: "/auth/sign-in" });
				return;
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
				<h1 className="text-2xl font-bold">Sign Up</h1>
				<p className="text-muted-foreground text-sm text-balance">
					Enter your email below to sign up for an account
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
				name="name"
				// biome-ignore lint/correctness/noChildrenProp: <explanation>
				children={(field) => {
					return (
						<div className="grid gap-3">
							<Label htmlFor={field.name}>Name</Label>
							<Input
								id={field.name}
								type={field.name}
								placeholder="John Doe"
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
			<form.Field
				name="confirm"
				validators={{
					onChangeListenTo: ["password"],
					onChangeAsyncDebounceMs: 300,
					onChange: ({ value, fieldApi }) => {
						if (value !== fieldApi.form.getFieldValue("password")) {
							return "Passwords do not match";
						}
						return undefined;
					},
				}}
				// biome-ignore lint/correctness/noChildrenProp: <explanation>
				children={(field) => {
					return (
						<div className="grid gap-3">
							<Label htmlFor={field.name}>Confirm Password</Label>
							<Input
								id={field.name}
								type={"password"}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
							{field.state.meta.errors ? (
								<FormMessage>{field.state.meta.errors.join(", ")}</FormMessage>
							) : null}
						</div>
					);
				}}
			/>
			<Button type="submit">Sign Up</Button>
			{/* <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
					<span className="bg-background text-muted-foreground relative z-10 px-2">
						Or continue with
					</span>
				</div> */}
			{/* <Button variant="outline" className="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              fill="currentColor"
            />
          </svg>
          Login with GitHub
        </Button> */}

			<div className="text-center text-sm">
				Already have an account?{" "}
				<Link to="/auth/sign-in" className="underline underline-offset-4">
					Sign in
				</Link>
			</div>
		</form>
	);
}
