import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, map, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthResponse, AuthSession, LoginRequest, RefreshRequest, RegisterRequest } from '../../models/auth.model';
import { TokenStorageService } from './token-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = environment.apiBaseUrl;
  private readonly sessionSubject: BehaviorSubject<AuthSession | null>;
  readonly session$: Observable<AuthSession | null>;

  constructor(
    private http: HttpClient,
    private storage: TokenStorageService,
    private router: Router
  ) {
    this.sessionSubject = new BehaviorSubject<AuthSession | null>(this.storage.getSession());
    this.session$ = this.sessionSubject.asObservable();
  }

  login(req: LoginRequest): Observable<AuthSession> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, req).pipe(
      map(resp => this.applyAuthResponse(resp)),
      tap(session => this.setSession(session))
    );
  }

  register(req: RegisterRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/auth/register`, req);
  }

  refresh(): Observable<AuthSession> {
    const refreshToken = this.getRefreshToken();
    const payload: RefreshRequest = { refreshToken: refreshToken ?? '' };
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/refresh`, payload).pipe(
      map(resp => this.applyAuthResponse(resp, true)),
      tap(session => this.setSession(session))
    );
  }

  logout(): Observable<void> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      this.clearSession();
      return of(void 0);
    }
    return this.http.post<void>(`${this.baseUrl}/auth/logout`, { refreshToken }).pipe(
      finalize(() => this.clearSession())
    );
  }

  redirectToLogin() {
    this.router.navigate(['/auth/login']);
  }

  getAccessToken() {
    return this.sessionSubject.value?.accessToken ?? null;
  }

  getRefreshToken() {
    return this.sessionSubject.value?.refreshToken ?? null;
  }

  getSession() {
    return this.sessionSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  hasAnyRole(roles: string[]): boolean {
    const currentRoles = this.sessionSubject.value?.ruoli ?? [];
    return roles.some(role => currentRoles.includes(role) || currentRoles.includes(`ROLE_${role}`));
  }

  clearSession() {
    this.sessionSubject.next(null);
    this.storage.clear();
  }

  private setSession(session: AuthSession) {
    this.sessionSubject.next(session);
    this.storage.setSession(session);
  }

  private applyAuthResponse(resp: AuthResponse, allowPartial = false): AuthSession {
    const current = this.sessionSubject.value;
    const accessToken = resp.accessToken ?? current?.accessToken ?? '';
    const refreshToken = resp.refreshToken ?? current?.refreshToken ?? '';

    if (!allowPartial && (!accessToken || !refreshToken)) {
      throw new Error('Token non valido');
    }

    return {
      tokenType: resp.tokenType ?? current?.tokenType ?? 'Bearer',
      accessToken,
      refreshToken,
      expiresAt: resp.expiresAt ?? current?.expiresAt ?? null,
      username: resp.username ?? current?.username ?? '',
      nome: resp.nome ?? current?.nome ?? null,
      cognome: resp.cognome ?? current?.cognome ?? null,
      ruoli: resp.ruoli ?? current?.ruoli ?? []
    };
  }
}
