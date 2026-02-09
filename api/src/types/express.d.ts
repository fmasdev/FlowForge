import type { AuthUser } from '@/common/types/auth-user.types';

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}
