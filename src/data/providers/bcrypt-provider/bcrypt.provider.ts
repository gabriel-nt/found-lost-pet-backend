import { CryptProvider } from './../../../domain/providers/crypt-provider/crypt-provider.interface';

export class BcryptProvider implements CryptProvider {
  async hash(value: string, salt?: number): Promise<string> {
    return value;
  }

  async compare(encrypted_value: string, value: string): Promise<boolean> {
    return encrypted_value === value;
  }
}
