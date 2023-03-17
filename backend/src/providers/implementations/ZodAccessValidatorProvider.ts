import { z, ZodSchema } from "zod";
import IAccessValidatorProvider from "../IAccessValidatorProvider";

const accessSchema = z.object({
  username: z.string().min(3),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Password must have at least 8 characters and contain at " +
        "least one number and one capital letter"
    ),
});

export default class ZodAccessValidatorProvider
  implements IAccessValidatorProvider
{
  private _schema: ZodSchema;
  constructor() {
    this._schema = accessSchema;
  }

  public async validator(obj: unknown) {
    await this._schema.parseAsync(obj);
  }
}
