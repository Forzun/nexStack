"use client"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@workspace/ui/components/command"
import {
  Globe,
  LayoutDashboard,
  LogOut,
  LucideIcon,
  Moon,
  Plus,
  Settings,
  Sun,
} from "lucide-react"
import { useTheme } from "next-themes";
import WebsiteDialog from "./dialog";
import { Link } from "next-view-transitions";
import { useEffect, useState } from "react";

type CommandHeaderItems = {
  name: string | React.ReactElement;
  url?: string;
  icon: LucideIcon;
  disabled: boolean;
  onClick?: () => void
}

interface CommandItemData {
  [header: string]: CommandHeaderItems[];
}

const commandData: CommandItemData = {
  Suggestions: [
    {
      name: <WebsiteDialog size="non" variant="custom" title="Add Website " className="w-fit cursor-pointer flex text-xs pr-30 " />,
      icon: Plus,
      disabled: false
    },
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      disabled: false
    },
    {
      name: "LogOut",
      icon: LogOut,
      disabled: true
    }
  ],
}

export function CommandDemo() {
  const { setTheme } = useTheme();
  const { resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState<boolean>(false)

  useEffect(() => {
    setIsDark(resolvedTheme === "dark");
  }, [resolvedTheme])

  const root = isDark
    ? "w-[480px] rounded-xl border border-neutral-800 bg-neutral-950 shadow-2xl"
    : "w-[480px] rounded-xl border border-neutral-200 bg-white shadow-2xl";

  const inputWrapper = isDark
    ? "flex items-center py-1 border-b border-neutral-800 px-3 flex justify-center"
    : "flex items-center py-1 border-b border-neutral-200 px-3 flex justify-center";

  const inputCls = isDark
    ? "h-12 bg-transparent text-sm text-neutral-200 placeholder:text-neutral-600 focus:outline-none border-0 ring-0 outline-none px-10 "
    : "h-12 bg-transparent text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none border-0 ring-0 outline-none px-10";

  const groupHeading = isDark
    ? "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-neutral-600 [&_[cmdk-group-heading]]:uppercase"
    : "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-neutral-400 [&_[cmdk-group-heading]]:uppercase";

  const item = isDark
    ? "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-neutral-400 data-[selected=true]:bg-neutral-900 data-[selected=true]:text-neutral-100 cursor-pointer"
    : "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-neutral-500 data-[selected=true]:bg-neutral-100 data-[selected=true]:text-neutral-900 cursor-pointer";

  const iconBox = isDark
    ? "flex h-7 w-7 items-center justify-center rounded-md border border-neutral-800 bg-neutral-900 group-data-[selected=true]:border-neutral-700"
    : "flex h-7 w-7 items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 group-data-[selected=true]:border-neutral-300 group-data-[selected=true]:bg-white";

  const separator = isDark
    ? "my-2 h-px bg-neutral-800/60"
    : "my-2 h-px bg-neutral-200/80";

  const footer = isDark
    ? "border-t border-neutral-800 px-3 py-2 flex items-center gap-3 text-[11px] text-neutral-600"
    : "border-t border-neutral-200 px-3 py-2 flex items-center gap-3 text-[11px] text-neutral-400";

  const empty = isDark
    ? "py-8 text-center text-sm text-neutral-600"
    : "py-8 text-center text-sm text-neutral-400";

  return (
    <Command className={root}>

      <div className={inputWrapper}>
        <CommandInput
          placeholder="Type a command or search..."
          className={inputCls}
        />
      </div>

      <CommandList className="scrollbar-hide max-h-[320px] p-2">
        <CommandEmpty className={empty}>
          No results found.
        </CommandEmpty>

        <CommandGroup heading={"Suggestions"} className={groupHeading}>
          {commandData.Suggestions?.map((data, index) => (
            <CommandItem key={index} className={item} disabled={data.disabled} >
              <div className={iconBox} >
                <data.icon className="h-3.5 w-3.5" />
              </div>
              <Link href={data.url ?? "/dashboard/home"}>
                {data.name}
              </Link>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator className={separator} />

        <CommandGroup heading="Settings" className={groupHeading}>
          <CommandItem className={item}>
            <div className={iconBox}>
              <Globe className="h-3.5 w-3.5" />
            </div>
            <Link href="/dashboard/websites">
              <span>Website</span>
            </Link>
          </CommandItem>

          <CommandItem
            className={item}
            onSelect={() => setTheme(isDark ? "light" : "dark")}
          >
            <div className={iconBox}>
              {isDark
                ? <Sun className="h-3.5 w-3.5" />
                : <Moon className="h-3.5 w-3.5" />
              }
            </div>
            <div className="flex items-cneter gap-8">
              <span className="flex justify-center items-center" >{isDark ? "Light mode" : "Dark mode"}</span>
              <span className={`ml-50 text-[10px] font-mono px-1.5 py-0.5 flex rounded-full border ${isDark
                ? "border-neutral-700 text-neutral-500 bg-neutral-900"
                : "border-neutral-200 text-neutral-400 bg-neutral-100"
                }`}>
                {isDark ? "dark" : "light"}
              </span>
            </div>
          </CommandItem>

          <CommandItem className={item}>
            <div className={iconBox}>
              <Settings className="h-3.5 w-3.5" />
            </div>
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>

      <div className={footer}>
        <span><kbd className="font-mono">↑↓</kbd> navigate</span>
        <span><kbd className="font-mono">↵</kbd> select</span>
        <span><kbd className="font-mono">ESC</kbd> close</span>
        <span className="ml-auto flex items-center gap-1">
          {isDark
            ? <Moon className="h-3 w-3" />
            : <Sun className="h-3 w-3" />
          }
          <span>{isDark ? "Dark" : "Light"}</span>
        </span>
      </div>

    </Command>
  );
}