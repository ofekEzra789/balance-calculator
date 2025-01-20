import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Transaction,
  useBalanceDispacherContext,
} from "@/contexts/balanceContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  description: z
    .string({
      required_error: "Description is required",
    })
    .nonempty({ message: "Description cannot be empty" }),
  amount: z.coerce
    .number({
      required_error: "Amount is required",
    })
    .min(1, { message: "Amount must be greater than 0" }),
  transactionType: z.enum(["income", "expense"], {
    required_error: "Transaction type is required",
  }),
});

export default function TransactionForm() {
  const dispatch = useBalanceDispacherContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newTransaction: Transaction = {
      id: uuidv4(),
      ...values,
    };

    dispatch({ type: "add_transaction", payload: newTransaction });
    form.reset();
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 items-center md:grid-cols-3"
        >
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="h-[90px]">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="h-[90px]">
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="amount" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="transactionType"
            render={({ field }) => (
              <FormItem className="h-[90px]">
                <FormLabel>Transaction Type</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select transaction type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="sm:col-span-full md:col-span-3" type="submit">
            Add Transaction
          </Button>
        </form>
      </Form>
    </div>
  );
}
