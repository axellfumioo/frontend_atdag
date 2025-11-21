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
import { InvestorType } from "@/common/model";

interface Props {
  data: InvestorType[];
  value: number;
  onChange: (value: number) => void;
}

export function InvestorTypeSelector({ data, value, onChange }: Props) {
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
            ? data.find((type) => type.id === value)?.name
            : "Select type..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[550px] p-0">
        <Command>
          <CommandInput placeholder="Search status..." className="h-9" />
          <CommandList>
            <CommandEmpty>No Investor types found.</CommandEmpty>
            <CommandGroup>
              {data?.map((type) => (
                <CommandItem
                  key={type.id}
                  value={type.name.toLowerCase()}
                  onSelect={() => {
                    onChange(type.id);
                    setOpen(false);
                  }}
                >
                  {type.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      currentValue === type.id ? "opacity-100" : "opacity-0"
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
