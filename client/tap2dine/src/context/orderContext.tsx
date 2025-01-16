import React, { createContext, useReducer, ReactNode } from "react";

type OrderItem = {
  dishId: string;
  name: string;
  quantity: number;
  ingredients: { id: string; name: string; include: boolean }[];
  addons: { id: string; name: string; price: number }[];
  remark: string;
};

type Order = {
  table: number;
  items: OrderItem[];
  remarks: string;
};

type OrderAction =
  | { type: "ADD_ITEM"; payload: Omit<OrderItem, "remarks"> }
  | { type: "REMOVE_ITEM"; payload: { dishId: string } }
  | {
      type: "UPDATE_ITEM";
      payload: Partial<Omit<OrderItem, "remarks">> & { dishId: string };
    }
  | { type: "ADD_ITEM_REMARK"; payload: { dishId: string; remark: string } }
  | { type: "ADD_ORDER_REMARK" }
  | { type: "RESET_ORDER" };

export type OrderContextType = {
  order: Order;
  dispatch: React.Dispatch<OrderAction>;
};

// Initialize the context
export const OrderContext = createContext<OrderContextType | undefined>(
  undefined,
);

const initialOrder: Order = {
  table: 0,
  items: [],
  remarks: "",
};

// Reducer function
function orderReducer(state: Order, action: OrderAction): Order {
  switch (action.type) {
    case "ADD_ITEM": {
      const exists = state.items.find(
        (item) => item.dishId === action.payload.dishId,
      );
      if (exists) {
        return state;
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload }],
      };
    }
    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter(
          (item) => item.dishId !== action.payload.dishId,
        ),
      };
    }
    case "UPDATE_ITEM": {
      return {
        ...state,
        items: state.items.map((item) =>
          item.dishId === action.payload.dishId
            ? { ...item, ...action.payload }
            : item,
        ),
      };
    }
    case "ADD_ITEM_REMARK": {
      return {
        ...state,
        items: state.items.map((item) =>
          item.dishId === action.payload.dishId
            ? { ...item, remark: action.payload.remark }
            : item,
        ),
      };
    }
    case "RESET_ORDER": {
      return initialOrder;
    }
    default:
      return state;
  }
}

// Provider component
export const OrderProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [order, dispatch] = useReducer(orderReducer, initialOrder);

  return (
    <OrderContext.Provider value={{ order, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
};
