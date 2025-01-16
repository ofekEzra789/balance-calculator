import TotalBalance from "./customComponents/TotalBalance";
import {
  BalanceContext,
  BalanceDispacherContext,
} from "./contexts/balanceContext";
import TransactionForm from "./customComponents/TransactionForm";
import { useEffect, useReducer } from "react";
import { balanceReducer, initialBalance, initializer } from "./contexts/balanceReducer";
import GenericList from "./customComponents/GenericList";

export default function App() {
  const [balance, dispatch] = useReducer(balanceReducer, initialBalance, initializer);

  useEffect(() => {
    localStorage.setItem("balance", JSON.stringify(balance));
  }, [balance]);

  return (
    <div className="min-h-screen text-white">
      <BalanceContext.Provider value={balance}>
        <BalanceDispacherContext.Provider value={dispatch}>
          <div className="max-w-[960px] w-full flex flex-col justify-center items-center m-auto gap-8 py-10 px-6">
            <TotalBalance />
            <TransactionForm />
            <GenericList />
          </div>
        </BalanceDispacherContext.Provider>
      </BalanceContext.Provider>
    </div>
  );
}
