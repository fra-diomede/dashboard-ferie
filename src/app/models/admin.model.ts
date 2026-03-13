export interface AdminUserDto {
  id: number;
  username: string;
  email: string;
  attivo: boolean;
}

export interface TeamAdminRequest {
  name: string;
  country?: string | null;
  managerUsername?: string | null;
}

export interface Team {
  id: number;
  name: string;
  country?: string | null;
  managerUsername?: string | null;
}
