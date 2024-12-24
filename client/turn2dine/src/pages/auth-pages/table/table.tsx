import { Plus } from 'lucide-react'
import { DataTable } from '../../../components/reusables/data-table'
import { Button } from '../../../components/ui/button'
import { columns } from './column'

export default function TableTable() {
  return (
    <div>
      <DataTable
        columns={columns}
        data={[]}
        functions={{
          search:{
            name: "tableName",
            placeholder: "Search by Table Name..."
          },
          add: {
            node:(
              <Button><Plus />Add Table</Button>
            )
          }
        }}
      />
    </div>
  )
}