export interface AuthConfig {
  getSecretToken(): string;
  getExpiresInToken(): string;
  getExpiresInRefreshToken(): string;
  getExpiresRefreshTokenDays(): number;
  getSecretRefreshToken(): string;
}
