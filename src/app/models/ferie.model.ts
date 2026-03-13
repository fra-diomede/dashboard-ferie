export interface TipoFerie {
  id: number;
  descrizione: string;
}

export interface TipoStatoFerie {
  id: number;
  descrizione: string;
}

export interface FerieDto {
  id?: number;
  matricola: string;
  dataInizio: string;
  dataFine: string;
  createdBy?: string | null;
  updatedBy?: string | null;
  tipoFerie: TipoFerie;
  tipoStatoFerie?: TipoStatoFerie | null;
}

export interface FerieDecisionDto {
  managerUsername: string;
  decision: string;
  reason?: string | null;
  createdAt: string;
}
