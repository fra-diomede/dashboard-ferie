import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  loading = false;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notifications: NotificationService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contratto: ['', Validators.required],
      ferieAnnue: [null, [Validators.required, Validators.min(0)]],
      permessiAnnueOre: [null, [Validators.required, Validators.min(0)]],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.invalid || this.loading) return;
    this.loading = true;
    const { nome, cognome, username, email, contratto, ferieAnnue, permessiAnnueOre, password } = this.form.getRawValue();
    this.authService
      .register({
        nome: nome ?? '',
        cognome: cognome ?? '',
        username: username ?? '',
        email: email ?? '',
        contratto: contratto ?? '',
        ferieAnnue: typeof ferieAnnue === 'number' ? ferieAnnue : Number(ferieAnnue ?? 0),
        permessiAnnueOre:
          typeof permessiAnnueOre === 'number' ? permessiAnnueOre : Number(permessiAnnueOre ?? 0),
        password: password ?? ''
      })
      .subscribe({
        next: () => {
          this.notifications.success('Registrazione completata. Ora puoi accedere.');
          this.router.navigate(['/auth/login']);
        },
        error: () => {
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
  }
}
