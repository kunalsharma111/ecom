import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";

import { environment } from '../../environments/environment';

import { User } from '../models/user';
import { NotificationService } from '../services/index';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  helper = new JwtHelperService();
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  
  constructor(private http: HttpClient,
    private router: Router,private notificationService : NotificationService) {
      if(localStorage.getItem('token')){
      this.currentUserSubject = new BehaviorSubject<User>(this.helper.decodeToken(localStorage.getItem('token') || '{}'));
        this.currentUser = this.currentUserSubject.asObservable();
      }else{
        this.currentUserSubject = new BehaviorSubject<User>(null!);
        this.currentUser = this.currentUserSubject.asObservable();
      }
    }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
    }

    login(data:any){
      return this.http.post<any>(`${environment.apiUrl}/auth/login`,data)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                let decodedToken = this.helper.decodeToken(user.token);
                localStorage.setItem('token',user.token);
                this.currentUserSubject.next(decodedToken);
                return user;
            }));
    }
    register(data:any){
      return this.http.post<any>(`${environment.apiUrl}/auth/register`,data)
            .pipe(map(user => {
                return user;
            }));
    }

    confirmAccount(confirmationCode:any){
      return this.http.get(`${environment.apiUrl}/auth/confirm/${confirmationCode}`);
    }
    forgotPassword(data:any){
      return this.http.post<any>(`${environment.apiUrl}/auth/forgot-password`,data)
            .pipe(map(user => {
              return user;
            }));
    }
    setNewPassword(otp:any,data:any){
      return this.http.post<any>(`${environment.apiUrl}/auth/confirm-forgot-password-otp/${otp}`,data)
            .pipe(map(user => {
              return user;
            }));
    }
    logout() {
      // remove user from local storage and set current user to null
      localStorage.removeItem('token');
      this.currentUserSubject.next(null!);
      this.notificationService.showSuccess("Logout Successfully","");
      this.router.navigate(['/auth/login']);
  }
}
