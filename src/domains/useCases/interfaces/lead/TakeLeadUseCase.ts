export interface TakeLeadUseCase {
  invoke: (leadId: string, currentUserId: string) => Promise<void>,
}
