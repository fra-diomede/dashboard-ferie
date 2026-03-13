import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SuggestionDto, SuggestionRequest } from '../../models/suggestion.model';

@Injectable({ providedIn: 'root' })
export class SuggestionsService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  suggest(request: SuggestionRequest) {
    return this.http.post<SuggestionDto[]>(`${this.baseUrl}/suggestions`, request);
  }
}
