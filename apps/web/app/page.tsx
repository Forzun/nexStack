import { AnimatedGridPattern } from "@/components/custom/grid-pattern"
import { HalfCircleTimer } from "@/components/custom/half-circle-timer"

export default function Page() {
  return (
    <div className="min-h-screen h-full flex flex-col items-center">
      <div className="relative flex min-h-screen w-full items-center justify-center bg-white dark:bg-black">
        <AnimatedGridPattern className="mask-b-from-20% mask-b-to-80%" />
        {/* Half-circle timer floating above the grid */}
        <div className="relative z-10 pb-10">
          <HalfCircleTimer duration={60} radius={180} ticks={60} />
        </div>
      </div>
    </div>
  )
}
