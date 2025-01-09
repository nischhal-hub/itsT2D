import { api } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toastTrigger } from "../../lib/utils";
import useModalContext from "../../hooks/useModalContext";

export type TDeleteItem = {
  initiatorName: string;
  type: "category" | "ingredient" | "table" | undefined;
};
export const useDeleteItem = (
  queryClient: ReturnType<typeof useQueryClient>,
) => {
  const { closeModal } = useModalContext();
  const { mutate: deleteCategory } = useMutation({
    mutationFn: (data: string) => api.delete(`/categories/${data}/`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      closeModal("DELETE_ITEM");
      toastTrigger("Category deleted successfully", undefined, "success");
    },
    onError: (error) => {
      console.error(error);
      toastTrigger(`Category deletion failed`, undefined, "error");
    },
  });

  const { mutate: deleteIngredient } = useMutation({
    mutationFn: (data: string) => api.delete(`/ingredients/${data}/`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ingredients"] });
      closeModal("DELETE_ITEM");
      toastTrigger("Ingredient deleted successfully", undefined, "success");
    },
    onError: (error) => {
      console.error(error);
      toastTrigger(`Ingredient deletion failed`, undefined, "error");
    },
  });
  const { mutate: deleteTable } = useMutation({
    mutationFn: (data: string) => api.delete(`/tables/${data}/`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      closeModal("DELETE_ITEM");
      toastTrigger("Table deleted successfully", undefined, "success");
    },
    onError: (error) => {
      console.error(error);
      toastTrigger(`Table deletion failed`, undefined, "error");
    },
  });
  function deleteHandler({ initiatorName, type }: TDeleteItem) {
    switch (type) {
      case "category":
        deleteCategory(initiatorName);
        break;
      case "ingredient":
        deleteIngredient(initiatorName);
        break;
      case "table":
        deleteTable(initiatorName);
        break;
      default:
        break;
    }
  }
  return deleteHandler;
};
