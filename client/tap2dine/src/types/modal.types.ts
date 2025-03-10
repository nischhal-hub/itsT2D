import { TDeleteItem } from "../api/mutations/delete.mutation";
import { TModalKeys } from "../modals/data";
import { TCategoryType } from "../schemas/category";
import { TIngredientType } from "../schemas/ingredient";
import { TAddonResopnseType, TDishResponseType, TTableResponseType } from "./response.types";
export type ModalType<K extends TModalKeys> = {
  initiatorName?: string;
  data?:Partial<TModalDataMap[K]>;
};

export interface TModalDataMap {
  DELETE_ITEM: {
    type: TDeleteItem["type"];
  };
  EDIT_CATEGORY: TCategoryType;
  EDIT_INGREDIENT: TIngredientType;
  EDIT_TYPE: TTableResponseType;
  EDIT_ADDON: TAddonResopnseType;
  VIEW_QR: TTableResponseType;
  ADD_ORDER: TDishResponseType;
  [key: string]: undefined | Record<string, any>;
}
