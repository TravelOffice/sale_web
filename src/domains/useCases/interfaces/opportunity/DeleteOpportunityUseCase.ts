export interface DeleteOpportunityUseCase {
  invoke: (oppId: string) => Promise<void>
}
