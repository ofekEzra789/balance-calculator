import { useBalanceContext } from "../contexts/balanceContext";

export default function TotalBalance() {
  const { total } = useBalanceContext();
  const formatedTotal = total.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="mb-5">
      <h1 className="text-3xl">Balance: {formatedTotal}</h1>
    </div>
  );
}
