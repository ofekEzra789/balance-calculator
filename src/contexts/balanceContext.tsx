import { createContext, Dispatch, useContext } from "react";
import { Action } from "./balanceReducer";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  transactionType: "income" | "expense";
}

export interface Balance {
  total: number;
  transactions: Transaction[];
  totalIncomes: number;
  totalExpenses: number;
}

export const BalanceContext = createContext<Balance | undefined>(undefined);
export const BalanceDispacherContext = createContext<Dispatch<Action> | null>(
  null
);

export function useBalanceContext() {
  const balance = useContext(BalanceContext);

  if (balance === undefined) {
    throw new Error("UseBalanceContext must be used with a BalanceContext");
  }
  return balance;
}

export function useBalanceDispacherContext() {
  const dispatch = useContext(BalanceDispacherContext);

  if (dispatch === null) {
    throw new Error(
      "useBalanceDispacherContext must be used with a BalanceDispacherContext"
    );
  }
  return dispatch;
}
