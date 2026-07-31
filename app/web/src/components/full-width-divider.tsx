import { cn } from "@/lib/utils";

type FullWidthDividerProps = React.ComponentProps<"div"> & {
	contained?: boolean;
	position?: "top" | "bottom";
};

export function FullWidthDivider({
	className,
	contained = false,
	position,
	...props
}: FullWidthDividerProps) {
	return (
		<div
			aria-hidden="true"
			className={cn(
				"pointer-events-none absolute h-px bg-border",
				// full-bleed (default)
				"data-[contained=false]:left-1/2 data-[contained=false]:w-143 data-[contained=false]:-translate-x-[calc(50%+20px)]",
				// contained
				"data-[contained=true]:inset-x-0 data-[contained=true]:w-full",
				// position
				position &&
					"data-[position=top]:-top-px data-[position=bottom]:-bottom-px",
				className
			)}
			data-contained={contained}
			data-position={position}
			{...props}
		/>
	);
}
