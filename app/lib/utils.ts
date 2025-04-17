import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const seo = ({
	title,
	description,
	keywords,
	image,
}: {
	title: string;
	description?: string;
	image?: string;
	keywords?: string;
}) => {
	const tags = [
		{ title },
		{ name: "description", content: description },
		{ name: "keywords", content: keywords },
		{ name: "twitter:title", content: title },
		{ name: "twitter:description", content: description },
		{ name: "twitter:creator", content: "@tannerlinsley" },
		{ name: "twitter:site", content: "@tannerlinsley" },
		{ name: "og:type", content: "website" },
		{ name: "og:title", content: title },
		{ name: "og:description", content: description },
		...(image
			? [
					{ name: "twitter:image", content: image },
					{ name: "twitter:card", content: "summary_large_image" },
					{ name: "og:image", content: image },
				]
			: []),
	];

	return tags;
};

// https://gist.github.com/t3dotgg/a486c4ae66d32bf17c09c73609dacc5b?permalink_comment_id=5511823#gistcomment-5511823
export async function tryCatch<T, E = Error>(promise: T | Promise<T>) {
	try {
		const data = await promise;
		return [data, null] as const;
	} catch (error) {
		return [null, error as E] as const;
	}
}
