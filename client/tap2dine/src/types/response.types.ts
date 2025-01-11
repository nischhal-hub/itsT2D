export type TTableResponseType = {
  id: string;
  name: string;
  created_at: string;
  qr_code: string;
};
export type TCategoryResopnseType = {
  id: string;
  name: string;
  description: string;
};
export type TIngredientResponseType = {
  id: string;
  name: string;
  quantity_available: number;
};

export type TDishResponseType = {
  id: string;
  name: string;
  description: string;
  price: number;
  ingredients: TIngredientResponseType[];
  add_ons: string[];
  category: TCategoryResopnseType;
};
