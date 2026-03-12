import { WebsiteInfo, columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { Avatar, AvatarBadge, AvatarImage } from "@workspace/ui/components/avatar";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@workspace/ui/components/dialog";
import Image from "next/image";

const data:WebsiteInfo[] = [
    {
            id: "121212112", 
            name:"google.com", 
            createAt: "2026-2-3", 
            active: false, 
            status: "DOWN", 
            response: "1 hour ago", 
            lastCheck: "1 hour ago"
    }
]

export default function Page(){
    const webData = data 

    return <div className="flex flex-1 flex-col">
        <div className="px-4 lg:px-6">
            <div className="flex items-center justify-between mt-10">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold">Welcome back!</h1>
                    <p className="text-md text-muted-foreground">Here&apos;s a list of your all websites.</p>
                </div>
                <div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Avatar size="lg" >
                        <AvatarImage src={process.env.USER_URL} alt="@shadcn" />
                        <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                    </Avatar>
                        </DialogTrigger>
                        <DialogContent className="ring-0 w-3xl" showCloseButton={false}>
                         <DialogTitle>
                           <Image className="rounded-full" alt="Profile photo" width={500} height={500} src={'https://i.pinimg.com/736x/43/24/2d/43242dd988b227641b8c33c632d967a8.jpg'} />
                         </DialogTitle>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <DataTable data={webData} columns={columns} />
        </div>
    </div>
}