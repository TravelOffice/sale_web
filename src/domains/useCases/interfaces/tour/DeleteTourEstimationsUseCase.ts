export interface DeleteTourEstimationsUseCase {
  invoke: (departureTourId: string, estimationId: string) => Promise<void>
}
