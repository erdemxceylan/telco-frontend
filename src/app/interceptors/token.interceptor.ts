import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { Injectable } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private localStorage: LocalStorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const userToken = this.localStorage.get('token');
    if (this.localStorage.get('token')) {
      const modifiedReq = request.clone({
        setHeaders: { Authorization: `Bearer ${userToken}` },
      });
      console.log('if çalıştı');
      return next.handle(modifiedReq);
    } else {
      console.log('else çalıştı');
      return next.handle(request);
    }
  }
}