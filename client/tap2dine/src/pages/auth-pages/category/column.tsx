import { ColumnDef } from '@tanstack/react-table'
import { Button } from '../../../components/ui/button'
import { ArrowUpDown, EllipsisVertical, Pencil, Trash } from 'lucide-react'
import { Checkbox } from '../../../components/ui/checkbox'
import PopTrigger from '../../../components/reusables/popover-trigger'
import { Dialog, DialogTrigger, DialogContent } from '@radix-ui/react-dialog'
import DeleteModal from '../../../modal/delete-modal'


type CategoryColumn = {
    id: string
    name: string
    description: string
}

export const columns: ColumnDef<CategoryColumn>[] = [
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
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Name <ArrowUpDown className="ml-2 h-4 w-4" /></Button>
            )
        },
    },
    {
        accessorKey: 'description',
        header: 'Description',
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <div className='flex gap-2'>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size={"sm"} variant={"secondary"} className='text-white'><Pencil /></Button>
                        </DialogTrigger>
                        <DialogContent>
                        </DialogContent>
                    </Dialog>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size={"sm"} variant={"destructive"}><Trash /></Button>
                        </DialogTrigger>
                        <DialogContent>
                        <DeleteModal/>

                        </DialogContent>
                    </Dialog>
                </div>
            )
        },
    }
]