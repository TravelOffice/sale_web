export interface DeleteSourceUseCase {
  invoke: (id: string) => Promise<void>,
}
