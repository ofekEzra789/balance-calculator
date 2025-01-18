import TotalBalance from "./customComponents/TotalBalance";
import {
  BalanceContext,
  BalanceDispacherContext,
} from "./contexts/balanceContext";
import TransactionForm from "./customComponents/TransactionForm";
import { useEffect, useReducer } from "react";
import {
  balanceReducer,
  initialBalance,
  initializer,
} from "./contexts/balanceReducer";
import GenericList from "./customComponents/GenericList";
import { ThemeProvider } from "./contexts/theme-provider";
import { ModeToggle } from "./customComponents/mode-toggle";

export default function App() {
  const [balance, dispatch] = useReducer(
    balanceReducer,
    initialBalance,
    initializer
  );

  useEffect(() => {
    localStorage.setItem("balance", JSON.stringify(balance));
  }, [balance]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-primary text-background">
        <BalanceContext.Provider value={balance}>
          <BalanceDispacherContext.Provider value={dispatch}>
            <div className="max-w-[960px] w-full flex flex-col justify-center items-center m-auto gap-8 py-10 px-6">
              <ModeToggle />
              <TotalBalance />
              <TransactionForm />
              <GenericList />
            </div>
          </BalanceDispacherContext.Provider>
        </BalanceContext.Provider>
      </div>
    </ThemeProvider>
  );
}
