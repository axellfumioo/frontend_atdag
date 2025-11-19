import { z } from "zod";

export const createCurrenciesValidation = z.object({
    name: z.string().min(3, "*Minimum required 3 character"),
    order: z
    .number().min(1, "Required Number")
    .refine((v) => !isNaN(Number(v)), "Order must be a Number"),

    code: z.string().min(1, "Required Code"),
    symbol: z.string().min(1, "Required Symbol")
})

export const updateCurrenciesValidation = z.object({
    name: z.string().min(3, "*Minimum required 3 character"),
    order: z
    .number().min(1, "Required Number")
    .refine((v) => !isNaN(Number(v)), "Order must be a Number"),

    code: z.string().min(1, "Required Code"),
    symbol: z.string().min(1, "Required Symbol")
})

