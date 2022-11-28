export default interface IPasswordProvider {
  encrypt(password: string): string;
}
