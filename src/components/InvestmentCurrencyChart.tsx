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
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

interface Props {
  data: ChartInvestmentPerCurrency[];
}

// Pool warna otomatis
const COLOR_POOL = [
  "#4A90E2", // muted blue
  "#50E3C2", // teal
  "#7ED321", // green
  "#BD10E0", // purple
  "#9013FE", // deep purple
  "#417505", // olive green
  "#2C3E50", // dark blue
  "#16A085", // dark teal
  "#8E44AD", // dark purple
  "#27AE60", // forest green
];

export function InvestmentCurrencyChart({ data }: Props) {
  // Format data untuk recharts
  const chartData = data.map((item, index) => ({
    currency: item.currency_code,
    total: item.total,
    fill: COLOR_POOL[index % COLOR_POOL.length],
  }));

  // Config legend
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
        <ChartContainer config={chartConfig} className="h-[300px]">
          <div className="w-full h-full">
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{ top: 20 }}
              width={500}
              height={300}
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
