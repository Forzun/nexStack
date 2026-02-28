
import { cn } from "@workspace/ui/lib/utils"

export default function Container({ className, children }: { className?: string, children?: React.ReactNode }) {

    return <div className={cn("max-w-7xl min-w-5xl mx-auto relative min-h-screen", className)}>
        {children}
    </div>
}
