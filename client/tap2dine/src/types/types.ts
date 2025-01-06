import { TDeleteItem } from "../api/mutations/delete.mutation";
import { TModalKeys } from "../modals/data";

export type ModalType<K extends TModalKeys> = {
  initiatorName?: string;
  data?: TModalDataMap[K];
};

export interface TModalDataMap {
  DELETE_ITEM: {
    type: TDeleteItem["type"];
  };
  [key: string]: undefined | Record<string, any>;
}
