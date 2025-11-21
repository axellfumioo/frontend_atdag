export interface CreateUsereDto {
  name: string;
  email: string;
  password: string;
  phone: string;   
  address: string;
  role_Id: number;  
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  address?: string;
  roleId?: number | null;
}

export interface ChangePasswordDTO {
  old_password: string;
  new_password: string;
}