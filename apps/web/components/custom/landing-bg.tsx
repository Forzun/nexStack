import { cn } from "@workspace/ui/lib/utils";
import React from "react";

export function DotBackgroundDemo({children}: {children: React.ReactNode}) {
    return (
        <div className="relative flex h-96 w-full max-w-3xl mx-auto border border-neutral-300/40 rounded-lg items-center justify-center bg-white dark:bg-black shadow-[0_0_20px_-12px_rgba(0,0,0,0.3)] mt-10">
            <div
                className={cn(
                    "absolute inset-0",
                    "[background-size:20px_20px]",
                    "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
                    "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
                )}
            />
            {children}
        </div>
    );
}
