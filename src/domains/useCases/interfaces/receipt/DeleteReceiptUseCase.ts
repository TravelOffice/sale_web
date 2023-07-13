export interface DeleteReceiptUseCase {
  invoke: (id: string) => Promise<string>
}
