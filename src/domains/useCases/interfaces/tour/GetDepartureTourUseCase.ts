import { DepartureTour } from '@domain/entities/tour/DepartureTour';

export interface GetDepartureTourUseCase {
  invoke: (departureTourId: string) => Promise<DepartureTour>
}
