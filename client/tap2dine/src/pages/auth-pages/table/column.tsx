import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../../components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "../../../components/ui/checkbox";
import { ActionButton } from "../../../components/reusables/action-button";
import { format } from "date-fns";
import { TTableResponseType } from "../../../types/response.types";
import { ModalTrigger } from "../../../components/reusables/modal-trigger";

export const columns: ColumnDef<TTableResponseType>[] = [
  {
    id: "select",
    accessorKey: "id",
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
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Table Name <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "qr_code",
    header: "QR code",
    cell: ({ row }) => {
      return (
        <ModalTrigger modalKey={"VIEW_QR"} data={row.original}>
          <Button variant={"link"} className="p-0">
            View QR
          </Button>
        </ModalTrigger>
        // <div className="flex items-center gap-2 w-14 h-14">
        //   <QRCode value={row.original.qr_code} />
        // </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      return (
        <p>{format(row.original.created_at || new Date(), "yyyy/MM/dd")}</p>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <ActionButton<TTableResponseType>
          row={row.original}
          edit={{
            key: "EDIT_TABLE",
          }}
          delete={{
            type: "table",
          }}
        />
      );
    },
  },
];
