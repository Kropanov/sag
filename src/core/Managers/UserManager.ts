import { TokenInfo } from '@interfaces';

export class UserManager {
  private _userId?: string;
  private _username?: string;

  private _iat?: number;
  private _exp?: number;

  private static _instance: UserManager;

  constructor() {
    if (UserManager._instance) {
      return UserManager._instance;
    }

    UserManager._instance = this;
  }

  public setUserInfo(data: TokenInfo) {
    this._userId = data.sub;
    this._username = data.name;
    this._iat = data.iat;
    this._exp = data.exp;
  }

  set username(newName: string) {
    this._username = newName;
  }

  get userId(): string | undefined {
    return this._userId;
  }

  get username(): string | undefined {
    return this._username;
  }

  get iat(): number | undefined {
    return this._iat;
  }

  get exp(): number | undefined {
    return this._exp;
  }
}
