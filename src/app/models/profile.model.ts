export interface RequestAggiornaProfiloDto {
  username?: string;
  password?: string;
  email?: string;
  ruoli?: string[];
  attivo?: boolean;
}

export interface RequestChangePasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
