import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ForecastDto, TeamAbsenceDto, TeamMonthlyReportDto } from '../../models/team.model';

@Injectable({ providedIn: 'root' })
export class TeamService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getTeamCalendar(team: string, from: string, to: string, approvedOnly = true) {
    const params = new HttpParams()
      .set('from', from)
      .set('to', to)
      .set('approvedOnly', approvedOnly);
    return this.http.get<TeamAbsenceDto[]>(`${this.baseUrl}/team/${team}/calendar`, { params });
  }

  whoIsOff(team: string, date: string) {
    const params = new HttpParams().set('date', date);
    return this.http.get<string[]>(`${this.baseUrl}/team/${team}/who-is-off`, { params });
  }

  monthlyReport(team: string, year: number, month: number) {
    const params = new HttpParams().set('year', year).set('month', month);
    return this.http.get<TeamMonthlyReportDto>(`${this.baseUrl}/team/${team}/report`, { params });
  }

  forecast(username: string, year: number) {
    const params = new HttpParams().set('year', year);
    return this.http.get<ForecastDto>(`${this.baseUrl}/team/users/${username}/forecast`, { params });
  }

  exportIcs(username: string, year: number) {
    const params = new HttpParams().set('year', year);
    return this.http.get(`${this.baseUrl}/team/users/${username}/export.ics`, {
      params,
      responseType: 'text'
    });
  }
}
