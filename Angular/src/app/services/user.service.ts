import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../account/models/user';
import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';

const PATH_OF_API = 'http://localhost:8080/api';
const httpOptions = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Origin": "http://localhost:8080",
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': '*'
  })
};
const httpOptions1 = {
  headers: new HttpHeaders({
    'Content-type': ''
  })
};


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpclient: HttpClient, private authService: AuthService, private token: TokenStorageService) { }


  getUsers(): Observable<User[]> {
    return this.httpclient.get<User[]>(PATH_OF_API + '/users', httpOptions);
  }

  saveUser(user: any) {
  
    return this.httpclient.post(PATH_OF_API + '/user/save', user, httpOptions);
  }

  assignRoleAgent(username: any) {
    return this.httpclient.post(PATH_OF_API + '/role/assignUser/' + username, httpOptions);
  }

  assignRoleAdmin(username: any) {
    return this.httpclient.post(PATH_OF_API + '/role/assignAdmin/' + username, httpOptions);
  }

  updateUser(id: any, user: any) {
    return this.httpclient.put(PATH_OF_API + '/user/update/' + id, user, httpOptions);
  }

  deleteUser(id: any) {
    return this.httpclient.delete(PATH_OF_API + '/user/delete/' + id, httpOptions);
  }

}
