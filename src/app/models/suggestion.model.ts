export interface SuggestionRequest {
  username: string;
  year: number;
  desiredDays: number;
  topN?: number;
}

export interface SuggestionDto {
  start: string;
  end: string;
  score: number;
  reason: string;
}
