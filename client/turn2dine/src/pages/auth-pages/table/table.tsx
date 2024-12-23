import { DataTable } from '../../../components/reusables/data-table'
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
            label: "Add New Tables",
          }
        }}
      />
    </div>
  )
}
