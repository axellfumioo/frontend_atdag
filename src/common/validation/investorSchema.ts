import { z } from "zod";

export const createInvestorValidation = z.object({
    investor_name: z.string().min(3, "*Minimum required 3 character"),

    website: z.string().min(1, "Required Website Name"),
    investor_type_id: z
        .number().min(1, "Required Type")
        // .refine((v) => !isNaN(Number(v)), "Order must be a Number"),
})

export const updateInvestorValidation = z.object({
    investor_id: z
        .number().min(1, "Required Number")
        .refine((v) => !isNaN(Number(v)), "Order must be a Number"),
    investor_name: z.string().min(3, "*Minimum required 3 character"),
    website: z.string().min(1, "Required Website Name"),
    investor_type_id: z
        .number().min(1, "Required Type")
        // .refine((v) => !isNaN(Number(v)), "Order must be a Number"),
})