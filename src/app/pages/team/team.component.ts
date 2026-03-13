import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TeamService } from '../../core/services/team.service';
import { TeamAbsenceDto, TeamMonthlyReportDto, ForecastDto } from '../../models/team.model';
import { toIsoDate } from '../../core/utils/date.util';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSlideToggleModule
  ],
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  teamName = '';
  fromDate = toIsoDate(new Date());
  toDate = toIsoDate(new Date());
  approvedOnly = true;
  calendar: TeamAbsenceDto[] = [];

  whoIsOffDate = toIsoDate(new Date());
  whoIsOffUsers: string[] = [];

  reportYear = new Date().getFullYear();
  reportMonth = new Date().getMonth() + 1;
  report?: TeamMonthlyReportDto;

  forecastUsername = '';
  forecastYear = new Date().getFullYear();
  forecast?: ForecastDto;

  displayedColumns = ['username', 'start', 'end', 'tipo', 'stato'];

  constructor(private teamService: TeamService) {}

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.teamName = localStorage.getItem('timeoffly.team') ?? '';
    }
  }

  saveTeam() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('timeoffly.team', this.teamName);
    }
  }

  loadCalendar() {
    if (!this.teamName) return;
    this.teamService.getTeamCalendar(this.teamName, this.fromDate, this.toDate, this.approvedOnly).subscribe(data => {
      this.calendar = data || [];
    });
  }

  loadWhoIsOff() {
    if (!this.teamName) return;
    this.teamService.whoIsOff(this.teamName, this.whoIsOffDate).subscribe(data => {
      this.whoIsOffUsers = data || [];
    });
  }

  loadReport() {
    if (!this.teamName) return;
    this.teamService.monthlyReport(this.teamName, this.reportYear, this.reportMonth).subscribe(data => {
      this.report = data;
    });
  }

  loadForecast() {
    if (!this.forecastUsername) return;
    this.teamService.forecast(this.forecastUsername, this.forecastYear).subscribe(data => {
      this.forecast = data;
    });
  }
}
