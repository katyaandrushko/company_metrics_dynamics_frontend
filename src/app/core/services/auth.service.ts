import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
  ApiResponse,
  LoginPayload,
  RegisterPayload,
  User,
} from '../model/common.model';
import { apiEndpoint } from '../constants/constants';
import { map } from 'rxjs';
import { LocalStorage } from '../constants/constants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = signal<boolean>(false);
  router = inject(Router);

  constructor(private _http: HttpClient) {
    if (this.getUserToken()) {
      this.isLoggedIn.update(() => true);
    }
  }

  register(payload: RegisterPayload) {
    return this._http.post<ApiResponse<User>>(
      `${apiEndpoint.Auth.Register}`,
      payload
    );
  }

  login(payload: LoginPayload) {
    return this._http
      .post<ApiResponse<User>>(`${apiEndpoint.Auth.Login}`, payload)
      .pipe(
        map((response) => {
          if (response.status && response.token) {
            localStorage.setItem(LocalStorage.token, response.token);
            this.isLoggedIn.update(() => true);
          }

          return response;
        })
      );
  }

  me() {
    return this._http.get<ApiResponse<User>>(`${apiEndpoint.Auth.Me}`);
  }

  getUserToken() {
    return localStorage.getItem(LocalStorage.token);
  }

  logout() {
    localStorage.removeItem(LocalStorage.token);
    this.isLoggedIn.update(() => false);
    this.router.navigate(['login']);
  }
}
