"use client"

import { use, useState } from "react"
import useMeasure from "react-use-measure"

import {
  ColumnDef,
  flexRender,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useRowSelection } from "@/utils/app/context"


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  

  const [measureRef, bounds] = useMeasure()
  const { width } = bounds

  const columnsToRender = width > 520 ? columns : width > 230 ? columns.slice(0, 2) : columns.slice(1,2)


    
  


  const { rowSelection, setRowSelection, setSelectedComponent } = useRowSelection()

  const table = useReactTable({
    data,
    columns: columnsToRender,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
  })


  
  

  return (
    <div 
      className="rounded-md border w-full"
      ref = {measureRef}
    >
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                
                

                return (
                  <TableHead key={header.id}>
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
                className={row.getIsSelected() ? "bg-slate-50/20" : ""}
                onClick={
                  () => {
                    table.toggleAllRowsSelected(false)

                    row.toggleSelected()

                    // TODO: server fetch

                    row.getIsSelected() ? setSelectedComponent({}) : setSelectedComponent(row.original)
                    
                  }
                }
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
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
    </div>
  )
}
