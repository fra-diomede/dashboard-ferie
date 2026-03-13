import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { AdminService } from '../../core/services/admin.service';
import { NotificationService } from '../../core/services/notification.service';
import { AdminUserDto } from '../../models/admin.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatTableModule
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users: AdminUserDto[] = [];
  displayedColumns = ['username', 'email', 'attivo', 'actions'];

  teamName = '';
  teamCountry = 'IT';
  teamManager = '';

  memberTeam = '';
  memberUsername = '';
  removeUsername = '';

  constructor(private adminService: AdminService, private notifications: NotificationService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.listUsers().subscribe(data => (this.users = data || []));
  }

  toggleUser(user: AdminUserDto) {
    this.adminService.setActive(user.username, !user.attivo).subscribe({
      next: () => {
        this.notifications.success('Utente aggiornato');
        this.loadUsers();
      }
    });
  }

  saveTeam() {
    if (!this.teamName) return;
    this.adminService
      .upsertTeam({ name: this.teamName, country: this.teamCountry, managerUsername: this.teamManager })
      .subscribe({
        next: () => {
          this.notifications.success('Team salvato');
        }
      });
  }

  assignMember() {
    if (!this.memberTeam || !this.memberUsername) return;
    this.adminService.assignMember(this.memberTeam, this.memberUsername).subscribe({
      next: () => {
        this.notifications.success('Membro assegnato');
      }
    });
  }

  unassignMember() {
    if (!this.removeUsername) return;
    this.adminService.unassignMember(this.removeUsername).subscribe({
      next: () => {
        this.notifications.success('Membro rimosso');
      }
    });
  }
}
