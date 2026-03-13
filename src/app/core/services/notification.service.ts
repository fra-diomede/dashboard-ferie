import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  success(message: string) {
    this.open(message, 'success');
  }

  error(message: string) {
    this.open(message, 'error');
  }

  info(message: string) {
    this.open(message, 'info');
  }

  private open(message: string, panelClass: string) {
    this.snackBar.open(message, 'Chiudi', {
      duration: 4000,
      panelClass: [`toast-${panelClass}`]
    });
  }
}
