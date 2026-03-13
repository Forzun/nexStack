"use client";
import { CommandDemo } from "@/components/custom/home-command";
import FloatingBackground from "@/components/custom/home-flot";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Page(){
    const {resolvedTheme  } = useTheme();
    const [isDark  , setIsDark] = useState<boolean>(false)
    
    useEffect(() => { 
        setIsDark(resolvedTheme === "dark");
    },[resolvedTheme])

    return <div className="relative max-h-screen max-w-screen h-full w-full flex items-center justify-center">
        <FloatingBackground active={isDark}  />
        <div className="w-full flex justify-center">
            <CommandDemo isDark={isDark} />
        </div>
    </div>
}


