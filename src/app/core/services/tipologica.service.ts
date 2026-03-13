import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TipoFerieDto, TipoStatoFerieDto } from '../../models/tipologica.model';
import { Observable, shareReplay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TipologicaService {
  private readonly baseUrl = environment.apiBaseUrl;
  private tipoFerie$?: Observable<TipoFerieDto[]>;
  private tipoStatoFerie$?: Observable<TipoStatoFerieDto[]>;

  constructor(private http: HttpClient) {}

  getTipoFerie() {
    if (!this.tipoFerie$) {
      this.tipoFerie$ = this.http
        .get<TipoFerieDto[]>(`${this.baseUrl}/tipologica/tipo-ferie`)
        .pipe(shareReplay(1));
    }
    return this.tipoFerie$;
  }

  getTipoStatoFerie() {
    if (!this.tipoStatoFerie$) {
      this.tipoStatoFerie$ = this.http
        .get<TipoStatoFerieDto[]>(`${this.baseUrl}/tipologica/tipo-stato-ferie`)
        .pipe(shareReplay(1));
    }
    return this.tipoStatoFerie$;
  }
}
