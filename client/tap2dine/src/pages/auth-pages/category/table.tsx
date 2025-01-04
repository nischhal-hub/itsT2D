import { DataTable } from '../../../components/reusables/data-table'
import { Button } from '../../../components/ui/button'
import { columns } from './column'
import { Dialog, DialogContent, DialogTrigger } from '../../../components/ui/dialog'
import { useForm } from 'react-hook-form'
import { Form } from '../../../components/ui/form'
import FormInput from '../../../components/reusables/form-input'
import { categorySchema, TCategoryType } from '../../../schemas/category'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useFetchCategories } from '../../../api/queries/category.query'
import { useAddCategoryMutation } from '../../../api/mutations/category.mutation'
import useModalContext from '../../../hooks/useModalContext'

export default function CategoryTable() {
  const {openModal} = useModalContext();
  const {data} = useFetchCategories();
  return (
    <div>
      <DataTable
        columns={columns}
        data={data || []}
        functions={{
          search: {
            name: "name",
            placeholder: "Search by name..."
          },
          add: {
            node: (
                  <Button onClick={()=>openModal({key:"ADD_CATEGORY"})}><Plus/>Add Category</Button>
            )
          }
        }}
      />
    </div>
  )
}

function AddCategory() {
  const form = useForm<TCategoryType>({
    resolver: zodResolver(categorySchema),
    mode: "onChange",
    values: {
      name: "",
      description: ""
    }
  });
  const {mutate}= useAddCategoryMutation();
  const onSubmit = (data: TCategoryType) => {
    mutate(data,{
      onSuccess: () => {
        form.reset();
      }
    })
  }

  return (
    <div>
      <p className='font-semibold'>Add Category</p>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 mt-3">
            <FormInput
              label="Category Name"
              form={form}
              name="name"
              type="text"
              placeholder="Category"
              required
            />

            <FormInput
              label="Description"
              form={form}
              name="description"
              type="text"
              placeholder="Description"
            />
            <div className='flex justify-end gap-3'>
            <Button variant={"outline"} className="w-full mt-4" onClick={()=>form.reset()}>Reset</Button>
            <Button className="w-full mt-4">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}