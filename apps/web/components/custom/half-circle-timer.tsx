"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"
import { cn } from "@workspace/ui/lib/utils"

interface HalfCircleTimerProps {
    className?: string
    /** Total duration in seconds for one full sweep (default 60) */
    duration?: number
    /** Radius of the half circle in px (default 180) */
    radius?: number
    /** Number of tick marks around the arc (default 60) */
    ticks?: number
}

export function HalfCircleTimer({
    className,
    duration = 60,
    radius = 180,
    ticks = 60,
}: HalfCircleTimerProps) {
    const [progress, setProgress] = useState(0) // 0 → 1
    const startRef = useRef<number | null>(null)
    const rafRef = useRef<number | null>(null)

    useEffect(() => {
        const animate = (timestamp: number) => {
            if (startRef.current === null) startRef.current = timestamp
            const elapsed = (timestamp - startRef.current) / 1000 // seconds
            setProgress((elapsed % duration) / duration)
            rafRef.current = requestAnimationFrame(animate)
        }
        rafRef.current = requestAnimationFrame(animate)
        return () => {
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
        }
    }, [duration])

    // SVG viewport: centred so the flat edge of the semicircle sits at the bottom
    const cx = radius + 20          // padding
    const cy = radius + 20
    const svgW = (radius + 20) * 2
    const svgH = radius + 40        // half-circle height + padding

    // Arc angle: progress sweeps from π (180°) → 0 (0°) left-to-right across the top
    const sweepAngle = Math.PI - progress * Math.PI // maps 0→1 to π→0
    const handX = cx + radius * Math.cos(sweepAngle)
    const handY = cy - radius * Math.sin(sweepAngle)

    // Generate tick positions along the upper semicircle (angles π→0)
    const tickElements = Array.from({ length: ticks }, (_, i) => {
        const angle = Math.PI - (i / (ticks - 1)) * Math.PI
        const isMajor = i % 5 === 0
        const innerR = radius - (isMajor ? 18 : 10)
        const outerR = radius

        const x1 = cx + innerR * Math.cos(angle)
        const y1 = cy - innerR * Math.sin(angle)
        const x2 = cx + outerR * Math.cos(angle)
        const y2 = cy - outerR * Math.sin(angle)

        // Is this tick "lit" (behind the sweep hand)?
        const tickProgress = i / (ticks - 1)
        const isActive = tickProgress <= progress

        return { x1, y1, x2, y2, isMajor, isActive, angle, i }
    })

    // Circle dots at major tick positions
    const dotRadius = 3.5

    return (
        <div className={cn("relative flex items-end justify-center select-none", className)}>
            <svg
                width={svgW}
                height={svgH}
                viewBox={`0 0 ${svgW} ${svgH}`}
                overflow="visible"
            >
                {/* ── Background arc track ── */}
                <path
                    d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
                    fill="none"
                    stroke="rgba(148,163,184,0.15)"
                    strokeWidth={2}
                />

                {/* ── Active progress arc ── */}
                {progress > 0 && (() => {
                    const startX = cx - radius
                    const startY = cy
                    const endX = handX
                    const endY = handY
                    const largeArc = progress > 0.5 ? 1 : 0
                    return (
                        <motion.path
                            d={`M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY}`}
                            fill="none"
                            stroke="url(#arcGrad)"
                            strokeWidth={2.5}
                            strokeLinecap="round"
                        />
                    )
                })()}

                {/* ── Gradient for progress arc ── */}
                <defs>
                    <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#a855f7" stopOpacity={1} />
                    </linearGradient>
                    <radialGradient id="handGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#a855f7" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
                    </radialGradient>
                </defs>

                {/* ── Tick marks ── */}
                {tickElements.map(({ x1, y1, x2, y2, isMajor, isActive, i }) => (
                    <line
                        key={i}
                        x1={x1} y1={y1} x2={x2} y2={y2}
                        stroke={
                            isActive
                                ? isMajor ? "#a855f7" : "#818cf8"
                                : "rgba(148,163,184,0.25)"
                        }
                        strokeWidth={isMajor ? 2 : 1}
                        strokeLinecap="round"
                    />
                ))}

                {/* ── Circle dots at major ticks ── */}
                {tickElements
                    .filter(({ isMajor }) => isMajor)
                    .map(({ angle, isActive, i }) => {
                        const dotR = radius + 10
                        const dotX = cx + dotR * Math.cos(angle)
                        const dotY = cy - dotR * Math.sin(angle)
                        return (
                            <circle
                                key={`dot-${i}`}
                                cx={dotX}
                                cy={dotY}
                                r={dotRadius}
                                fill={isActive ? "#a855f7" : "rgba(148,163,184,0.3)"}
                                className="transition-colors duration-300"
                            />
                        )
                    })}

                {/* ── Centre pivot dot ── */}
                <circle cx={cx} cy={cy} r={6} fill="#a855f7" />
                <circle cx={cx} cy={cy} r={3} fill="#fff" />

                {/* ── Sweep hand ── */}
                <line
                    x1={cx} y1={cy}
                    x2={handX} y2={handY}
                    stroke="#a855f7"
                    strokeWidth={2}
                    strokeLinecap="round"
                />

                {/* ── Glow at hand tip ── */}
                <circle cx={handX} cy={handY} r={14} fill="url(#handGlow)" />
                <circle cx={handX} cy={handY} r={5} fill="#a855f7" />
                <circle cx={handX} cy={handY} r={2.5} fill="#fff" />

                {/* ── Base line ── */}
                <line
                    x1={cx - radius - 10} y1={cy}
                    x2={cx + radius + 10} y2={cy}
                    stroke="rgba(148,163,184,0.2)"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                />
            </svg>

            {/* ── Elapsed seconds label ── */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8 text-center">
                <span className="text-3xl font-bold tabular-nums bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    {String(Math.floor(progress * duration)).padStart(2, "0")}
                </span>
                <span className="text-sm text-slate-400 ml-1">s</span>
            </div>
        </div>
    )
}
