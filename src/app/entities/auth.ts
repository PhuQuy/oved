import { Token } from './token';

const tokenName = 'token';

export class Auth {

  token: Token;

  static setToken(data: any): Token {
    const token = new Token(data);
    localStorage.setItem(tokenName, JSON.stringify(token));
    return token;
  }

  static getToken(): Token {
    return new Token(JSON.parse(localStorage.getItem(tokenName)));
  }

  static logout(): void {
    localStorage.removeItem(tokenName);
    return;
  }
}
