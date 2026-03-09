"use client";
import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@workspace/ui/components/sidebar"
import { DataTable } from "../../components/table/data-table"
import { columns } from "@/components/table/columns"
import { useWebsite } from "@/hooks/useWebsites";

// async function getData(): Promise<WebsiteInfo[]>{ 
//   const date = timeAgo("Sat Mar 07 2026 11:31:45 GMT+0530 (India Standard Time)")

//   return[ 
//     { 
//       id: "1",
//       name:"google.com", 
//       status: "UNKNOWN",
//       active: true, 
//       createAt: date,
//       ms:"100"
//     }
//   ]
// }

export default function Page() { 
  const { websites } = useWebsite();
  console.log(websites)

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
                <div className="px-4 lg:px-6">
                 <DataTable data={websites} columns={columns} />
                </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
