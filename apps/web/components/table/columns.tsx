"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@workspace/ui/components/button";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Badge } from "@workspace/ui/components/badge";
import { ArrowUpDown, Ban, Check, Loader, LucideIcon } from "lucide-react";

type Status = "UP" | "DOWN" | "UNKNOWN"

interface statusConfig {
    icon: LucideIcon;
    color: string;
}

interface ResponseDate { 
    id: string; 
    url: string; 
    time_added: Date;
    user_id: string;
    tick?: { 
        createdAt: Date; 
        response_time: 600;
        status:"UP" | "DOWN" | "UNKNOWN"
    }
}

export type WebsiteInfo = {
  id: string;
  name: string;
  createAt: Date | undefined | string;

  active?: boolean;

  status: Status
  response: string;

  lastCheck: string
};

const statusIcons: Record<Status, statusConfig> = {
    UP: { 
        icon: Check, 
        color: "bg-green-500"
    },
    DOWN:{ 
        icon: Ban, 
        color: "bg-red-500",
    },
    UNKNOWN:{ 
        icon: Loader, 
        color:"bg-transparent"
    }
};

export const columns: ColumnDef<WebsiteInfo>[] = [ 
    { 
        id: "select", 
        header: ({ table }) => (
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
              aria-label="Select all"
            />
          ),
          cell: ({ row }) => (
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          ),
          enableSorting: false,
          enableHiding: false,
    },
    {
        accessorKey: "name", 
        header: ({ column }) => { 
            return <Button 
                variant={"ghost"}
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as WebsiteInfo["status"];
            const variant =
                status === "UP"
                    ? "outline"
                    : status === "DOWN"
                      ? "destructive"
                      : "secondary";

            return (
                <Badge variant={variant} className="text-xs text-neutral-600">
                    <StatusIcon status={status} />
                    {status === "UNKNOWN" ? "In Progress" : status}
                </Badge>
            );
        },
    },
    {
        accessorKey: "active", 
        header: "Active"
    }, 
    {
        accessorKey: "response", 
        header: "Response"
    }, 
    {
        accessorKey: "createAt",
        header: "CreatedAt"
    },
    { 
        accessorKey: "lastCheck", 
        header: "LastCheck"
    }
]


function StatusIcon({status}: {status: Status}){ 
    const Icon = statusIcons[status]

    return <div className={`${Icon.color} rounded-full `}>
        <Icon.icon className="w-3 h-3 p-[1px]" />
    </div>
}