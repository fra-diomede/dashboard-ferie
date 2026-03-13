import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private notifications: NotificationService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status !== 401) {
          const message = this.resolveMessage(error);
          this.notifications.error(message);
        }
        return throwError(() => error);
      })
    );
  }

  private resolveMessage(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return 'Connessione non disponibile. Verifica la rete.';
    }
    if (typeof error.error === 'string') {
      return error.error;
    }
    if (error.error?.message) {
      return error.error.message;
    }
    if (error.error?.error) {
      return error.error.error;
    }
    if (error.status === 403) {
      return 'Accesso negato. Non hai i permessi necessari.';
    }
    if (error.status === 404) {
      return 'Risorsa non trovata.';
    }
    if (error.status >= 500) {
      return 'Errore del server. Riprova tra poco.';
    }
    return 'Richiesta non valida. Controlla i dati inseriti.';
  }
}
