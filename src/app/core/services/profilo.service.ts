import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { RequestAggiornaProfiloDto, RequestChangePasswordDto } from '../../models/profile.model';

@Injectable({ providedIn: 'root' })
export class ProfiloService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  exists(username: string) {
    return this.http.get<boolean>(`${this.baseUrl}/profili/${username}`);
  }

  update(username: string, payload: RequestAggiornaProfiloDto) {
    return this.http.put<boolean>(`${this.baseUrl}/profili/${username}`, payload);
  }

  changePassword(username: string, payload: RequestChangePasswordDto) {
    return this.http.put<boolean>(`${this.baseUrl}/profili/${username}/password`, payload);
  }

  delete(username: string, password: string) {
    return this.http.request<boolean>('delete', `${this.baseUrl}/profili/${username}`, { body: password });
  }
}
