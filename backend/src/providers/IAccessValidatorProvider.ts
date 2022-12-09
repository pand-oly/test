export default interface IAccessValidatorProvider {
  validator(obj: unknown): Promise<void>;
}
