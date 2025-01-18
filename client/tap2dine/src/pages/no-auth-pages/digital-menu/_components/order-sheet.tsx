import { Soup } from 'lucide-react';
import { useOrderContext } from '../../../../hooks/useOrderContext';
import { Button } from '../../../../components/ui/button';
import { Badge } from '../../../../components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../../../../components/ui/sheet';
import OrderSummary from './order-summary';


const OrderSheet = () => {
    const { order } = useOrderContext();

    const totalPrice = order.items.reduce((sum, item) => {
        return sum + (item.totalPrice);
    }, 0);

    const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <Sheet>
            <SheetTrigger>
                <Button variant="outline" className="relative">
                    <Soup className="mr-2" />
                    My Orders
                    {itemCount > 0 && (
                        <Badge variant="secondary" className="absolute -top-2 -right-2 rounded-full text-white">
                            {itemCount}
                        </Badge>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
                <SheetHeader className="mb-4">
                    <SheetTitle className="text-left">My Orders</SheetTitle>
                </SheetHeader>

                {order.items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[70vh] text-muted-foreground">
                        <Soup className="h-12 w-12 mb-2" />
                        <p>No items in your order yet</p>
                    </div>
                ) : (
                    <div className="space-y-4 pb-32">
                        {order.items.map((item) => (
                            <OrderSummary key={item.dishId} item={item} />
                        ))}
                    </div>
                )}

                {order.items.length > 0 && (
                    <div className="fixed bottom-0 w-full py-4 bg-background border-t">
                        <div className='w-80'>
                        <p className="pb-2 mb-2 font-semibold border-b border-border">
                            Total Price: Rs. {totalPrice}
                        </p>
                        <Button className="w-full" onClick={()=>{console.log(order)}}>Place Order</Button>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
};

export default OrderSheet;