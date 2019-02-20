import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  login(email, password) {
    return this._http.post(`${environment.baseApi}/auth`, { email: email, password: password });
  }

  hasToken(): boolean {
    // return boolean value from returned value. empty string will return false
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }

  getToken(): string {
    let token = localStorage.getItem('token');
    if (!token) token = '';
    return token;
  }

  register(data: any) {
    return this._http.post(`${environment.baseApi}/users`, data, { observe: 'response' as 'body' });
  }
}
