import { Minus, Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { useState } from "react";
import useModalContext from "../hooks/useModalContext";
import { Avatar } from "../components/reusables/avatar";
import { useOrderContext } from "../hooks/useOrderContext";
const dish = {
  id: "1",
  name: "Margherita Pizza",
  description: "Classic pizza with tomato sauce, mozzarella, and basil",
  price: 12.99,
  ingredients: [
    { id: "1", name: "Tomato Sauce", default: true },
    { id: "2", name: "Mozzarella", default: true },
    { id: "3", name: "Basil", default: true },
    { id: "4", name: "Olive Oil", default: true },
  ],
  addons: [
    { id: "1", name: "Extra Cheese", price: 1.5 },
    { id: "2", name: "Mushrooms", price: 1 },
    { id: "3", name: "Olives", price: 1 },
    { id: "4", name: "Pepperoni", price: 2 },
  ],
  category: {
    id: 9,
    name: "Dinner",
    description: "",
  },
};

export default function AddOrder() {
  const { closeModal } = useModalContext();
  const { dispatch, order } = useOrderContext();
  const [quantity, setQuantity] = useState(1);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(
    dish.ingredients.filter((ing) => ing.default).map((ing) => ing.id),
  );

  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const handleIngredientToggle = (ingredientId: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredientId)
        ? prev.filter((id) => id !== ingredientId)
        : [...prev, ingredientId],
    );
  };

  const handleAddonToggle = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId],
    );
  };

  const totalPrice = (
    dish.price * quantity +
    selectedAddons.reduce((sum, addonId) => {
      const addon = dish.addons.find((a) => a.id === addonId);
      return sum + (addon ? addon.price : 0);
    }, 0)
  ).toFixed(2);

  const handleAddToOrder = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        dishId: dish.id,
        name: dish.name,
        quantity,
        ingredients: dish.ingredients.map((ing) => ({
          id: ing.id,
          name: ing.name,
          include: selectedIngredients.includes(ing.id),
        })),
        addons: dish.addons.filter((addon) =>
          selectedAddons.includes(addon.id),
        ),
        remark: `Remove ingredients from ${dish.name}: ${dish.ingredients
          .filter((ing) => !selectedIngredients.includes(ing.id))
          .map((ing) => ing.name)
          .join(", ")} `,
      },
    });

    closeModal("ADD_ORDER");
  };

  console.log(order);

  return (
    <>
      <div className="grid gap-4 py-4">
        <div className="flex items-center gap-4">
          <Avatar name={dish.name} />
          <div>
            <p className="capitalize font-bold">{dish.name}</p>
            <p className="text-gray-600">{dish.category.name}</p>
          </div>
        </div>
        <p className="text-gray-600">{dish.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">
            Rs. {dish.price.toFixed(2)}
          </span>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-xl font-semibold">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Customize Ingredients</h3>
          <div className="space-y-2">
            {dish.ingredients.map((ingredient) => (
              <div key={ingredient.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`ingredient-${ingredient.id}`}
                  checked={selectedIngredients.includes(ingredient.id)}
                  onCheckedChange={() => handleIngredientToggle(ingredient.id)}
                />
                <label
                  htmlFor={`ingredient-${ingredient.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {ingredient.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Add-ons</h3>
          <div className="space-y-2">
            {dish.addons.map((addon) => (
              <div key={addon.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`addon-${addon.id}`}
                    checked={selectedAddons.includes(addon.id)}
                    onCheckedChange={() => handleAddonToggle(addon.id)}
                  />
                  <label
                    htmlFor={`addon-${addon.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {addon.name}
                  </label>
                </div>
                <span className="text-sm font-semibold">
                  Rs. {addon.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center pt-4 border-t">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-2xl font-bold">Rs. {totalPrice}</span>
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={() => closeModal("ADD_ORDER")}>
          Cancel
        </Button>
        <Button onClick={handleAddToOrder}>Add to Order</Button>
      </div>
    </>
  );
}
