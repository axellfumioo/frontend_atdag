import z from "zod";

export const createInvestortypeValidation = z.object({
    name: z.string().min(3, "Required Name"),
    color: z.string().min(1, "Require Type")
})

export const updateInvestortypeValidation = z.object({
    name: z.string().min(3, "Required Name"),
    color: z.string().min(1, "Require Type")
})
