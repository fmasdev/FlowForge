import type { Role } from '@/common/enums/role.enum';

export interface AuthUserType {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  role: Role;
}
