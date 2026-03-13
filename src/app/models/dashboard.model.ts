import { FerieDto } from './ferie.model';
import { SuggestionDto } from './suggestion.model';

export interface StatisticheFerieDto {
  totali: number;
  godute: number;
  residue: number;
  percentualeUsate: number;
  percentualeResidue: number;
  breakdownPerTipologia?: Record<string, number> | null;
}

export interface ResiduoFerie {
  id?: number;
  username: string;
  anno: number;
  totaliGiorni: number;
  totaliPermessi: number;
  avanzateAnnoPrecedenteGiorni: number;
  avanzateAnnoPrecedentePermessi: number;
  createdBy?: string | null;
  updatedBy?: string | null;
}

export interface DashboardDto {
  statistiche: StatisticheFerieDto;
  residuoFerie?: ResiduoFerie | null;
  upcomingFerie?: FerieDto[];
  giorniLavorabiliAnno: number;
  giorniEffettiviLavorati: number;
  suggestions?: SuggestionDto[];
}
