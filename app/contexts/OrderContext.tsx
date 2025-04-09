// app/context/OrderContext.tsx
"use client";

import React, { createContext, useContext, useReducer, Dispatch } from "react";

interface OrderState {
  tripTitle: string;
  pricePerPerson: number;
}

type Action =
  | { type: "ADD"; payload: OrderState }
  | { type: "DELETE" };

interface OrderContextType {
  state: OrderState;
  dispatch: Dispatch<Action>;
}

const initialOrderState: OrderState = {
  tripTitle: "",
  pricePerPerson: 0,
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const orderReducer = (state: OrderState, action: Action): OrderState => {
  switch (action.type) {
    case "ADD":
      return { ...action.payload };
    case "DELETE":
      return { tripTitle: "", pricePerPerson: 0 };
    default:
      return state;
  }
};

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(orderReducer, initialOrderState);

  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};
