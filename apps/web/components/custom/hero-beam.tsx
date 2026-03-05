"use client"

import React, { forwardRef, useRef, useState, useEffect } from "react"

import { cn } from "@workspace/ui/lib/utils"
import { AnimatedBeam } from "@workspace/ui/components/animated_beam";
import { motion } from "motion/react"

const Circle = forwardRef<
    HTMLDivElement,
    { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "z-10 flex size-12 items-center justify-center rounded-md border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.5)]",
                className
            )}
        >
            {children}
        </div>
    )
})

Circle.displayName = "Circle"

interface WebsiteProps {
    name: string;
    ms: number;
    status: "up" | "down";
    svg: React.ReactElement;
}

const websiteData: WebsiteProps[] = [
    {
        name: "x",
        ms: 50,
        status: "up",
        svg: <svg viewBox="-0.5 -0.5 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" id="X--Streamline-Iconoir" height="16" width="16">
            <desc>
                X Streamline Icon: https://streamlinehq.com
            </desc>
            <path d="M11.133375000000001 14.11 1.2831875000000001 1.445375c-0.23112500000000002 -0.2970625 -0.019375 -0.73 0.35700000000000004 -0.73h1.869375c0.1395625 0 0.2713125 0.0644375 0.35700000000000004 0.17462499999999997l9.85025 12.6645625c0.23112500000000002 0.2971875 0.019375 0.7300625 -0.35700000000000004 0.7300625h-1.8693125c-0.139625 0 -0.271375 -0.0644375 -0.357125 -0.17462499999999997Z" stroke="#000000" strokeWidth="1"></path>
            <path d="M13.530750000000001 0.7153750000000001 1.46925 14.284625" stroke="#000000" strokeLinecap="round" strokeWidth="1"></path>
        </svg>
    },
    {
        name: "Youtube",
        ms: 30,
        status: "up",
        svg: <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"><g fill="none"><path fill="#fff" d="M6.784 9.26C8.008 8.604 9.595 7.632 9.595 7S8.008 5.396 6.784 4.74c-.643-.344-1.393.132-1.393.861v2.798c0 .729.75 1.205 1.393.86" /><path fill="#d7e0ff" fillRule="evenodd" d="M3.94 11.78c-1.44-.13-2.633-1.26-2.8-2.696A18 18 0 0 1 1 7c0-.706.06-1.402.14-2.084c.167-1.435 1.36-2.566 2.8-2.697c.996-.09 2.018-.167 3.06-.167s2.064.077 3.06.167c1.44.131 2.633 1.262 2.8 2.697c.08.682.14 1.378.14 2.084s-.06 1.402-.14 2.084c-.167 1.435-1.36 2.566-2.8 2.697c-.996.09-2.018.167-3.06.167s-2.064-.076-3.06-.167M9.595 7c0 .632-1.587 1.604-2.812 2.26c-.642.344-1.393-.132-1.393-.861V5.601c0-.729.75-1.205 1.393-.86C8.008 5.395 9.595 6.367 9.595 7" clipRule="evenodd" /><path stroke="#4147d5" strokeLinecap="round" strokeLinejoin="round" d="M1.14 9.084c.167 1.435 1.36 2.566 2.8 2.697c.996.09 2.018.167 3.06.167s2.064-.077 3.06-.167c1.44-.13 2.633-1.262 2.8-2.697c.08-.682.14-1.378.14-2.084s-.06-1.402-.14-2.084c-.167-1.435-1.36-2.566-2.8-2.697c-.996-.09-2.018-.167-3.06-.167s-2.064.077-3.06.167c-1.44.131-2.633 1.262-2.8 2.697A18 18 0 0 0 1 7c0 .706.06 1.402.14 2.084" /><path stroke="#4147d5" strokeLinecap="round" strokeLinejoin="round" d="M6.784 9.26C8.008 8.604 9.595 7.632 9.595 7S8.008 5.396 6.784 4.74c-.643-.344-1.393.132-1.393.861v2.798c0 .729.75 1.205 1.393.86" /></g></svg>
    },
    {
        name: "Dummy",
        ms: 700,
        status: "down",
        svg: <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 2048 2048"><path fill="#000000" d="M960 4q132 0 254 34t228 96t194 150t149 193t97 229t34 254q0 132-34 254t-96 228t-150 194t-193 149t-229 97t-254 34q-132 0-254-34t-228-96t-194-150t-149-193t-97-229T4 960q0-132 34-254t96-228t150-194t193-149t229-97T960 4zm0 1792q115 0 222-30t200-84t169-131t130-169t85-200t30-222q0-115-30-222t-84-200t-131-169t-169-130t-200-85t-222-30q-115 0-222 30t-200 84t-169 131t-130 169t-85 200t-30 222q0 115 30 222t84 200t131 169t169 130t200 85t222 30zm-64-388h128v128H896v-128zm64-960q66 0 124 25t101 69t69 102t26 124q0 60-19 104t-47 81t-62 65t-61 59t-48 63t-19 76v64H896v-64q0-60 19-104t47-81t62-65t61-59t48-63t19-76q0-40-15-75t-41-61t-61-41t-75-15q-40 0-75 15t-61 41t-41 61t-15 75H640q0-66 25-124t68-101t102-69t125-26z" /></svg>
    },
    {
        name: "Reddit",
        ms: 1000,
        status: "down",
        svg: <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 256 256"><circle cx="128" cy="128" r="128" fill="#FF4500" /><path fill="#FFF" d="M213.15 129.22c0-10.376-8.391-18.617-18.617-18.617a18.74 18.74 0 0 0-12.97 5.189c-12.818-9.157-30.368-15.107-49.9-15.87l8.544-39.981l27.773 5.95c.307 7.02 6.104 12.667 13.278 12.667c7.324 0 13.275-5.95 13.275-13.278c0-7.324-5.95-13.275-13.275-13.275c-5.188 0-9.768 3.052-11.904 7.478l-30.976-6.562c-.916-.154-1.832 0-2.443.458c-.763.458-1.22 1.22-1.371 2.136l-9.464 44.558c-19.837.612-37.692 6.562-50.662 15.872a18.74 18.74 0 0 0-12.971-5.188c-10.377 0-18.617 8.391-18.617 18.617c0 7.629 4.577 14.037 10.988 16.939a33.598 33.598 0 0 0-.458 5.646c0 28.686 33.42 52.036 74.621 52.036c41.202 0 74.622-23.196 74.622-52.036a35.29 35.29 0 0 0-.458-5.646c6.408-2.902 10.985-9.464 10.985-17.093ZM85.272 142.495c0-7.324 5.95-13.275 13.278-13.275c7.324 0 13.275 5.95 13.275 13.275s-5.95 13.278-13.275 13.278c-7.327.15-13.278-5.953-13.278-13.278Zm74.317 35.251c-9.156 9.157-26.553 9.768-31.588 9.768c-5.188 0-22.584-.765-31.59-9.768c-1.371-1.373-1.371-3.51 0-4.883c1.374-1.371 3.51-1.371 4.884 0c5.8 5.8 18.008 7.782 26.706 7.782c8.699 0 21.058-1.983 26.704-7.782c1.374-1.371 3.51-1.371 4.884 0c1.22 1.373 1.22 3.51 0 4.883Zm-2.443-21.822c-7.325 0-13.275-5.95-13.275-13.275s5.95-13.275 13.275-13.275c7.327 0 13.277 5.95 13.277 13.275c0 7.17-5.95 13.275-13.277 13.275Z" /></svg>
    },
    {
        name: "Shadcn ui",
        ms: 100,
        status: "up",
        svg: <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24"><path fill="#000000" d="M22.219 11.784L11.784 22.219a1.045 1.045 0 0 0 1.476 1.476L23.695 13.26a1.045 1.045 0 0 0-1.476-1.476M20.132.305L.305 20.132a1.045 1.045 0 0 0 1.476 1.476L21.608 1.781A1.045 1.045 0 0 0 20.132.305" /></svg>
    },
    {
        name: "Leetcode",
        ms: 1000,
        status: "down",
        svg: <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24"><path fill="#000000" d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514c-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233l4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" /></svg>
    }
]

export function AnimatedBeamDemo() {
    const containerRef = useRef<HTMLDivElement>(null)
    const div1Ref = useRef<HTMLDivElement>(null)
    const div2Ref = useRef<HTMLDivElement>(null)
    const div3Ref = useRef<HTMLDivElement>(null)
    const div4Ref = useRef<HTMLDivElement>(null)
    const div5Ref = useRef<HTMLDivElement>(null)
    const div6Ref = useRef<HTMLDivElement>(null)
    const div7Ref = useRef<HTMLDivElement>(null)

    const [currentIndex, setCurrentIndex] = useState(0)
    const [animating, setAnimating] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimating(true)
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % websiteData.length)
                setAnimating(false)
            }, 600)
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    const site = websiteData[currentIndex] ?? websiteData[0]!
    const isUp = site.status === "up"

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.3, ease: "easeInOut" }}
            className="relative flex h-full max-w-full items-center justify-center overflow-hidden p-10"
            ref={containerRef}
        >
            <div className="flex size-full h-full max-w-lg min-w-lg flex-col items-stretch justify-between gap-10">
                <div className="flex flex-row items-center justify-between">
                    <Circle ref={div1Ref}>
                        <Icons.googleDrive />
                    </Circle>
                    <Circle ref={div5Ref}>
                        <Icons.googleDocs />
                    </Circle>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <Circle ref={div2Ref}>
                        <Icons.notion />
                    </Circle>
                    <Circle ref={div4Ref} className="min-w-40 min-h-20 overflow-hidden rounded-xl p-2">
                        <motion.div
                            key={currentIndex}
                            initial={{ y: animating ? 0 : 40, opacity: animating ? 1 : 0, scale: animating ? 1 : 0, filter: animating ? "blur(0px)" : "blur(10px)" }}
                            animate={{ y: animating ? -40 : 0, opacity: animating ? 0 : 1, scale: animating ? 0 : 1, filter: animating ? "blur(10px)" : "blur(0px)" }}
                            transition={{
                                duration: 0.6,
                                delay: 0.1,
                                ease: "easeInOut",
                            }}
                            className={`relative border bg-neutral-100/20 w-full h-full p-3 flex gap-3 items-center rounded-xl shadow-[0_0_20px_-12px_rgba(0,0,0,0.5)] bg-neutral-100"
                                }`}
                        >
                            <span className="absolute top-0 right-0 flex h-2 w-2">
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-70 ${isUp ? "bg-emerald-400/60" : "bg-red-400/80"
                                    }`} />
                                <span className={`relative inline-flex rounded-full h-2 w-2 ${isUp ? "bg-emerald-500/60" : "bg-red-500/80"
                                    }`} />
                            </span>
                            <div className="text-sm font-bold w-9 h-9 flex items-center p-2 justify-center rounded-lg border shadow-sm shrink-0 transition-colors duration-300">
                                {site.svg}
                            </div>
                            <div className="flex flex-col leading-4 font-light text-neutral-500 flex-1">
                                <p className="text-sm">ms: {site.ms}</p>
                                <p className="text-sm">
                                    <motion.span
                                        transition={{ duration: 0.3 }}
                                        className={`font-bold ${isUp ? "text-green-400/70" : "text-red-400/80"}`}
                                    >
                                        {isUp ? "Up" : "Down"}
                                    </motion.span>
                                </p>
                            </div>
                        </motion.div>
                    </Circle>
                    <Circle ref={div6Ref}>
                        <Icons.zapier />
                    </Circle>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <Circle ref={div3Ref}>
                        <Icons.whatsapp />
                    </Circle>
                    <Circle ref={div7Ref}>
                        <Icons.messenger />
                    </Circle>
                </div>
            </div>

            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div1Ref}
                toRef={div4Ref}
                curvature={-75}
                endYOffset={-10}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div2Ref}
                toRef={div4Ref}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div3Ref}
                toRef={div4Ref}
                curvature={75}
                endYOffset={10}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div5Ref}
                toRef={div4Ref}
                curvature={-75}
                endYOffset={-10}
                reverse
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div6Ref}
                toRef={div4Ref}
                reverse
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div7Ref}
                toRef={div4Ref}
                curvature={75}
                endYOffset={10}
                reverse
            />
        </motion.div>
    )
}

const Icons = {
    notion: () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Google-Logo--Streamline-Ultimate" height="24" width="24">
            <desc>
                Google Logo Streamline Icon: https://streamlinehq.com
            </desc>
            <path fill="#ff808c" stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="m20.0157 4.47237 -2.7835 2.62086c-0.7631 -0.81506 -1.7062 -1.44047 -2.754 -1.82632 -1.0477 -0.38585 -2.1712 -0.52146 -3.2807 -0.39602 -1.1095 0.12544 -2.17428 0.50848 -3.10944 1.11853 -0.93517 0.61005 -1.7148 1.43024 -2.27669 2.39511l-3.01303 -2.3913c0.90798 -1.39584 2.12153 -2.56691 3.54884 -3.42459 1.4273 -0.85768 3.03097 -1.37953 4.68972 -1.52605 1.6587 -0.146517 3.329 0.08612 4.8846 0.68032 1.5555 0.5942 2.9556 1.5344 4.0942 2.74946Z" strokeWidth="1"></path>
            <path fill="#ffef5e" stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="m5.8496 15.6732 -2.87912 2.5922c-1.2527 -1.7938 -1.93871 -3.922 -1.9694 -6.1097 -0.030695 -2.18766 0.59534 -4.33427 1.79723 -6.16247l3.01303 2.39129c-0.65148 1.10544 -0.99188 2.36648 -0.98514 3.64958 0.00674 1.2831 0.36035 2.5406 1.0234 3.6391Z" strokeWidth="1"></path>
            <path fill="#78eb7b" stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M18.8298 20.6376c-1.1798 0.9299 -2.5374 1.6084 -3.9893 1.9939 -1.4519 0.3854 -2.9673 0.4696 -4.4529 0.2474 -1.48566 -0.2222 -2.9101 -0.7462 -4.18565 -1.5396 -1.27554 -0.7934 -2.37519 -1.8395 -3.23125 -3.0739l2.87912 -2.5921c0.51308 0.8604 1.20068 1.6039 2.01853 2.1825 0.81785 0.5785 1.74782 0.9794 2.73005 1.1767 0.9821 0.1974 1.9948 0.1868 2.9726 -0.031 0.9779 -0.2178 1.8993 -0.6379 2.7049 -1.2334l2.5539 2.8695Z" strokeWidth="1"></path>
            <path fill="#66e1ff" stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M22.9998 10.5654v2.0087c-0.0814 1.5634 -0.4954 3.0915 -1.2146 4.482 -0.7192 1.3906 -1.727 2.6116 -2.9559 3.5815l-2.5539 -2.8696c1.1579 -0.8459 2.0317 -2.0233 2.5061 -3.3765h-5.3469v-3.8261h9.5652Z" strokeWidth="1"></path>
            <path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="m2.79857 5.9937 -0.01 -0.01" strokeWidth="1"></path>
            <path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="m2.97045 18.2654 -0.01 0.01" strokeWidth="1"></path>
            <path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="m5.85961 15.6637 -0.01 0.01" strokeWidth="1"></path>
        </svg>
    ),
    openai: () => (
        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"><g fill="none"><path fill="#fff" d="M6.784 9.26C8.008 8.604 9.595 7.632 9.595 7S8.008 5.396 6.784 4.74c-.643-.344-1.393.132-1.393.861v2.798c0 .729.75 1.205 1.393.86" /><path fill="#d7e0ff" fillRule="evenodd" d="M3.94 11.78c-1.44-.13-2.633-1.26-2.8-2.696A18 18 0 0 1 1 7c0-.706.06-1.402.14-2.084c.167-1.435 1.36-2.566 2.8-2.697c.996-.09 2.018-.167 3.06-.167s2.064.077 3.06.167c1.44.131 2.633 1.262 2.8 2.697c.08.682.14 1.378.14 2.084s-.06 1.402-.14 2.084c-.167 1.435-1.36 2.566-2.8 2.697c-.996.09-2.018.167-3.06.167s-2.064-.076-3.06-.167M9.595 7c0 .632-1.587 1.604-2.812 2.26c-.642.344-1.393-.132-1.393-.861V5.601c0-.729.75-1.205 1.393-.86C8.008 5.395 9.595 6.367 9.595 7" clipRule="evenodd" /><path stroke="#4147d5" strokeLinecap="round" strokeLinejoin="round" d="M1.14 9.084c.167 1.435 1.36 2.566 2.8 2.697c.996.09 2.018.167 3.06.167s2.064-.077 3.06-.167c1.44-.13 2.633-1.262 2.8-2.697c.08-.682.14-1.378.14-2.084s-.06-1.402-.14-2.084c-.167-1.435-1.36-2.566-2.8-2.697c-.996-.09-2.018-.167-3.06-.167s-2.064.077-3.06.167c-1.44.131-2.633 1.262-2.8 2.697A18 18 0 0 0 1 7c0 .706.06 1.402.14 2.084" /><path stroke="#4147d5" strokeLinecap="round" strokeLinejoin="round" d="M6.784 9.26C8.008 8.604 9.595 7.632 9.595 7S8.008 5.396 6.784 4.74c-.643-.344-1.393.132-1.393.861v2.798c0 .729.75 1.205 1.393.86" /></g></svg>
    ),
    googleDrive: () => (
        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"><g fill="none"><path fill="#fff" d="M6.784 9.26C8.008 8.604 9.595 7.632 9.595 7S8.008 5.396 6.784 4.74c-.643-.344-1.393.132-1.393.861v2.798c0 .729.75 1.205 1.393.86" /><path fill="#d7e0ff" fillRule="evenodd" d="M3.94 11.78c-1.44-.13-2.633-1.26-2.8-2.696A18 18 0 0 1 1 7c0-.706.06-1.402.14-2.084c.167-1.435 1.36-2.566 2.8-2.697c.996-.09 2.018-.167 3.06-.167s2.064.077 3.06.167c1.44.131 2.633 1.262 2.8 2.697c.08.682.14 1.378.14 2.084s-.06 1.402-.14 2.084c-.167 1.435-1.36 2.566-2.8 2.697c-.996.09-2.018.167-3.06.167s-2.064-.076-3.06-.167M9.595 7c0 .632-1.587 1.604-2.812 2.26c-.642.344-1.393-.132-1.393-.861V5.601c0-.729.75-1.205 1.393-.86C8.008 5.395 9.595 6.367 9.595 7" clipRule="evenodd" /><path stroke="#4147d5" strokeLinecap="round" strokeLinejoin="round" d="M1.14 9.084c.167 1.435 1.36 2.566 2.8 2.697c.996.09 2.018.167 3.06.167s2.064-.077 3.06-.167c1.44-.13 2.633-1.262 2.8-2.697c.08-.682.14-1.378.14-2.084s-.06-1.402-.14-2.084c-.167-1.435-1.36-2.566-2.8-2.697c-.996-.09-2.018-.167-3.06-.167s-2.064.077-3.06.167c-1.44.131-2.633 1.262-2.8 2.697A18 18 0 0 0 1 7c0 .706.06 1.402.14 2.084" /><path stroke="#4147d5" strokeLinecap="round" strokeLinejoin="round" d="M6.784 9.26C8.008 8.604 9.595 7.632 9.595 7S8.008 5.396 6.784 4.74c-.643-.344-1.393.132-1.393.861v2.798c0 .729.75 1.205 1.393.86" /></g></svg>
    ),
    whatsapp: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24"><path fill="#000000" d="M22.219 11.784L11.784 22.219a1.045 1.045 0 0 0 1.476 1.476L23.695 13.26a1.045 1.045 0 0 0-1.476-1.476M20.132.305L.305 20.132a1.045 1.045 0 0 0 1.476 1.476L21.608 1.781A1.045 1.045 0 0 0 20.132.305" /></svg>
    ),
    googleDocs: () => (
        <svg viewBox="-0.5 -0.5 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" id="X--Streamline-Iconoir" height="16" width="16">
            <desc>
                X Streamline Icon: https://streamlinehq.com
            </desc>
            <path d="M11.133375000000001 14.11 1.2831875000000001 1.445375c-0.23112500000000002 -0.2970625 -0.019375 -0.73 0.35700000000000004 -0.73h1.869375c0.1395625 0 0.2713125 0.0644375 0.35700000000000004 0.17462499999999997l9.85025 12.6645625c0.23112500000000002 0.2971875 0.019375 0.7300625 -0.35700000000000004 0.7300625h-1.8693125c-0.139625 0 -0.271375 -0.0644375 -0.357125 -0.17462499999999997Z" stroke="#000000" strokeWidth="1"></path>
            <path d="M13.530750000000001 0.7153750000000001 1.46925 14.284625" stroke="#000000" strokeLinecap="round" strokeWidth="1"></path>
        </svg>
    ),
    zapier: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24"><path fill="#000000" d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514c-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233l4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" /></svg>
    ),
    messenger: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 2048 2048"><path fill="#000000" d="M960 4q132 0 254 34t228 96t194 150t149 193t97 229t34 254q0 132-34 254t-96 228t-150 194t-193 149t-229 97t-254 34q-132 0-254-34t-228-96t-194-150t-149-193t-97-229T4 960q0-132 34-254t96-228t150-194t193-149t229-97T960 4zm0 1792q115 0 222-30t200-84t169-131t130-169t85-200t30-222q0-115-30-222t-84-200t-131-169t-169-130t-200-85t-222-30q-115 0-222 30t-200 84t-169 131t-130 169t-85 200t-30 222q0 115 30 222t84 200t131 169t169 130t200 85t222 30zm-64-388h128v128H896v-128zm64-960q66 0 124 25t101 69t69 102t26 124q0 60-19 104t-47 81t-62 65t-61 59t-48 63t-19 76v64H896v-64q0-60 19-104t47-81t62-65t61-59t48-63t19-76q0-40-15-75t-41-61t-61-41t-75-15q-40 0-75 15t-61 41t-41 61t-15 75H640q0-66 25-124t68-101t102-69t125-26z" /></svg>
    ),
}
