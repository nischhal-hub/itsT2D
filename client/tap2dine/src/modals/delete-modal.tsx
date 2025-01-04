import { Button } from "../components/ui/button";
import { DELETE } from "../constants/images";

export default function DeleteModal() {
  return (
    <div>
        <p>Are you sure you want to delete this item?</p>
        <div className="flex justify-center items-center">
          <img src={DELETE} alt="delete illustration girl" width={100}/>
        </div>
        <div className='flex gap-3'>
            <Button variant={"destructive"} className="w-full mt-4">Delete</Button>
            <Button variant="ghost" className="w-full mt-4">Cancel</Button>
        </div>
    </div>
  )
}
