import { object, string } from "zod";

export const loginSchema = object({
  email: string({ required_error: "Email is required" }).email(
    "Invalid email address",
  ),
  password: string({ required_error: "Password is required" }).min(1),
});
