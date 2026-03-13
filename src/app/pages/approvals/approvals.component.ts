import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FerieService } from '../../core/services/ferie.service';
import { NotificationService } from '../../core/services/notification.service';
import { FerieDto } from '../../models/ferie.model';

@Component({
  selector: 'app-approvals',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule
  ],
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.scss']
})
export class ApprovalsComponent {
  targetUsername = '';
  pendingOnly = true;
  ferie: FerieDto[] = [];
  rejectReason: Record<number, string> = {};

  constructor(private ferieService: FerieService, private notifications: NotificationService) {}

  load() {
    if (!this.targetUsername) return;
    this.ferieService.listByMatricola(this.targetUsername).subscribe(data => {
      const list = data || [];
      this.ferie = this.pendingOnly ? list.filter(this.isPending) : list;
    });
  }

  approve(item: FerieDto) {
    if (!item.id) return;
    this.ferieService.approve(item.id).subscribe({
      next: () => {
        this.notifications.success('Richiesta approvata');
        this.load();
      }
    });
  }

  reject(item: FerieDto) {
    if (!item.id) return;
    const reason = this.rejectReason[item.id] ?? '';
    this.ferieService.reject(item.id, reason).subscribe({
      next: () => {
        this.notifications.success('Richiesta rifiutata');
        this.load();
      }
    });
  }

  private isPending(item: FerieDto) {
    const status = item.tipoStatoFerie?.descrizione?.toUpperCase() ?? '';
    return ['PENDING', 'IN_ATTESA', 'RICHIESTA'].includes(status);
  }
}
