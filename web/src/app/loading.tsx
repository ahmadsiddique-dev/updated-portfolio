export default function Loading() {
    return (
        <div
            className="flex items-center justify-center min-h-[50vh]"
            role="status"
            aria-label="Loading page content"
        >
            <div className="flex flex-col items-center gap-4">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
                <p className="text-sm text-muted-foreground animate-pulse">
                    Loading...
                </p>
            </div>
        </div>
    );
}
