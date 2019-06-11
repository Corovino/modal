import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as jwt_decode from "jwt-decode";
import { Observable } from 'rxjs';
import { Credit } from '../models/credit';




@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getHeaders() {
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders().set('Authorization', token) : null;
  }


  post(body: any): Observable<any> {
    return this.http.post(`${environment.url}/login`, body);
  }

  getDecodedAccessToken(): any {
    try {
      let token = localStorage.getItem('token')
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }

  getBalance(): Observable<any> {
    try {
      return this.http.get(`${environment.url}/balance`, { headers: this.getHeaders() })
    } catch (error) {
      return error;
    }
  }

  updateBalance(data: any ): Observable<any>{
    try {
      return this.http.post(`${environment.url}/balance`, data, { headers: this.getHeaders() })
    } catch (error) {
      return error;
    }
  }

  handleCredits(): Observable<any> {
   try {
    return this.http.get(`${environment.url}/account`, { headers: this.getHeaders()}) 
   } catch (error) {
      return error; 
   }
  }

  handleUsers(): Observable<any> {
    try {
      return this.http.get(`${environment.url}/custumer`, { headers: this.getHeaders() })
    } catch (error) {
      return error;
    }
  }


  createUser( data : any) : Observable<any>{
    try {
      return this.http.post(`${environment.url}/custumer`, data, { headers: this.getHeaders() } )
    } catch (error) {
      return error;
    }
  }

  handleStatusCredit(user_id: string): Observable<any>{
    console.log("ser",user_id);
    try {
      return this.http.get(`${environment.url}/account/${user_id}`, { headers: this.getHeaders() })
    } catch (error) {
      return error;
    }
  }

  createCreditToUser(data: any): Observable<any> {
    try {
      return this.http.post(`${environment.url}/account`, data, { headers: this.getHeaders() })
    } catch (error) {
      return error;
    }
  }
}

