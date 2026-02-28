import Container from "@/components/custom/container"
import { AnimatedGridPattern } from "@/components/custom/grid-pattern"
import HeroPage from "@/components/landing/hero"

export default function Page() {
  return (
    <div className="min-h-screen h-full flex flex-col items-center">
      <div className="relative flex min-h-screen w-full items-center justify-center bg-white dark:bg-black">
        <AnimatedGridPattern className="mask-b-from-10% mask-b-to-100%" />
        <Container>
          <HeroPage />
        </Container>
      </div>
    </div>
  )
}
