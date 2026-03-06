"use client"; 

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@workspace/ui/components/button";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@workspace/ui/components/checkbox"

export type WebsiteInfo = { 
    id: string;
    name: string; 
    status: "UP" | "DOWN" | "UNKNOWN"; 
    active?: boolean; 
    createAt: Date; 
    ms: string;
}


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
            </Button>
        }
    },
    { 
        accessorKey: "status", 
        header: "Status",
    },
    {
        accessorKey: "active", 
        header: "Active"
    }, 
    {
        accessorKey: "ms", 
        header: "Ms"
    }, 
    {
        accessorKey: "createAt",
        header: "Created"
    }
]


