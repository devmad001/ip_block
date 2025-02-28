import { Loader2 } from "lucide-react";
import clsx from "clsx";

export default function LoadingOverlay({
    message = "Loading analytics data...",
    showText = true,
    className,
    iconSize = 40,
}) {
    return (
        <div
            role="status"
            aria-live="polite"
            className={clsx(
                "fixed inset-0 z-50 flex flex-col items-center justify-center",
                "bg-white/50 backdrop-blur-sm dark:bg-black/50",
                "transition-opacity duration-300",
                className,
            )}>
            <div className="flex flex-col items-center gap-4">
                <Loader2
                    className="animate-spin text-primary dark:text-primary-400"
                    size={iconSize}
                    aria-hidden="true"
                />
                {showText && (
                    <p className="text-sm font-medium text-muted-foreground">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}
