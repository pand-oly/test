import { z } from 'zod';

const MIN_USERNAME_CHAR = 3;
const MIN_PASSWORD_CHAR = 8;
const REGEX_VALIDATE_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

const userNameSchema = z.string().min(MIN_USERNAME_CHAR);

const passwordSchema = z
  .string()
  .min(MIN_PASSWORD_CHAR)
  .regex(REGEX_VALIDATE_PASSWORD);

export function validateUsername(value: string): boolean {
  const validate = userNameSchema.safeParse(value);

  return validate.success;
}

export function validatePassword(value: string): boolean {
  const validate = passwordSchema.safeParse(value);

  return validate.success;
}
