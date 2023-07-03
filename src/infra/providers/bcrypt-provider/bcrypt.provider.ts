import { hash, compare } from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { CryptProvider } from './../../../domain/providers/crypt-provider/crypt-provider.interface';

@Injectable()
export class BcryptProvider implements CryptProvider {
  async hash(value: string, salt?: number): Promise<string> {
    return await hash(value, salt);
  }

  async compare(encrypted_value: string, value: string): Promise<boolean> {
    return await compare(encrypted_value, value);
  }
}
