import { z } from "zod";

export const signUpSchema = z.object({
	email: z.string().email("Must be a valid email"),
	name: z.string().min(3, "Name is required"),
	password: z.string().min(8, "Password is required"),
	confirm: z.string(),
});

export const signInSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});
