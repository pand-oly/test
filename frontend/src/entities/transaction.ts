export interface RequestTransaction {
  debitedAccountId: number;
  creditedAccountId: number;
  value: number;
}

export interface ResponseTransaction {
  id: number;
  debitedAccountId: number;
  creditedAccountId: number;
  value: string;
  createdAt: string;
}

export interface HistoryTransaction {
  debitedAccountId: number;
  creditedAccountId: number;
  value: number;
  createdAt: string;
}
