import { db } from "@/lib/server/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { username } from "better-auth/plugins";
import { multiSession } from "better-auth/plugins";

export const auth = betterAuth({
	baseURL: process.env.VITE_BASE_URL,
	database: drizzleAdapter(db, {
		provider: "pg", // or "mysql", "sqlite"
	}),
	// https://www.better-auth.com/docs/concepts/session-management#session-caching
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60, // 5 minutes
		},
	},
	// https://www.better-auth.com/docs/concepts/oauth
	// socialProviders: {
	// 	github: {
	// 		clientId: process.env.GITHUB_CLIENT_ID!,
	// 		clientSecret: process.env.GITHUB_CLIENT_SECRET!,
	// 	},
	// 	google: {
	// 		clientId: process.env.GOOGLE_CLIENT_ID!,
	// 		clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
	// 	},
	// 	discord: {
	// 		clientId: process.env.DISCORD_CLIENT_ID!,
	// 		clientSecret: process.env.DISCORD_CLIENT_SECRET!,
	// 	},
	// },

	// https://www.better-auth.com/docs/authentication/email-password
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: false,
		minPasswordLength: 8,
		maxPasswordLength: 32,
	},
	plugins: [username(), multiSession()],
});
