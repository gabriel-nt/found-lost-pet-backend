export interface DeleteUserAddressUseCase {
  execute: (id: string) => Promise<void>;
}
