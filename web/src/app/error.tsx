"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div
            className="flex items-center justify-center min-h-[50vh]"
            role="alert"
        >
            <div className="flex flex-col items-center gap-4 text-center max-w-md px-4">
                <h2 className="text-2xl font-semibold">Something went wrong</h2>
                <p className="text-sm text-muted-foreground">
                    An unexpected error occurred. Please try again.
                </p>
                <button
                    onClick={reset}
                    className="px-4 py-2 text-sm font-medium rounded-md bg-white text-black hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                >
                    Try again
                </button>
            </div>
        </div>
    );
}
