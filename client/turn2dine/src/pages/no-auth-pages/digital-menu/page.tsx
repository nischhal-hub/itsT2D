import { PhoneCall, Soup } from "lucide-react";
import { Button } from "../../../components/ui/button";
import DishCard from "./_components/dish-card";
import { toast } from "sonner";
import { Toaster } from "../../../components/ui/sonner";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../components/ui/sheet"

export default function DigitalMenu() {
  return (
    <div className=" w-full min-h-screen gap-2 p-2">
      <Toaster />
      {/* logo section */}
      <div className="flex flex-col items-center justify-center pt-4">
        <div className="w-20 h-20 bg-stone-950 text-white rounded-full flex items-center justify-center">
          <p className="text-3xl font-medium">MM</p>
        </div>
        <p className="text-lg text-stone-950 font-medium pt-2">Motomania Cafe & Workshop</p>
      </div>

      {/* button section */}
      <div className="sticky top-4 flex items-center justify-center gap-4 mt-4 bg-background">
        <Button variant="secondary" className="text-white" onClick={() => toast("Waiter called.")}><PhoneCall />Call Waiter</Button>
        <Sheet>
          <SheetTrigger><Button variant="outline"><Soup />My Orders</Button></SheetTrigger>
          <SheetContent>
            <SheetHeader className="mb-4">
              <SheetTitle className="text-left">My orders</SheetTitle>
            </SheetHeader>
            <DishCard/>
            <SheetFooter className="mt-4">
              <Button className="w-full">Place order</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* dish type section */}
      <div className="sticky top-20 mt-4 flex items-center justify-evenly overflow-y-scroll gap-2 bg-background">
        {
          Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="px-2 py-[2px] bg-black text-white rounded-md">
              <p className="text-nowrap text-base">Dish type {i + 1}</p>
            </div>
          ))
        }
      </div>
      {/* dishes section */}
      <div className="mt-4">
        <p className="sticky top-28 text-xl font-semibold bg-background">Dish Type 1</p>
        <div className="grid grid-cols-2 mt-4 gap-2 pb-4">
          <DishCard />
          <DishCard />
          <DishCard />
          <DishCard />
          <DishCard />
          <DishCard />
          <DishCard />
        </div>
      </div>
    </div>
  )
}
