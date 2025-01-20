"use client";

import { useEffect, useState } from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useBalanceContext } from "@/contexts/balanceContext";

const chartConfig = {
  total: {
    label: "Total",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-1))",
  },

  incomes: {
    label: "Incomes",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function BalanceChart() {
  const { total, totalExpenses, totalIncomes } = useBalanceContext();
  const formatedTotal = total.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const [chartData, setChartData] = useState([
    {
      transactionType: "expenses",
      amount: totalExpenses,
      fill: "var(--color-expenses)",
    },
    {
      transactionType: "incomes",
      amount: totalIncomes,
      fill: "var(--color-incomes)",
    },
  ]);

  useEffect(() => {
    setChartData([
      {
        transactionType: "expenses",
        amount: totalExpenses,
        fill: "var(--color-expenses)",
      },
      {
        transactionType: "incomes",
        amount: totalIncomes,
        fill: "var(--color-incomes)",
      },
    ]);
  }, [totalExpenses, totalIncomes]);

  return (
    <Card className="flex flex-col p-3">
      <CardHeader className="items-center pb-0 mb-3">
        <CardTitle className="text-2xl">Pie Chart - Balance</CardTitle>
        <CardDescription>Total Balance</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="transactionType"
              innerRadius={70}
              strokeWidth={6}
              outerRadius={80}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {formatedTotal}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
