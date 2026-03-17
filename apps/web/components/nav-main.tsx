"use client"

import { Button } from "@workspace/ui/components/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar"
import { CirclePlusIcon, MailIcon } from "lucide-react"
import { Link } from "next-view-transitions"
import { usePathname } from "next/navigation"
import WebsiteDialog from "./custom/dialog"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: React.ReactNode
  }[]
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <div
              className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground flex rounded-md py-1 px-3 items-center w-full gap-2"
            >
              <CirclePlusIcon
                className="w-4 h-6"
              />
              <WebsiteDialog size="non" variant="custom" title="Quick Create" className="w-fit cursor-pointer flex text-sm ring-0 border-none" />
            </div>
            <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <MailIcon
              />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => {
            const activeUrl = item.url === pathname
            return (
              <SidebarMenuItem key={item.title} className="mt-2">
                <SidebarMenuButton tooltip={item.title} isActive={activeUrl}>
                  <Link href={item.url} className="flex gap-2 items-center justify-center">
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
