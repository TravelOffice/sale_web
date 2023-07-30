import { Estimation } from '@domain/entities/tour/Estimation';

export interface GetTourEstimationsUseCase {
  invoke: (departureTourId: string) => Promise<Estimation[]>
}
