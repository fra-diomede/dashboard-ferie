import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FerieDecisionDto, FerieDto } from '../../models/ferie.model';
import { StatisticheFerieDto } from '../../models/dashboard.model';

@Injectable({ providedIn: 'root' })
export class FerieService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  listByMatricola(matricola: string) {
    return this.http.get<FerieDto[]>(`${this.baseUrl}/dashboard/ferie/matricole/${matricola}`);
  }

  create(ferie: FerieDto) {
    return this.http.post<FerieDto>(`${this.baseUrl}/dashboard/ferie`, ferie);
  }

  update(id: number, ferie: FerieDto) {
    return this.http.put<FerieDto>(`${this.baseUrl}/dashboard/ferie/${id}/aggiorna`, ferie);
  }

  delete(id: number) {
    return this.http.delete<boolean>(`${this.baseUrl}/dashboard/ferie/${id}`);
  }

  approve(id: number) {
    return this.http.put<FerieDto>(`${this.baseUrl}/dashboard/ferie/${id}/approve`, {});
  }

  reject(id: number, reason?: string) {
    return this.http.put<FerieDto>(`${this.baseUrl}/dashboard/ferie/${id}/reject`, { reason: reason ?? null });
  }

  getDecisionHistory(id: number) {
    return this.http.get<FerieDecisionDto[]>(`${this.baseUrl}/dashboard/ferie/${id}/decisions`);
  }

  getStatistiche(username: string, anno: number) {
    const params = new HttpParams().set('username', username).set('anno', anno);
    return this.http.get<StatisticheFerieDto>(`${this.baseUrl}/dashboard/ferie/stats`, { params });
  }
}
