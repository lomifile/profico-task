import { object, string } from "zod";

export const registerSchema = object({
  first_name: string({ required_error: "First name is required" }).min(
    1,
    "First name is required"
  ),
  last_name: string({ required_error: "Last name is required" }).min(
    1,
    "Last name is required"
  ),
  email: string({ required_error: "Email is required" }).email(
    "Invalid email address"
  ),
  password: string({ required_error: "Password is required" }).min(
    8,
    "Password must be at least 3 characters"
  ),
  confirm: string({ required_error: "Confirm password is required" }).min(
    8,
    "Confirm password must be at least 3 characters"
  ),
});
