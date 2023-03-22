/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { Constants } from '../../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(<string>localStorage.getItem(Constants.auth_token_code))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    console.log(this.currentUserSubject.value);
    if (this.currentUserSubject.value) {
      return this.currentUserSubject.value;
    } else {
      this.logout().subscribe(
        (res) => {
          this.router.navigate(['/auth/login']);
        },
        (error) => {
          return { token: '' };
        }
      );
      return { token: '' };
    }
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/user/login`, {
        email: email,
        password: password,
      })
      .pipe(
        map((res) => {
          if (res.user) {
            res.user.tokenType = Constants.auth_token_code;
            localStorage.setItem(
              Constants.auth_token_code,
              JSON.stringify(res.user)
            );
            this.currentUserSubject.next(res.user);
            return res.user;
          } else {
            return null;
          }
        })
      );
  }

  logout() {
    this.currentUserSubject.next({});
    localStorage.removeItem(Constants.auth_token_code);
    return of({ success: false });
  }

  goToUserDefaultPage(): string {
    return '/home';
  }

  goToLoginPage(): string {
    return '/authentication';
  }
}
