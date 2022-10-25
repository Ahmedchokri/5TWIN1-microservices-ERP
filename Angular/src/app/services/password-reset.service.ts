import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const PATH_OF_API = 'http://localhost:8080/api';

const httpOptions = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Origin": "http://localhost:8080",
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  constructor(private httpclient: HttpClient) { }

  passwordReset(email: any) {
    return this.httpclient.post(PATH_OF_API + '/resetPassword',email, httpOptions);
  }

  passwordChange(form: any) {
    const userId =localStorage.getItem('ResetPassUser')
    const token =localStorage.getItem('ResetPassToken')

    return this.httpclient.post(PATH_OF_API + '/resetPass/'+userId+"/"+token,form, httpOptions);
  }
}
