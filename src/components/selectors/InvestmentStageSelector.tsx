"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/common/shadcn/ui/popover";
import { Button } from "@/common/shadcn/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/common/shadcn/ui/command";
import { cn } from "@/common/lib/utils";
import { InvestmentStage } from "@/common/model";

interface Props {
  data: InvestmentStage[];
  name: string;
  setSelectedStage: (value: number) => void;
}

export function InvestmentStageSelector({
  data,
  name,
  setSelectedStage,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [currentValue, setCurrentValue] = React.useState<number>(0);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {currentValue
            ? data?.find((stage) => stage.id === currentValue)?.name
            : "Select stage..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search stages..." className="h-9" />
          <CommandList>
            <CommandEmpty>No InvestmentStage found.</CommandEmpty>
            <CommandGroup>
              {data?.map((stage) => (
                <CommandItem
                  key={stage.id}
                  value={stage.name.toLowerCase()}
                  onSelect={(value) => {
                    setCurrentValue(
                      currentValue === Number(value) ? 0 : currentValue
                    );
                    setSelectedStage(Number(value));
                    setOpen(false);
                  }}
                >
                  {stage.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      currentValue === stage.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
