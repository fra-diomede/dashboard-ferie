import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CalendarioDto } from '../../models/calendario.model';

@Injectable({ providedIn: 'root' })
export class CalendarioService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getCalendario(anno: number, country?: string | null) {
    let params = new HttpParams();
    if (country) {
      params = params.set('country', country);
    }
    return this.http.get<CalendarioDto[]>(`${this.baseUrl}/calendario/anno/${anno}`, { params });
  }
}
