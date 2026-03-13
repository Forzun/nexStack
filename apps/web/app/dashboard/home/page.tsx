import { CommandDemo } from "@/components/custom/home-command";
import FloatingBackground from "@/components/custom/home-flot";

export default function Page(){

    return <div className="relative max-h-screen max-w-screen h-full w-full flex items-center justify-center">
        <FloatingBackground  />
        <div className="w-full flex justify-center">
            <CommandDemo />
        </div>
    </div>
}


