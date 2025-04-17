import { usernameClient } from "better-auth/client/plugins";
import { multiSessionClient } from "better-auth/client/plugins";
// https://better-auth.vercel.app/docs/installation#create-client-instance
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	/** the base url of the server (optional if you're using the same domain) */
	baseURL: process.env.VITE_BASE_URL,
	plugins: [usernameClient(), multiSessionClient()],
	basePath: "/api/auth",
});

export const { signIn, signUp, useSession, multiSession, signOut } = authClient;
