export function LogoCloud() {
	return (
		<div className="grid grid-cols-2 rounded-lg bg-border shadow md:grid-cols-4">
			{logos.map((logo) => (
				<div
					className="flex items-center justify-center rounded-lg border bg-background p-8"
					key={logo.alt}
				>
					<img
						alt={logo.alt}
						className="pointer-events-none block h-4 select-none md:h-5 dark:brightness-0 dark:invert"
						height="auto"
						loading="lazy"
						src={`/technologies/${logo.src}`}
						width="auto"
					/>
				</div>
			))}
		</div>
	);
}

const logos = [
	{
		src: "/javascript.webp",
		alt: "JavaScript Logo",
	},
	{
		src: "/typescript.webp",
		alt: "TypeScript Logo",
	},
	{
		src: "/nextjs.webp",
		alt: "Next.js Logo",
	},
	{
		src: "/mongodb.webp",
		alt: "MongoDB Logo",
	},
	{
		src: "/postgresql.webp",
		alt: "PostgreSQL Logo",
	},
	{
		src: "/vercel.webp",
		alt: "Vercel Logo",
	},
	{
		src: "/reactjs.webp",
		alt: "React Logo",
	},
	{
		src: "https://storage.efferd.com/logo/clerk-wordmark.svg",
		alt: "Clerk Logo",
	},
];
