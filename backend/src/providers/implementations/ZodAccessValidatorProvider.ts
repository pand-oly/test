import { z, ZodSchema } from 'zod';
import IAccessValidatorProvider from '../IAccessValidatorProvider';

const accessSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(8).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    'Password must have at least one number and one capital letter',
  ),
});

export default class ZodAccessValidatorProvider implements IAccessValidatorProvider {
  private _schema: ZodSchema;
  constructor() { this._schema = accessSchema; }

  public async validator(obj: unknown) {
    await this._schema.parseAsync(obj);
  }
}
