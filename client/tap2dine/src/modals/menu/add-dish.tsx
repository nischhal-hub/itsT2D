import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { Form } from "../../components/ui/form";
import FormInput from "../../components/reusables/form-input";
import useModalContext from "../../hooks/useModalContext";
import { dishSchema, TDishType } from "../../schemas/dish";
import { useAddDishMutation } from "../../api/mutations/dish.mutation";
import { MultiSelect } from "../../components/reusables/multi-select";
import { useFetchIngredients } from "../../api/queries/ingredients.query";
import { useEffect, useState } from "react";
import { TIngredientResponseType } from "../../types/response.types";

export default function AddDish() {
  const { closeModal } = useModalContext();
  const [ingredients, setIngredients] = useState<
    {
      label: string;
      value: string;
      icon?: React.ComponentType<{
        className?: string;
      }>;
    }[]
  >([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const { data } = useFetchIngredients();
  useEffect(() => {
    if (data) {
      setIngredients(
        data.map((ingredient: TIngredientResponseType) => ({
          label: ingredient.name,
          value: ingredient.id,
        })),
      );
    }
  }, [data]);

  const form = useForm<TDishType>({
    resolver: zodResolver(dishSchema),
    mode: "onChange",
    values: {
      name: "",
      description: "",
      price: 0,
      ingredients: [],
      add_ons: [],
      category: null,
    },
  });
  const { mutate } = useAddDishMutation();
  const onSubmit = (data: TDishType) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
        closeModal("ADD_DISH");
      },
    });
  };

  useEffect(() => {
    if (selectedIngredients) {
      form.setValue("ingredients", selectedIngredients);
    }
  }, [selectedIngredients, form]);

  return (
    <div>
      <p className="font-semibold">Add Dish</p>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4 mt-3"
          >
            <FormInput
              label="Dish Name"
              form={form}
              name="name"
              type="text"
              placeholder="Dish"
              required
            />

            <FormInput
              label="Description"
              form={form}
              name="description"
              type="text"
              placeholder="Description.."
            />
            <FormInput
              label="Price"
              form={form}
              name="price"
              type="number"
              placeholder="0.00"
              required
            />
            <MultiSelect
              options={ingredients}
              onValueChange={setSelectedIngredients}
              placeholder="Select Ingredients"
              variant="inverted"
              animation={2}
              maxCount={3}
            />
            <div className="flex justify-end gap-3">
              <Button
                variant={"outline"}
                className="w-full mt-4"
                onClick={() => form.reset()}
              >
                Reset
              </Button>
              <Button className="w-full mt-4">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
