export interface TeamAbsenceDto {
  username: string;
  start: string;
  end: string;
  tipoFerie: string;
  stato: string;
}

export interface TeamMonthlyReportDto {
  team: string;
  year: number;
  month: number;
  totalRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
  daysByUser: Record<string, number>;
}

export interface ForecastDto {
  username: string;
  year: number;
  totalEntitlement: number;
  consumedToDate: number;
  projectedConsumed: number;
  projectedResidual: number;
  riskUnusedDays: boolean;
}
