"use client";

import { ChartInvestmentPerCurrency } from "@/common/model";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/common/shadcn/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/common/shadcn/ui/chart";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: ChartInvestmentPerCurrency[];
}

const COLOR_POOL = [
  "#4A90E2",
  "#50E3C2",
  "#7ED321",
  "#BD10E0",
  "#9013FE",
  "#417505",
  "#2C3E50",
  "#16A085",
  "#8E44AD",
  "#27AE60",
];

export function InvestmentCurrencyChart({ data }: Props) {
  const chartData = data.map((item, index) => ({
    currency: item.currency_code,
    total: item.total,
    fill: COLOR_POOL[index % COLOR_POOL.length],
  }));

  const chartConfig: ChartConfig = Object.fromEntries(
    data.map((item, index) => [
      item.currency_code,
      {
        label: item.currency_name,
        color: COLOR_POOL[index % COLOR_POOL.length],
      },
    ])
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Investment per Currency</CardTitle>
        <CardDescription>Total investment count by currency</CardDescription>
      </CardHeader>

   <CardContent>
  <ChartContainer config={chartConfig} className="h-[300px] w-full">
    {/* ChartContainer hanya boleh 1 child → bungkus dengan div */}
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={{ top: 20 }}
        >
          <CartesianGrid vertical={false} />

          <XAxis
            dataKey="currency"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />

          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

          <Bar dataKey="total" radius={8} fill="var(--chart-1)">
            <LabelList
              dataKey="total"
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4">
        <ChartLegend content={<ChartLegendContent />} />
      </div>
    </div>
  </ChartContainer>
</CardContent>


      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total investments grouped by currency
        </div>
      </CardFooter>
    </Card>
  );
}
