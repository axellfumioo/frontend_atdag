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
  value: number;
  onChange: (value: number) => void;
}

export function InvestmentStageSelector({
  data,
  value,
  onChange,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const currentValue = value;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? data.find((stage) => stage.id === value)?.name
            : "Select stage..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[550px] p-0">
        <Command>
          <CommandInput placeholder="Search stages..." className="h-9" />
          <CommandList>
            <CommandEmpty>No InvestmentStage found.</CommandEmpty>
            <CommandGroup>
              {data?.map((stage) => (
                <CommandItem
                  key={stage.id}
                  value={stage.name.toLowerCase()}
                  onSelect={() => {
                    onChange(stage.id);
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
