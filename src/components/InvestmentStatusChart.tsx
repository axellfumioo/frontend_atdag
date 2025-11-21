"use client";

import { Pie, PieChart, Tooltip } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
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

import { ChartInvestmentPerStatus } from "@/common/model";

interface ChartDataItem {
  status: string;
  total: number;
  fill: string;
}

interface Props {
  data: ChartInvestmentPerStatus[];
}

const COLOR_POOL = [
  "#F4C266", // muted warm yellow
  "#E8A53A", // amber
  "#D98C2B", // dark amber
  "#CC7A22", // soft orange-brown
  "#BF691A", // warm deep orange
  "#B05814", // darker orange
  "#9F4A0F", // deep burnt orange
  "#8C3E0A", // darker burnt orange
  "#7A3306", // brownish orange
  "#662900", // deep brown-orange
];

function mergeStatus(data: ChartInvestmentPerStatus[]) {
  const map = new Map<string, number>();

  data.forEach((item) => {
    map.set(item.status, (map.get(item.status) || 0) + item.total);
  });

  return Array.from(map, ([status, total]) => ({ status, total }));
}

export function InvestmentStatusChart({ data }: Props) {
  const merged = mergeStatus(data);

  const chartData: ChartDataItem[] = merged.map((item, index) => ({
    status: item.status,
    total: item.total,
    fill: COLOR_POOL[index % COLOR_POOL.length],
  }));

  const chartConfig: ChartConfig = Object.fromEntries(
    merged.map((item, index) => [
      item.status,
      {
        label: item.status,
        color: COLOR_POOL[index % COLOR_POOL.length],
      },
    ])
  );

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Investment Status</CardTitle>
        <CardDescription>Total by status</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey="total"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            />

            <ChartTooltip
              content={<ChartTooltipContent nameKey="status" />}
              cursor={{ fill: "transparent" }}
              wrapperStyle={{ outline: "none" }}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="status" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/3 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
