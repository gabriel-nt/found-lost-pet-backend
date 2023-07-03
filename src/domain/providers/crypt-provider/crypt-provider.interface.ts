export interface CryptProvider {
  hash(value: string, salt?: number): Promise<string>;
  compare(value: string, encrypted_value: string): Promise<boolean>;
}
