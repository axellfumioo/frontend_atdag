import z from "zod";

export const createUserValidation = z.object({
  name: z.string().min(3, "*Name min 3 chars"),
  email: z.string().email("*Invalid email format"),
  password: z.string().min(6, "*Password min 6 chars"),
  phone: z.string().min(10, "*Phone must be min 10 digits"),
  address: z.string().min(1, "*Required Address"),
  roleId: z.number().min(1, "*Role is required"),
});

export const updateUserValidation = z.object({
  name: z.string().min(3, "*Required Name"),
  email: z.string().email("*Invalid email format"),
  phone: z.string().min(0),
  address: z.string().min(0),
  roleId: z.number().min(1, "Role is required"),
});