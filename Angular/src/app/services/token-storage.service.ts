import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';


const TOKEN_KEY = 'auth-token';
//const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  clear(): void {
    localStorage.clear();
  }

  public saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): any {
    return localStorage.getItem(TOKEN_KEY);
  }

  public isLoggedIn(): any {
    return localStorage.setItem('isLoggedIn', 'true');
  }

  public getIsLoggedIn(): any {
    return JSON.stringify(localStorage.getItem('isLoggedIn'));
  }

  


  public logout(): void {
    localStorage.removeItem('mailUsername')
      localStorage.removeItem('mailPassword')
    localStorage.removeItem('isLoggedIn')
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem(TOKEN_KEY)
  }

  // public saveUser(user: any): void {
  //   localStorage.removeItem(USER_KEY);
  //   localStorage.setItem(USER_KEY, user);
  // }

  // public getUser(): any {
  //   return localStorage.getItem(USER_KEY);
  // }
}
