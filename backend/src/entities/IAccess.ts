export default interface IAccess {
  username: string;
  password: string;
}

export interface IReturnAccess {
  token: string;
  username: string;
  accountId: number;
}
