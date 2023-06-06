"use client"

import type { ColumnDef, Column } from "@tanstack/react-table"
import { FileIcon, FileTextIcon, CodeIcon, BoxModelIcon  } from "@radix-ui/react-icons"


export type ResearchComponent = {
  id: string;
  views: number;
  status: "private" | "public";
  componentName: string;
  fileName: string;
  fileType: string;

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
    fileType: "file",
    fileName: "manuscript.docx",
  },
  {
    id: "2",
    views: 80,
    status: "private",
    componentName: "Code",
    fileType: "code",
    fileName: "script.js",
  },
  {
    id: "3",
    views: 200,
    status: "public",
    componentName: "Data",
    fileType: "data",
    fileName: "data.csv",
  },
  {
    id: "4",
    views: 50,
    status: "private",
    componentName: "Presentation",
    fileType: "file",
    fileName: "presentation.pptx",
  },
  {
    id: "5",
    views: 300,
    status: "public",
    componentName: "Supplementary Material",
    fileType: "paper",
    fileName: "supplementary.pdf",
  },
];

const fileIcons = {
  file: <FileIcon/>,
  paper: <FileTextIcon/>,
  code: <CodeIcon/>,
  data: <BoxModelIcon/>,
};


export const SortableHeader = ({ column, columnDisplayName, columnIcon = null }) => {

  if (columnIcon) {
    return (
      <button
        className="flex items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        {columnIcon}
      </button>
    )
  }

  const isSorted = column.getIsSorted()

  return (
    <button
      className={isSorted ? "uppercase font-normal text-xs tracking-widest text-white" : "uppercase font-normal text-xs tracking-widest"}
      onClick={() => column.toggleSorting(isSorted === "asc")}
    >
      {columnDisplayName}
    </button>
  ) 
}


const FairIndicator = (isFair: boolean) => {

  if (isFair === true) {
    return (
      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 " />
    )
  } else {
    return (
      <div className="w-1.5 h-1.5 rounded-full bg-red-500 " />
    )
  }


}

export const columns: ColumnDef<ResearchComponent>[] = [
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <SortableHeader
          column={column}
          columnDisplayName="Status"
          columnIcon={<div className="w-2 h-2 border rounded-full border-white/10" />}
        />
      )
    },
    cell: ({ row }) => {
      const status = row.getValue("status")

      const indicator = status === "public" ? <FairIndicator isFair = {true} /> : <FairIndicator isFair = {true} />

      return (indicator)

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
    cell: ({ row, column }) => {

  
      const componentName = row.getValue("componentName")
      const fileType = row.getValue("fileType") as string || null
      const fileIcon = fileIcons[fileType]

      return (
        <div className="flex items-center justify-start gap-3"> 
          {fileIcon} 
          {componentName}
        </div>
      )
    }
   
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
    cell: ({ row }) => {

      return (
        <div className="">
          {row.getValue("views")}
        </div>
      )

    }
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
    enableHiding: true, 

  },
  {
    accessorKey: "fileType",
  }
]
