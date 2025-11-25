import { z } from "zod";

const isoDate = z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid Format date"
    });


export const createInvesmentnValidation = z.object({
    name: z.string().min(3, "*Minimum required 3 character"),
    investor_id: z.number().min(1, "Required Investor Id"),
    investment_stage_id: z.number().min(1, "Required Investment Stage"),
    investment_status_id: z.number().min(1, "Required Investment Status"),
    currency_id: z.number().min(1, "Required Currency Id"),

    // value: z.number().min(1, "Required Number"),
    value: z.string().min(1, "*Required Value"),
    description: z.string().min(3, "*Minimum required 3 character"),

    expected_closing_date: isoDate,
    actual_closing_date: isoDate,
    

})

export const updateInvestmentValidation = createInvesmentnValidation.extend({
  investment_id: z.number().min(1, "Required Investment Id"),
})