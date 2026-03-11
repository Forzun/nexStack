import { Separator } from "@workspace/ui/components/separator"
import { SidebarTrigger } from "@workspace/ui/components/sidebar"
import WebsiteDialog from "./custom/dialog"

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="w-full h-full flex justify-between">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-1 w-px data-[orientation=vertical]:h-5" />
        <h1 className="text-base font-medium">Documents</h1>
      </div>
      <div className="flex items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <WebsiteDialog />
      </div>
      </div>
    </header>
  )
}
