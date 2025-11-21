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
import { InvestmentStatus } from "@/common/model";

interface Props {
  data: InvestmentStatus[];
  value: number;
  onChange: (value: number) => void;
}

export function InvestmentStatusSelector({ data, value, onChange }: Props) {
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
            ? data.find((status) => status.id === value)?.status_name
            : "Select status..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[550px] p-0">
        <Command>
          <CommandInput placeholder="Search status..." className="h-9" />
          <CommandList>
            <CommandEmpty>No Investment statuses found.</CommandEmpty>
            <CommandGroup>
              {data?.map((status) => (
                <CommandItem
                  key={status.id}
                  value={status.status_name.toLowerCase()}
                  onSelect={() => {
                    onChange(status.id);
                    setOpen(false);
                  }}
                >
                  {status.status_name}
                  <Check
                    className={cn(
                      "ml-auto",
                      currentValue === status.id ? "opacity-100" : "opacity-0"
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
