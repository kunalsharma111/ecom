import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError ,retry ,finalize} from 'rxjs/operators';

import { NotificationService, AuthService } from '../services/index';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private notificationService : NotificationService,
    private authService : AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
    .pipe(
      retry(0),
      catchError(err => {
      const errorMessage = this.setError(err);
        
      if (errorMessage != undefined && errorMessage != null) {
        this.notificationService.showError(errorMessage, '');
      }
      if([401,403].indexOf(err.status) !== 1){
        this.authService.logout();
      }
      return throwError(errorMessage);
    }),
    finalize(() => {
      const profilingMsg = `${request.method} "request.urlWithParams"`;
    })
    )
  }

  setError(error: HttpErrorResponse): string {
    let errorMessage = 'Unknown error occured';
    
    if (error.error instanceof ErrorEvent) {
      // Client side error
      errorMessage = error.error.message;
    } else {
      // server side error
      if (error.status !== 0) {
        errorMessage = error.error.message;
      }
    }
    return errorMessage;
  }
}
