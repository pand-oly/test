import { z } from 'zod';

const userNameSchema = z.string().min(3);

const passwordSchema = z
  .string()
  .min(8)
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/);

export function validateUsername(value) {
  const validate = userNameSchema.safeParse(value);

  return validate.success;
}

export function validatePassword(value) {
  const validate = passwordSchema.safeParse(value);

  return validate.success;
}
