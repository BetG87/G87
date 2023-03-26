import { GameAccount } from "./GameAccount";

export class AccountInfo {
  _id: string | undefined;
  email: string | undefined;
  fullName: string | undefined;
  numberPhone: number | undefined;
  gameProduct: [] | undefined;;
  gameAccounts: GameAccount[] | undefined;
}
