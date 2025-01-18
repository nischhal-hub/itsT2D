import { PhoneCall } from "lucide-react";
import { Button } from "../../../components/ui/button";
import DishCard from "./_components/dish-card";
import { toast } from "sonner";
import { DIGITAL_MENU_LOGO } from "../../../constants/images";
import PoweredBy from "./_components/powered-by";
import { useFetchDishes } from "../../../api/queries/dish.query";
import { useFetchCategories, useFetchDishesByCategory } from "../../../api/queries/category.query";
import { TCategoryResopnseType, TDishResponseType, TTableResponseType } from "../../../types/response.types";
import { useEffect, useState } from "react";
import OrderSheet from "./_components/order-sheet";
import { useParams } from "react-router";
import { useFetchTables } from "../../../api/queries/table.query";
import { useOrderContext } from "../../../hooks/useOrderContext";

export default function DigitalMenu() {
  const {tableId} = useParams();
  const {dispatch} = useOrderContext();
  const [isValidTable, setIsValidTable] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<TCategoryResopnseType | null>(null);
  const { data: allDishesData,isLoading:isLoadingDishes } = useFetchDishes();
  const { data: categoriesData,isLoading:isLoadingCategories } = useFetchCategories();
  const { data: dishesByCategory,isLoading:isLoadingCategoryDishes } = useFetchDishesByCategory({
    categoryId: selectedCategory?.id || '',
  });
  const { data: tables, isLoading: isLoadingTables } = useFetchTables();

  useEffect(()=>{
    if(isValidTable){
      dispatch({type:"SET_TABLE",payload:{tableId:tableId || "0"}});
    }
  },[isValidTable])
  
  useEffect(() => {
    if (tables && tableId) {
      const tableExists = tables.some((table: TTableResponseType) => String(table.id) === tableId);
      setIsValidTable(tableExists);
    }
  }, [tables, tableId]);


  const isLoading = isLoadingDishes || isLoadingCategories || isLoadingTables;

  const handleCategoryClick = (category: TCategoryResopnseType) => {
    setSelectedCategory(category);
  };

  const displayedDishes = selectedCategory ? dishesByCategory : allDishesData;
  return (
    <div className="w-full h-auto flex justify-center bg-primary">
      {isLoading ? (
        <div className="min-w-md min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full size-10 border-b-2 border-white"></div>
        </div>
      ) : (
        <div className="min-w-md min-h-screen gap-2 p-2 border-2 border-secondary bg-background relative">
          <PoweredBy />
          {/* logo section */}
          <div className="flex flex-col items-center justify-center pt-4">
            <div className="size-20 object-contain">
              <img src={DIGITAL_MENU_LOGO} alt="LOGO" />
            </div>
            <p className="text-lg text-stone-950 font-medium pt-2">
              Motomania Cafe & Workshop
            </p>
          </div>

          <div className="sticky top-0 bg-background">
            {/* button section */}
            <div className="py-4 flex items-center justify-center gap-4 mt-4 ">
              <Button
                variant="secondary"
                className="text-white"
                onClick={() =>
                  toast("Waiter called.", {
                    position: "top-right",
                    duration: 3000,
                    description:
                      "Please wait. A waiter will be at your service soon.",
                  })
                }
              >
                <PhoneCall />
                Call Waiter
              </Button>
              <OrderSheet />
            </div>

            {/* dish type section */}
            <div className=" mt-4 flex items-center justify-evenly gap-2 ">
              <div
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full transition-all duration-200 shadow-sm hover:shadow-md 
                  ${!selectedCategory
                    ? 'bg-primary text-white ring-2 ring-primary ring-offset-2'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  } 
                  cursor-pointer select-none active:scale-95`}
              >
                <p className="text-nowrap text-sm font-medium">All Dishes</p>
              </div>
              {categoriesData?.map((category: TCategoryResopnseType, i: number) => (
                <div
                  key={i}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-4 py-2 rounded-full transition-all duration-200 shadow-sm hover:shadow-md
                  ${selectedCategory?.id === category.id
                      ? 'bg-primary text-white ring-2 ring-primary ring-offset-2'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    } 
                  cursor-pointer select-none active:scale-95`}
                >
                  <p className="text-nowrap text-sm font-medium">{category.name}</p>
                </div>
              ))}
            </div>
            <p className="text-xl font-semibold mt-4">{selectedCategory ? selectedCategory.name : 'All Dishes'}</p>
          </div>
          {/* dishes section */}
          <div className="mt-4">
            {!isValidTable ? (
              <div className="flex flex-col items-center justify-center">
                <PhoneCall className="h-12 w-12 text-red-500 mb-2" />
                <p className="text-center font-semibold text-lg">
                  {'No such table found'}
                </p>
              </div>
            ) : displayedDishes?.length === 0 ? (
              <p className="text-center font-semibold text-lg">
                {'No dishes found'}
              </p>
            ) : (
              <div className="grid grid-cols-2 mt-4 gap-2 pb-4">
                {displayedDishes?.map((dish: TDishResponseType) => (
                  <DishCard key={dish.id} data={dish} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

