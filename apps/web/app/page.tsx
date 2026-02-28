import Container from "@/components/custom/container"
import HeroPage from "@/components/landing/hero"

export default function Page() {
  return (
    <div className="min-h-screen h-full flex flex-col items-center">
      <Container>
        <HeroPage />
      </Container>
    </div>
  )
}
