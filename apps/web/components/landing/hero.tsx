"use client"
import { Button } from "@workspace/ui/components/button"
import { ChartNoAxesCombined } from "lucide-react"
import { AnimatedBeamDemo } from "../custom/hero-beam"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function HeroPage() {

    return <div className="min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
            <motion.h1 initial={{ opacity: 0, y: 30, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.5, ease: "easeInOut" }} className="text-7xl font-extrabold text-neutral-700 tracking-tighter flex items-center gap-3">Datadog for people </motion.h1>
            <motion.p initial={{ opacity: 0, y: 30, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 1, ease: "easeInOut" }} className="text-3xl text-neutral-600">who check their AWS bill</motion.p>

            <div className="w-full h-full mt-20">
                <AnimatedBeamDemo />
            </div>
        </div>
    </div >
}

function Navbar() {
    const router = useRouter();

    return <nav className="max-w-4xl mx-auto px-3 py-2 border-b-2 border-neutral-300/40 text-sm bg-white text-gray-950 dark:text-gray-50">
        <div className="flex justify-between items-center text-neutral-500 text-sm font-light">
            <div className="flex items-center justify-center gap-5 text-sm">
                <div className="flex items-center justify-center gap-1">
                    <span className="scale-150 font-bold"><ChartNoAxesCombined className="w-4 h-3" /></span><span className="font-bold">NexStack</span>
                </div>
                <div className="flex items-center justify-center text-neutral-500 dark:text-neutral-500 gap-5 cursor-pointer">
                    <p className="hover:text-neutral-900 dark:hover:text-neutral-50">Home</p>
                    <p className="hover:text-neutral-900 dark:hover:text-neutral-50">About</p>
                    <p className="hover:text-neutral-900 dark:hover:text-neutral-50">Contact</p>
                </div>
            </div>
            <div className="flex items-center justify-end gap-1">
                <Button onClick={() => router.push("/signin")} variant={"ghost"} className="text-sm text-neutral-500 hover:bg-transparent hover:text-neutral-700 dark:hover:text-neutral-50">Sign in</Button>
                <Button onClick={() => router.push("/signup")} variant={"outline"} className="text-sm text-neutral-500 py-2 px-3 font-semibold hover:text-neutral-700 dark:hover:text-neutral-50 shadow-[0_2px_3px_-1px_theme(colors.black/0.08),0_0_0_0.5px_theme(colors.gray.950/0.18),0_1px_0_0_theme(colors.white/0.10)_inset] [background:linear-gradient(180deg,rgba(19,19,22,0)_45%,rgba(19,19,22,0.03)_55%),#fff] dark:text-gray-50  ">Sign up</Button>
            </div>
        </div>
    </nav>
}


