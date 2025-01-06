import { ModalType } from "../types/modal.types";
import AddCategory from "./category/add-category-modal";
import EditCategory from "./category/edit-category-modal";
import DeleteModal from "./delete-modal";

type TModalData = {
  [key in TModalKeys]: {
    title: string;
    component: React.FC<ModalType<key>>;
  };
};

export type TModalKeys = "ADD_CATEGORY" | "DELETE_ITEM" | "EDIT_CATEGORY";

export const ModalData: TModalData = {
  ADD_CATEGORY: {
    title: "Add Category",
    component: AddCategory,
  },
  EDIT_CATEGORY: {
    title: "Edit Category",
    component: EditCategory,
  },
  DELETE_ITEM: {
    title: "Delete",
    component: DeleteModal,
  },
};
