import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { RefreshTokenService } from '../services/refresh-token.service';

@Injectable()
export class RefreshInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private refreshService: RefreshTokenService
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status !== 401 || this.isAuthRequest(req.url)) {
          return throwError(() => error);
        }

        return this.refreshService.refreshAccessToken().pipe(
          switchMap(() => {
            const token = this.authService.getAccessToken();
            if (!token) {
              this.authService.redirectToLogin();
              return throwError(() => error);
            }
            const tokenType = this.authService.getSession()?.tokenType ?? 'Bearer';
            const retry = req.clone({
              setHeaders: { Authorization: `${tokenType} ${token}` }
            });
            return next.handle(retry);
          }),
          catchError(refreshErr => {
            this.authService.redirectToLogin();
            return throwError(() => refreshErr);
          })
        );
      })
    );
  }

  private isAuthRequest(url: string): boolean {
    return url.includes('/auth/login') || url.includes('/auth/register') || url.includes('/auth/refresh');
  }
}
