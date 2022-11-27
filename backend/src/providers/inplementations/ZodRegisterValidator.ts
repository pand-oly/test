import { z, ZodSchema } from 'zod';

const registerBodySchema = z.object({
  username: z.string(),
  password: z.string().min(6),
});

export type IRegisterDTO = z.infer<typeof registerBodySchema>;

export default class ZodRegisterValidation {
  private _schema: ZodSchema;

  constructor() { this._schema = registerBodySchema; }

  public async validateBody(obj: unknown) {
    const data = await this._schema.parseAsync(obj);

    return data as IRegisterDTO;
  }
}
