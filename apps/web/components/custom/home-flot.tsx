"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Globe, Wifi, Server, Shield, Zap, Radio } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@workspace/ui/components/card";
import { useTheme } from "next-themes";

const MiniBarChart = ({ bars = 7, dark = false }: { bars?: number; dark?: boolean }) => {
  const [heights, setHeights] = useState<number[]>(() => Array.from({ length: bars }, () => 50));
  useEffect(() => {
    setHeights(Array.from({ length: bars }, () => Math.floor(30 + Math.random() * 70)));
  }, [bars]);

  return (
    <div className="flex items-end gap-[3px] h-8">
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-[4px] rounded-sm"
          style={{
            height: `${h}%`,
            background:
              i === Math.floor(bars / 2)
                ? dark ? "#a3a3a3" : "#525252"
                : dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)",
          }}
        />
      ))}
    </div>
  );
};

const MiniUptimeBar = ({ uptime = 99.9, dark = false }: { uptime: number; dark?: boolean }) => {
  const [blocks, setBlocks] = useState<boolean[]>(() => Array.from({ length: 22 }, () => true));
  useEffect(() => {
    setBlocks(Array.from({ length: 22 }, () => Math.random() > (100 - uptime) / 100 + 0.89));
  }, [uptime]);

  return (
    <div className="flex gap-[2px]">
      {blocks.map((isUp, i) => (
        <div
          key={i}
          className="h-[5px] w-[5px] rounded-[2px]"
          style={{
          background: isUp
              ? dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"
              : dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
          }}
        />
      ))}
    </div>
  );
};

const darkCard  = "bg-neutral-900  border-neutral-800  shadow-xl rounded-xl";
const lightCard = "bg-neutral-100  border-neutral-200  shadow-xl rounded-xl";

const darkLabel  = "text-[10px] font-mono uppercase tracking-widest text-neutral-500";
const lightLabel = "text-[10px] font-mono uppercase tracking-widest text-neutral-400";

const darkValue  = "text-2xl font-mono font-bold text-neutral-100 tracking-tight";
const lightValue = "text-2xl font-mono font-bold text-neutral-800 tracking-tight";

const darkSub  = "text-[11px] font-mono text-neutral-400";
const lightSub = "text-[11px] font-mono text-neutral-500";

const darkMuted  = "text-[10px] font-mono text-neutral-600";
const lightMuted = "text-[10px] font-mono text-neutral-400";

const StatusCard = ({ title, url, ms, uptime, icon, dark = false }: any) => (
  <Card className={dark ? darkCard : lightCard}>
    <CardHeader className="pb-2 space-y-3">
      <div className="flex items-start justify-between">
        <CardDescription className={dark ? darkLabel : lightLabel}>
          {title}
        </CardDescription>
        <MiniBarChart bars={7} dark={dark} />
      </div>
      <CardTitle className={dark ? darkValue : lightValue}>
        {uptime}
        <span className={`text-base font-normal ml-1 ${dark ? "text-neutral-500" : "text-neutral-400"}`}>
          uptime
        </span>
      </CardTitle>
    </CardHeader>
    <CardFooter className="flex items-center justify-between pt-0">
      <div className="flex items-center gap-1.5">
        <motion.div
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Radio className={`h-3 w-3 ${dark ? "text-neutral-500" : "text-neutral-400"}`} />
        </motion.div>
        <span className={dark ? darkMuted : lightMuted}>{url}</span>
      </div>
      <span className={dark ? darkSub : lightSub}>{ms}ms</span>
    </CardFooter>
  </Card>
);

const MetricCard = ({ title, value, change, positive, dark = false }: any) => (
  <Card className={dark ? darkCard : lightCard}>
    <CardHeader className="pb-2 space-y-3">
      <div className="flex items-start justify-between">
        <CardDescription className={dark ? darkLabel : lightLabel}>
          {title}
        </CardDescription>
        <MiniBarChart bars={5} dark={dark} />
      </div>
      <CardTitle className={dark ? darkValue : lightValue}>
        {value}
      </CardTitle>
    </CardHeader>
    <CardFooter className="pt-0 flex items-center gap-1.5">
      <motion.div
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className={`h-1.5 w-1.5 rounded-full ${dark ? "bg-neutral-500" : "bg-neutral-400"}`}
      />
      <span className={`text-[11px] font-mono ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
        {positive ? "+" : ""}{change} this week
      </span>
    </CardFooter>
  </Card>
);

const IncidentCard = ({ title, desc, time, dark = false }: any) => (
  <Card className={dark ? darkCard : lightCard}>
    <CardHeader className="pb-2 space-y-3">
      <div className="flex items-start justify-between">
        <CardDescription className={dark ? darkLabel : lightLabel}>
          Incident
        </CardDescription>
        <MiniBarChart bars={6} dark={dark} />
      </div>
      <CardTitle className={`text-base font-mono font-bold leading-snug ${dark ? "text-neutral-100" : "text-neutral-800"}`}>
        {title}
      </CardTitle>
    </CardHeader>
    <CardFooter className="pt-0 flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <motion.div
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className={`h-1.5 w-1.5 rounded-full ${dark ? "bg-neutral-400" : "bg-neutral-500"}`}
        />
        <span className={`text-[11px] font-mono ${dark ? "text-neutral-500" : "text-neutral-400"}`}>
          {desc}
        </span>
      </div>
      <span className={dark ? darkMuted : lightMuted}>{time}</span>
    </CardFooter>
  </Card>
);

const UptimeRingCard = ({ title, value, dark = false }: any) => (
  <Card className={dark ? darkCard : lightCard}>
    <CardHeader className="pb-2 space-y-3">
      <div className="flex items-start justify-between">
        <CardDescription className={dark ? darkLabel : lightLabel}>
          {title}
        </CardDescription>
        <MiniBarChart bars={5} dark={dark} />
      </div>
      <CardTitle className={dark ? darkValue : lightValue}>
        {value}
      </CardTitle>
    </CardHeader>
    <CardFooter className="pt-0 flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <motion.div
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`h-1.5 w-1.5 rounded-full ${dark ? "bg-neutral-500" : "bg-neutral-400"}`}
        />
        <span className={dark ? darkMuted : lightMuted}>Last 30 days</span>
      </div>
      <span className={dark ? darkSub : lightSub}>0.03% down</span>
    </CardFooter>
  </Card>
);

const WIDGETS = [
  {
    id: 1, component: "status",
    props: { title: "API Gateway", url: "api.yoursite.com", ms: 142, uptime: "99.98%", icon: <Globe className="h-3.5 w-3.5" /> },
    position: { top: "8%", left: "3%" }, delay: 0, duration: 5,
  },
  {
    id: 2, component: "metric",
    props: { title: "Avg Response", value: "138ms", change: "12ms faster", positive: true },
    position: { top: "6%", right: "4%" }, delay: 0.3, duration: 4.5,
  },
  {
    id: 3, component: "status",
    props: { title: "Auth Service", url: "auth.yoursite.com", ms: 89, uptime: "100%", icon: <Shield className="h-3.5 w-3.5" /> },
    position: { bottom: "18%", left: "2.5%" }, delay: 0.6, duration: 6,
  },
  {
    id: 4, component: "incident",
    props: { title: "Incident Resolved", desc: "payments.io back up", time: "2m ago" },
    position: { bottom: "12%", right: "3%" }, delay: 0.9, duration: 5.5,
  },
  {
    id: 5, component: "metric",
    props: { title: "Active Monitors", value: "24", change: "2", positive: true },
    position: { top: "44%", left: "1.5%" }, delay: 1.1, duration: 4,
  },
  {
    id: 6, component: "uptime",
    props: { title: "Overall Uptime", value: "99.97%" },
    position: { top: "40%", right: "2.5%" }, delay: 1.4, duration: 5,
  },
];

export default function FloatingBackground() {  
  const theme = useTheme()
  const active = theme.theme == 'dark'

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {WIDGETS.map((w) => (
        <motion.div
          key={w.id}
          className="absolute"
          style={w.position}
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: [0, -10, 0], scale: 1 }}
          transition={{
            opacity: { duration: 0.7, delay: w.delay },
            scale:   { duration: 0.7, delay: w.delay },
            y: { duration: w.duration, repeat: Infinity, ease: "easeInOut", delay: w.delay },
          }}
        >
          {w.component === "status"   && <StatusCard     {...w.props} dark={active} />}
          {w.component === "metric"   && <MetricCard     {...w.props} dark={active} />}
          {w.component === "incident" && <IncidentCard   {...w.props} dark={active} />}
          {w.component === "uptime"   && <UptimeRingCard {...w.props} dark={active} />}
        </motion.div>
      ))}
    </div>
  );
}