import { AuthConfig } from '../../domain/config/auth.config';

export class AuthConfigService implements AuthConfig {
  getSecretToken(): string {
    return '6c224e12f25f0ad981232a4503a49d0b';
  }

  getExpiresInToken(): string {
    return '30d';
  }

  getExpiresInRefreshToken(): string {
    return '30d';
  }

  getExpiresRefreshTokenDays(): number {
    return 30;
  }

  getSecretRefreshToken(): string {
    return '48848b5d1c26fe24442bffc7c97bf034';
  }
}
