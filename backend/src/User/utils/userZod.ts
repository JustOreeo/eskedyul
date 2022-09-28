import { z } from "zod";

export const SRegister = z.object({
  role: z.enum(["Brgy. Admin", "Admin", "Master Admin", "Resident"]),
  password: z.string().optional(),
  email: z.string().email().optional(),
  fname: z.string().min(3, { message: "Name needs to be atleast 3 letters" }),
  mname: z.string().min(3, { message: "Name needs to be atleast 3 letters" }),
  lname: z.string().min(3, { message: "Name needs to be atleast 3 letters" }),
  suffix: z.string(),
  sex: z.enum(["Male", "Female"]),
  mobileNo: z.string().regex(/^0(9)\d{9}$/, { message: "Invalid Phone No." }),
  presAdd: z.string(),
  permAdd: z.string(),
  brgyId: z.string(),
  idType: z.string(),
  idNo: z.string(),
  status: z.number().min(0).max(1),
});

export type TRegister = z.infer<typeof SRegister>;
