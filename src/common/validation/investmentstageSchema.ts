import { z } from "zod";

export const createInvestmentstageValidation = z.object({
    order: z.number().min(1, "*Required Order"),
    name: z.string().min(1, "*Required Name")
});

export const updateInvestmentstageValidation = createInvestmentstageValidation.extend({});

