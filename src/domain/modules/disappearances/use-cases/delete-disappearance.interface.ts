export interface DeleteDisappearanceUseCase {
  execute: (id: string) => Promise<void>;
}
