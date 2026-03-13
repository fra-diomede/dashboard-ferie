export interface FestivoDto {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties?: string[] | null;
  launchYear?: number | null;
  types?: string[] | null;
}

export interface CalendarioDto {
  data: string;
  giornoMese: number;
  giornoSettimana: string;
  sunday: boolean;
  officialFestivo: boolean;
  festivo?: FestivoDto | null;
}
