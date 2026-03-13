import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AdminUserDto, Team, TeamAdminRequest } from '../../models/admin.model';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  listUsers() {
    return this.http.get<AdminUserDto[]>(`${this.baseUrl}/admin/users`);
  }

  setActive(username: string, active: boolean) {
    return this.http.put<boolean>(`${this.baseUrl}/admin/users/${username}/active`, active);
  }

  upsertTeam(request: TeamAdminRequest) {
    return this.http.post<Team>(`${this.baseUrl}/admin/teams`, request);
  }

  assignMember(teamName: string, username: string) {
    return this.http.post<boolean>(`${this.baseUrl}/admin/teams/${teamName}/members/${username}`, {});
  }

  unassignMember(username: string) {
    return this.http.delete<boolean>(`${this.baseUrl}/admin/teams/members/${username}`);
  }
}
