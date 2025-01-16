import { useBalanceContext } from "@/contexts/balanceContext";
import { DataTable } from "./transactions/data-table";
import { columns } from "./transactions/columns";

export default function GenericList() {
  const { transactions } = useBalanceContext();

  return (
    <div className="w-full">
      <DataTable columns={columns} data={transactions} />
    </div>
  );
}
