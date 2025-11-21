import { z } from "zod";

export const createInvestmentStatusValidation = z.object({
  status_name: z.string().min(3, "*Minimum required 3 character"),

  order: z
    .number()
    .min(1, "Required Number")
    .refine((v) => !isNaN(Number(v)), "*Order must be a Number"),

  status_type: z.string().min(1, "*Required Type"),
  status_color: z.string().min(1, "*Required Color"),
});

export const updateInvestmentStatusValidation = z.object({
  status_name: z.string().min(3, "*Minimum required 3 character"),
  order: z
    .number().min(1, "*Order must be a number"),
    // .refine((v) => v === undefined || !isNaN(Number(v)), "Order must be a Number"),
  status_type: z.string().min(1, "*Required Type"),
  status_color: z.string().min(1, "*Required Color"),
});

