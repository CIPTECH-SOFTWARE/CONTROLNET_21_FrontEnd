import { Injectable } from '@angular/core';
import {Usuario} from '../models/usuario';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  myAppUrl:string;
  myApiUrl:string;

  constructor(private http:HttpClient) { 
    this.myAppUrl=environment.endpoint;
    this.myApiUrl='/api/Login'
  }

  login(usuario:Usuario):Observable<any>{
    return this.http.post(this.myAppUrl+ this.myApiUrl,usuario);
  }

  setLocalStorage(data): void{
    localStorage.setItem('token', data);
  }

  // getNombreUsuario():string{
  //   return localStorage.getItem('nombreUsuario');
  // }


  getTokenDecode():any{
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(localStorage.getItem('token'));
      return decodedToken;
  }

  removeLocalStorage():void{
    localStorage.removeItem('token');
  }

}
