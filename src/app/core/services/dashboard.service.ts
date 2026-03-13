import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DashboardDto } from '../../models/dashboard.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getDashboard(username: string, anno: number) {
    const params = new HttpParams().set('username', username).set('anno', anno);
    return this.http.get<DashboardDto>(`${this.baseUrl}/dashboard`, { params });
  }
}
