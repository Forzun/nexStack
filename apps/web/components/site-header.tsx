"use client"
import { Separator } from "@workspace/ui/components/separator"
import { SidebarTrigger } from "@workspace/ui/components/sidebar"
import WebsiteDialog from "./custom/dialog"
import { Plus, Search } from "lucide-react"
import { CommandDemo } from "./custom/home-command"
import { CommandDialog } from "@workspace/ui/components/command"
import { useEffect, useState } from "react"
import { Button } from "@workspace/ui/components/button"

export function SiteHeader() {
  const [open, setOpne] = useState<boolean>(false);

  const hanldeKeyOpen = (e: KeyboardEvent) => {
    if (e.key === "k" && e.ctrlKey) {
      setOpne(true)
      e.preventDefault();
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", hanldeKeyOpen);
  }, []);

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="w-full h-full flex justify-between items-center">
        <div className="flex items-center gap-1 px-4 lg:gap-2 lg:px-6">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-1 w-px data-[orientation=vertical]:h-5" />
          <h1 className="text-base font-medium">Documents</h1>
        </div>
        <div className="w-full flex items-center justify-center">
          <Button variant="outline" className="rounded-full h-full py-1 md:w-xs w-fit flex items-center justify-center" onClick={() => setOpne(true)}>
            <Search className="text-muted-foreground" />
            <div className="flex items-center justify-end w-full gap-2">
              <span className="rounded-md border bg-transparent text-xs p-1 dark:shadow-none shadow-[0_0_0_1px_rgba(255,255,255,0.07)_inset] text-muted-foreground">Ctrl</span>
              <span className="rounded-sm border bg-transparent text-xs p-1 px-1.5 dark:shadow-none shadow-[0_0_0_1px_rgba(255,255,255,0.07)_inset] text-muted-foreground">K</span>
            </div>
          </Button>
          <CommandDialog open={open} onOpenChange={setOpne} className="min-w-[480px]">
            <CommandDemo />
          </CommandDialog>
        </div>
        <div className="flex items-center gap-1 px-4 lg:gap-2 lg:px-6">
          <WebsiteDialog size={"default"} variant="outline" Icon={Plus} title="Add Website " />
        </div>
      </div>
    </header>
  )
}
