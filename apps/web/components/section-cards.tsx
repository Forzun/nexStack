"use client"

import { useWebsite } from "@/hooks/useWebsites"
import { Badge } from "@workspace/ui/components/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { TrendingUpIcon, TrendingDownIcon, Radio } from "lucide-react"
import { NumberTicker } from "./custom/Number-Ticker"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

const MiniBarChart = ({ bars = 7 }: { bars?: number; }) => {
  const { resolvedTheme } = useTheme();
  const [dark, setDart] = useState<boolean>(false)
  const [heights, setHeights] = useState<number[]>(() => Array.from({ length: bars }, () => 50));
  useEffect(() => {
    setHeights(Array.from({ length: bars }, () => Math.floor(30 + Math.random() * 70)));
    setDart(resolvedTheme === "dark")
  }, [bars, resolvedTheme]);

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

export function SectionCards() {
  const { dashboardStatus } = useWebsite()

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total websites</CardDescription>
          <div className="flex gap-1 items-center content-center">
            <Radio />
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              <NumberTicker value={dashboardStatus.websites} />
            </CardTitle>
          </div>
          <CardAction>
            {MiniBarChart({ bars: 7 })}
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Monitoring {dashboardStatus.websites} active websites{" "}
            <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Checked every 3 minutes
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Up Time</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            <NumberTicker value={dashboardStatus.upTime} />%
          </CardTitle>
          <CardAction>
            {MiniBarChart({ bars: 7 })}
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Overall uptime across all websites{" "}
            <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Based on latest health checks
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>In Active</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            <NumberTicker startValue={50} value={dashboardStatus.inActive} />%
          </CardTitle>
          <CardAction>
            {MiniBarChart({ bars: 7 })}
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            In Active websites status{" "}
            <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Calculated from recent checks</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Average Response</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            <NumberTicker value={dashboardStatus.avgResponse} />ms
          </CardTitle>
          <CardAction>
            {MiniBarChart({ bars: 7 })}
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Steady performance increase{" "}
            <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Meets growth projections</div>
        </CardFooter>
      </Card>
    </div>
  )
}
