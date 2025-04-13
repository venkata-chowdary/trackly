"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  IconCircleCheckFilled,
  IconLoader,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconPlus,
  IconNotebook,
} from "@tabler/icons-react";
import { RefreshCw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Simplified Columns (removed extra components such as row selection and actions)
const columns = [
  {
    accessorKey: "jobTitle",
    header: "Job Title",
    cell: ({ row }) => row.original.jobTitle,
  },
  {
    accessorKey: "company",
    header: "Company",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="px-1.5">
          {row.original.company}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (row.original.status)
  },
  {
    accessorKey: "platform",
    header: "Platform",
    cell: ({ row }) => (
      <Badge variant="outline" className="px-1.5">
        {row.original.platform}
      </Badge>
    ),
  },
  {
    accessorKey: "jobType",
    header: "Job Type",
    cell: ({ row }) => (row.original.jobType)
  },
  {
    accessorKey: "appliedDate",
    header: "Applied Date",
    cell: ({ row }) => (row.original.appliedDate)
  },

  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => (
      <div className="overflow-hidden text-ellipsis max-w-[120px]">
        {row.original.jobTitle}
      </div>

    )
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => (row.original.location)
  },
  // {
  //   accessorKey: "target",
  //   header: () => <div className="text-right">Target</div>,
  //   cell: ({ row }) => (
  //     <form onSubmit={(e) => e.preventDefault()}>
  //       <Label htmlFor={`${row.original.id}-target`} className="sr-only">
  //         Target
  //       </Label>
  //       <Input
  //         className="hover:bg-input/30 focus-visible:bg-background h-8 w-16 border-transparent bg-transparent text-right shadow-none"
  //         defaultValue={row.original.target}
  //         id={`${row.original.id}-target`}
  //       />
  //     </form>
  //   ),
  // },
  // {
  //   accessorKey: "reviewer",
  //   header: "Reviewer",
  //   cell: ({ row }) => {
  //     const reviewer = row.original.reviewer;
  //     return reviewer && reviewer !== "Assign reviewer" ? (
  //       reviewer
  //     ) : (
  //       <Select defaultValue="">
  //         <SelectTrigger
  //           className="w-38"
  //           size="sm"
  //           id={`${row.original.id}-reviewer`}
  //         >
  //           <SelectValue placeholder="Assign reviewer" />
  //         </SelectTrigger>
  //         <SelectContent align="end">
  //           <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
  //           <SelectItem value="Jamik Tashpulatov">
  //             Jamik Tashpulatov
  //           </SelectItem>
  //           <SelectItem value="Emily Whalen">Emily Whalen</SelectItem>
  //         </SelectContent>
  //       </Select>
  //     );
  //   },
  // },
];

export function DataTable({ data: initialData }) {
  const [data] = React.useState(initialData);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 12,
  });

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnVisibility, columnFilters, pagination },
    getRowId: (row) => row.id.toString(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-row gap-4 justify-end">
        <Button variant="outline" size="sm">
          <RefreshCw /> Load
        </Button>
        <Button variant="outline" size="sm">
          <IconNotebook />
          <span className="hidden lg:inline">Add Job</span>
        </Button>
      </div>
      <div>
        <div className="overflow-hidden rounded-lg border mb-4">
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between pr-0 pl-1">
          <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
            {table.getFilteredRowModel().rows.length} row(s)
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select value={`${table.getState().pagination.pageSize}`} onValueChange={(value) => { table.setPageSize(Number(value)); }}>
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue placeholder={table.getState().pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[12, 24, 36].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
                <span className="sr-only">Go to first page</span>
                <IconChevronsLeft />
              </Button>
              <Button variant="outline" className="h-8 w-8 p-0" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                <span className="sr-only">Go to previous page</span>
                <IconChevronLeft />
              </Button>
              <Button variant="outline" className="h-8 w-8 p-0" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                <span className="sr-only">Go to next page</span>
                <IconChevronRight />
              </Button>
              <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
                <span className="sr-only">Go to last page</span>
                <IconChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
