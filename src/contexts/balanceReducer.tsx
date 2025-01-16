import { Balance, Transaction } from "./balanceContext";

// Initial state
export const initialBalance: Balance = {
  total: 0,
  transactions: [],
};

export const initializer = (initialValue = initialBalance): Balance =>
  JSON.parse(localStorage.getItem("balance") || JSON.stringify(initialValue));


// Transaction Action types
interface AddTransactionAction {
  type: "add_transaction";
  payload: Transaction;
}

interface RemoveTransactionAction {
  type: "remove_transaction";
  payload: { id: string };
}

interface UpdateTransactionAction {
  type: "update_transaction";
  payload: Transaction;
}

export type Action =
  | AddTransactionAction
  | UpdateTransactionAction
  | RemoveTransactionAction;

export const balanceReducer = (state: Balance, action: Action): Balance => {
  switch (action.type) {
    case "add_transaction": {
      const { payload } = action as AddTransactionAction;
      const newTotal =
        payload.transactionType === "income"
          ? state.total + payload.amount
          : state.total - payload.amount;

      return {
        total: newTotal,
        transactions: [...state.transactions, payload],
      };
    }
    case "remove_transaction": {
      const { payload } = action as RemoveTransactionAction;
      const findTransaction: Transaction | undefined = state.transactions.find(
        (trans) => trans.id === payload.id
      );

      if (!findTransaction) {
        throw new Error("Transaction not found");
      }

      const newTotal =
        findTransaction.transactionType === "income"
          ? state.total - findTransaction.amount
          : state.total + findTransaction.amount;
      const newTransactions = state.transactions.filter(
        (trans) => trans.id !== payload.id
      );

      return {
        total: newTotal,
        transactions: newTransactions,
      };
    }
    default: {
      throw new Error("Unkown action " + action.type);
    }
  }
};
