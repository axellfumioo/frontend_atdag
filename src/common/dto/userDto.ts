export interface CreateUsereDto {
    name: string;
    email: string;
    password: string;
    phone: number;
    address: string;
}

export interface UpdateUserDto {
    name: string;
    email: string;
    password: string;
    phone: number;
    address: string;
    roleId?: number | null;
}

export interface ChangePasswordDTO {
  old_password: string;
  new_password: string;
}