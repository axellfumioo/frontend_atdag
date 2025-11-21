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
import { Currency } from "@/common/model";

interface Props {
  data: Currency[];
  value: number;
  onChange: (value: number) => void;
}

export function CurrencySelector({ data, value, onChange }: Props) {
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
            ? data.find((cur) => cur.id === value)?.name
            : "Select currency..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[550px] p-0">
        <Command>
          <CommandInput placeholder="Search currency..." className="h-9" />
          <CommandList>
            <CommandEmpty>No currencies found.</CommandEmpty>
            <CommandGroup>
              {data?.map((cur) => (
                <CommandItem
                  key={cur.id}
                  value={cur.name.toLowerCase() || cur.symbol.toLowerCase()}
                  onSelect={() => {
                    onChange(cur.id);
                    setOpen(false);
                  }}
                >
                  {cur.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      currentValue === cur.id ? "opacity-100" : "opacity-0"
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
