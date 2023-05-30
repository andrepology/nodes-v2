"use client"

import type { ColumnDef, Column } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

export type ResearchComponent = {
  id: string;
  views: number;
  status: "private" | "public";
  componentName: string;
  fileName: string;

  lastEdited: Date | null;
  editedBy: string | null;
  editedAction: "created" | "annotated" | "reused" | "edited" | "updated" | null

};

export const researchComponents: ResearchComponent[] = [
  {
    id: "1",
    views: 120,
    status: "public",
    componentName: "Manuscript",
    fileName: "manuscript.docx",
  },
  {
    id: "2",
    views: 80,
    status: "private",
    componentName: "Code",
    fileName: "script.js",
  },
  {
    id: "3",
    views: 200,
    status: "public",
    componentName: "Data",
    fileName: "data.csv",
  },
  {
    id: "4",
    views: 50,
    status: "private",
    componentName: "Presentation",
    fileName: "presentation.pptx",
  },
  {
    id: "5",
    views: 300,
    status: "public",
    componentName: "Supplementary Material",
    fileName: "supplementary.pdf",
  },
];


export const SortableHeader = ({ column, columnDisplayName }) => {
  return (
    <button
      className="flex items-center"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {columnDisplayName}
    </button>
  ) 
}

export const columns: ColumnDef<ResearchComponent>[] = [
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <SortableHeader
          column={column}
          columnDisplayName="Status"
        />
      )
    },
    cell: ({ row }) => {
      const status = row.getValue("status")

      const indicator = status === "public" ? "Public" : "Private"

      return (<div>{indicator}</div>)

    }
  },
  {
    accessorKey: "componentName",
    header: ({ column }) => {
      return (
        <SortableHeader
          column={column}
          columnDisplayName="Component Name"
        />
      )
    },
  },
  {
    accessorKey: "views",
    header: ({ column }) => {
      return (
        <SortableHeader
          column={column}
          columnDisplayName="Views"
        />
      )
    },
  },
  {
    accessorKey: "fileName",
    header: ({ column }) => {
      return (
        <SortableHeader
          column={column}
          columnDisplayName="File Name"
        />
      )
    },
  },
]
