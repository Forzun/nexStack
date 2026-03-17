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
        svg: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Youtube-Icon--Streamline-Svg-Logos" height="24" width="24">
            <desc>
                Youtube Icon Streamline Icon: https://streamlinehq.com
            </desc>
            <path fill="#ff0000" d="M23.2314 6.3482c-0.2743 -1.0137 -1.066175 -1.80555 -2.079875 -2.07985 -1.823625 -0.49735 -9.163425 -0.49735 -9.163425 -0.49735s-7.339775 0.015075 -9.1634 0.512425c-1.0137075 0.2743 -1.805565 1.06615 -2.0798675 2.07985 -0.551613 3.24035 -0.7656271 8.17775 0.0150725 11.2885 0.2743025 1.0137 1.06616 1.80555 2.079845 2.07985 1.82365 0.49735 9.163425 0.49735 9.163425 0.49735s7.3398 0 9.163425 -0.49735c1.0137 -0.2743 1.80555 -1.06615 2.079875 -2.07985 0.58175 -3.244875 0.7611 -8.17925 -0.015075 -11.303575Z" strokeWidth="0.25"></path>
            <path fill="#ffffff" d="m9.652225 15.526575 6.08885 -3.526725 -6.08885 -3.5267v7.053425Z" strokeWidth="0.25"></path>
        </svg>
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
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Google-Icon--Streamline-Svg-Logos" height="24" width="24">
            <desc>
                Google Icon Streamline Icon: https://streamlinehq.com
            </desc>
            <path fill="#4285f4" d="M23.5151 12.2611c0 -0.9661 -0.0784 -1.6711 -0.24805 -2.4022H12.2351v4.3605h6.4755c-0.1305 1.08365 -0.8355 2.7156 -2.4022 3.8122l-0.02195 0.146 3.4881 2.702175 0.24165 0.024125c2.2194 -2.04975 3.4989 -5.0656 3.4989 -8.6428Z" strokeWidth="0.25"></path>
            <path fill="#34a853" d="M12.234975 23.75c3.17245 0 5.83575 -1.0445 7.7811 -2.8461L16.308275 18.031625c-0.9922 0.69195 -2.3239 1.175 -4.0733 1.175 -3.1072 0 -5.7444 -2.049675 -6.6845 -4.882725l-0.137775 0.0117L1.7857125 17.14255l-0.0474325 0.13185C3.670475 21.112725 7.639375 23.75 12.234975 23.75Z" strokeWidth="0.25"></path>
            <path fill="#fbbc05" d="M5.550625 14.3239c-0.248075 -0.7311 -0.391625 -1.5145 -0.391625 -2.3239 0 -0.8095 0.143575 -1.5928 0.378575 -2.3239l-0.006575 -0.1557L1.858565 6.66835l-0.120155 0.05715C0.9420575 8.3183 0.4851075 10.10695 0.4851075 12c0 1.89305 0.45695 3.6816 1.2533025 5.2744l3.812215 -2.9505Z" strokeWidth="0.25"></path>
            <path fill="#eb4335" d="M12.234975 4.7933c2.20635 0 3.69465 0.95305 4.5433 1.7495L20.094375 3.305C18.057775 1.41195 15.407425 0.25 12.234975 0.25 7.639375 0.25 3.670475 2.8872 1.73828 6.7255L5.537425 9.6761c0.95315 -2.83305 3.59035 -4.8828 6.69755 -4.8828Z" strokeWidth="0.25"></path>
        </svg>
    ),
    openai: () => (
        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"><g fill="none"><path fill="#fff" d="M6.784 9.26C8.008 8.604 9.595 7.632 9.595 7S8.008 5.396 6.784 4.74c-.643-.344-1.393.132-1.393.861v2.798c0 .729.75 1.205 1.393.86" /><path fill="#d7e0ff" fillRule="evenodd" d="M3.94 11.78c-1.44-.13-2.633-1.26-2.8-2.696A18 18 0 0 1 1 7c0-.706.06-1.402.14-2.084c.167-1.435 1.36-2.566 2.8-2.697c.996-.09 2.018-.167 3.06-.167s2.064.077 3.06.167c1.44.131 2.633 1.262 2.8 2.697c.08.682.14 1.378.14 2.084s-.06 1.402-.14 2.084c-.167 1.435-1.36 2.566-2.8 2.697c-.996.09-2.018.167-3.06.167s-2.064-.076-3.06-.167M9.595 7c0 .632-1.587 1.604-2.812 2.26c-.642.344-1.393-.132-1.393-.861V5.601c0-.729.75-1.205 1.393-.86C8.008 5.395 9.595 6.367 9.595 7" clipRule="evenodd" /><path stroke="#4147d5" strokeLinecap="round" strokeLinejoin="round" d="M1.14 9.084c.167 1.435 1.36 2.566 2.8 2.697c.996.09 2.018.167 3.06.167s2.064-.077 3.06-.167c1.44-.13 2.633-1.262 2.8-2.697c.08-.682.14-1.378.14-2.084s-.06-1.402-.14-2.084c-.167-1.435-1.36-2.566-2.8-2.697c-.996-.09-2.018-.167-3.06-.167s-2.064.077-3.06.167c-1.44.131-2.633 1.262-2.8 2.697A18 18 0 0 0 1 7c0 .706.06 1.402.14 2.084" /><path stroke="#4147d5" strokeLinecap="round" strokeLinejoin="round" d="M6.784 9.26C8.008 8.604 9.595 7.632 9.595 7S8.008 5.396 6.784 4.74c-.643-.344-1.393.132-1.393.861v2.798c0 .729.75 1.205 1.393.86" /></g></svg>
    ),
    googleDrive: () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Youtube-Icon--Streamline-Svg-Logos" height="24" width="24">
            <desc>
                Youtube Icon Streamline Icon: https://streamlinehq.com
            </desc>
            <path fill="#ff0000" d="M23.2314 6.3482c-0.2743 -1.0137 -1.066175 -1.80555 -2.079875 -2.07985 -1.823625 -0.49735 -9.163425 -0.49735 -9.163425 -0.49735s-7.339775 0.015075 -9.1634 0.512425c-1.0137075 0.2743 -1.805565 1.06615 -2.0798675 2.07985 -0.551613 3.24035 -0.7656271 8.17775 0.0150725 11.2885 0.2743025 1.0137 1.06616 1.80555 2.079845 2.07985 1.82365 0.49735 9.163425 0.49735 9.163425 0.49735s7.3398 0 9.163425 -0.49735c1.0137 -0.2743 1.80555 -1.06615 2.079875 -2.07985 0.58175 -3.244875 0.7611 -8.17925 -0.015075 -11.303575Z" strokeWidth="0.25"></path>
            <path fill="#ffffff" d="m9.652225 15.526575 6.08885 -3.526725 -6.08885 -3.5267v7.053425Z" strokeWidth="0.25"></path>
        </svg>
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
