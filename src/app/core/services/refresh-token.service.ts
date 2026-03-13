import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class RefreshTokenService {
  private refreshing = false;
  private refreshSubject = new BehaviorSubject<string | null>(null);

  constructor(private authService: AuthService) {}

  refreshAccessToken(): Observable<string> {
    if (this.refreshing) {
      return this.refreshSubject.pipe(
        filter(token => !!token),
        take(1),
        map(token => token as string)
      );
    }

    if (!this.authService.getRefreshToken()) {
      return throwError(() => new Error('Refresh token mancante'));
    }

    this.refreshing = true;
    this.refreshSubject.next(null);

    return this.authService.refresh().pipe(
      map(() => this.authService.getAccessToken() ?? ''),
      tap(token => {
        this.refreshing = false;
        this.refreshSubject.next(token);
      }),
      catchError(err => {
        this.refreshing = false;
        this.refreshSubject.next(null);
        this.authService.clearSession();
        return throwError(() => err);
      })
    );
  }
}
