"use client"

import { use, useState } from "react"
import useMeasure from "react-use-measure"

import * as Avatar from '@radix-ui/react-avatar'
import * as Tabs from '@radix-ui/react-tabs'

import {MagnifyingGlassIcon} from "@radix-ui/react-icons"

import Image from 'next/image'


import {
  ColumnDef,
  flexRender,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useRowSelection, useSearch } from "@/utils/app/context"


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}


const InputPlaceholder = ({isCompact}) => {

  // TODO: 1-3 LODs

  return (
    <div> <span>Search</span> or <span>Chat</span> with Research Object</div> 
  )

  



}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const { rowSelection, setRowSelection, setSelectedComponent } = useRowSelection()
  const { columnFilters, setColumnFilters } = useSearch()

  const [measureRef, bounds] = useMeasure()
  const { width } = bounds

  const columnsToRender = width > 520 ? columns : width > 230 ? columns.slice(0, 2) : columns.slice(1,2)



  const table = useReactTable({
    data,
    columns: columnsToRender,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters
    },
    initialState: {
      columnVisibility: {
        "fileType": false 
      }
    }
  })  

  return (

    <div
      className="flex flex-col gap-3"
    >
      <div
        className="rounded-md border mx-auto border-white/5 w-full"
        style={{
          backgroundColor: "rgba(22, 26, 23, 0.85)",
          backdropFilter: "blur(26px)",
          height: "45vh",
          width: "calc(100% - 18px)",
        }}
        ref={measureRef}
      >

        <Tabs.Root
          defaultValue="drive"
          className=""
        >

          <div
            className="flex pl-4 gap-4 overflow-clip"
          >
            <Image src="./drive.svg"
              alt="Drive"
              style={{
                filter: "dropShadow(10px 16px 18px rgba(0, 0, 0, 0.5))"
              }}
              width={56}
              height={56}
            />

            <Tabs.List
              className="flex py-5 gap-9 "
            >
              <Tabs.Trigger
                value="drive"
                className="text-2xl font-normal tracking-tight text-white/90">
                Drive
              </Tabs.Trigger>
              <Tabs.Trigger
                value="contributors"
                className="text-2xl font-normal tracking-tight  text-white/40">
                Contributors
              </Tabs.Trigger>
              <Tabs.Trigger
                value="activity"
                className="text-2xl tracking-tight text-white/40">
                Activity
              </Tabs.Trigger>
            </Tabs.List>
          </div>

          <Tabs.Content
            value="drive"
          >
            <Table className="" >
              <TableHeader className="border-t border-b border-white/10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="border-none">
                    {headerGroup.headers.map((header) => {

                    return (
                      <TableHead 
                        key={header.id} 
                        className={"text-white/50"}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
              </TableHeader>

              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className={row.getIsSelected() ? "bg-white/10 border-none " : "border-none"}
                      onClick={
                        () => {
                          table.toggleAllRowsSelected(false)

                        row.toggleSelected()
                        row.getIsSelected() ? setSelectedComponent({}) : setSelectedComponent(row.original)

                      }
                    }
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell 
                        key={cell.id}
                        className="text-white/60"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results. Press the Send button interact with the Research Object.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Tabs.Content>

          {/* Mocked Content for Other Tabs */}
          <Tabs.Content
            value="contributors"
          >
            <div className="h-full" />
          </Tabs.Content>

        </Tabs.Root>
      </div>

      <div
        className="relative flex text-center py-2 w-full border border-white/5  bg-slate-50/10 rounded-md pl-2 pr-4"
      >

        <Avatar.Root className="bg-white/10 shadow-md shadow-black/60 w-10 h-10 rounded-sm flex items-center text-center">
          <Avatar.Image className=" " />
          <Avatar.Fallback className={"mx-auto bg-none"} delayMs={600}>

          </Avatar.Fallback>
        </Avatar.Root>

        <input
          value={(table.getColumn("componentName")?.getFilterValue() as string) ?? ""}
          onChange={(e) => {
            table.getColumn("componentName")?.setFilterValue(e.target.value)
          }}
          className="bg-transparent outline-none grow text-center text-white placeholder-white/30"
          placeholder={ "Search or Chat with Research Object"}
        />
      </div>
    </div>
  )
}
