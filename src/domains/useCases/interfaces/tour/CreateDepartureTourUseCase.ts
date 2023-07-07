import { DepartureTour } from '@domain/entities/tour';

export interface CreateDepartureTourUseCase {
  invoke: (departureTour: DepartureTour) => Promise<DepartureTour>
}
