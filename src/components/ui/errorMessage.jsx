import { AlertCircle } from "lucide-react";
import clsx from "clsx";

export default function ErrorMessage({ message, className, iconSize = 20 }) {
    if (!message) return null;

    return (
        <div
            role="alert"
            aria-live="assertive"
            className={clsx(
                "p-4 rounded-lg border border-red-200 bg-red-50",
                "animate-fade-in",
                className,
            )}>
            <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                    <AlertCircle
                        className="text-red-600"
                        size={iconSize}
                        aria-hidden="true"
                    />
                </div>
                <div className="flex-1">
                    <h3 className="text-sm font-medium text-red-800">
                        Something went wrong
                    </h3>
                    <p className="mt-1 text-sm text-red-700">{message}</p>
                </div>
            </div>
        </div>
    );
}
