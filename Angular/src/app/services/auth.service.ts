import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { identity, Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

import {JwtHelperService} from '@auth0/angular-jwt';
import { User } from '../account/models/user';

const PATH_OF_API = '/template/spring/api';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  })
};

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  id: any;

  constructor(private httpclient: HttpClient, private token: TokenStorageService) { }


  login(username: any, password: any) {
    let body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    return this.httpclient.post(PATH_OF_API + '/login', body.toString(),httpOptions);
  }

  getUserFromToken() {
    
    return helper.decodeToken(this.token.getToken()).sub
  }

  jwtExpire() {
    let s = helper.decodeToken(this.token.getToken())
    return s
  }

  getUser() {
    return this.httpclient.get(PATH_OF_API + '/user1/'+this.getUserFromToken(), httpOptions);
  }

  getUserByEmail(email: String) {
    return this.httpclient.get<User>(PATH_OF_API + '/userEmail/'+email, httpOptions);
  }

  getUserById(id: any) {
    return this.httpclient.get(PATH_OF_API + '/user2/'+id, httpOptions);
  }

  getRole() {
    return helper.decodeToken(this.token.getToken()).roles[0]
  }

  public setRole(): any {
    let role = this.getRole()
    return localStorage.setItem("auth-role",role);
  }

  getUsers(): Observable<User[]> {
    return this.httpclient.get<User[]>(PATH_OF_API + '/user/all', httpOptions);
  }


 

  




}
