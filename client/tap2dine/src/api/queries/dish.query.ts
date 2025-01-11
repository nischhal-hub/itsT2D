import { api } from "../api";
import { useQuery } from "@tanstack/react-query";
import { toastTrigger } from "../../lib/utils";

export const useFetchDishes = () => {
  return useQuery({
    queryKey: ["dishes"],
    queryFn: async () => {
      const response = await api.get("/dishes/");
      return response.data;
    },
    onError: () => {
      toastTrigger("Failed to fetch dishes", undefined, "error");
    },
    refetchOnWindowFocus: true,
  });
};
