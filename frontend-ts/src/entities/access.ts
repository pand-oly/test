export interface RequestAccess {
  username: string;
  password: string;
}

export interface ResponseAccess {
  token: string;
  username: string;
  AccountId: number;
}
