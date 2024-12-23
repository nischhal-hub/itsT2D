import { DataTable } from '../../../components/reusables/data-table'
import { columns } from './column'

export default function InventoryTable() {
  return (
    <div>
      <DataTable
        columns={columns}
        data={[]}
        functions={{
          search:{
            name: "name",
            placeholder: "Search by name..."
          },
          add: {
            label: "Add New Dishes",
          }
        }}
      />
    </div>
  )
}
