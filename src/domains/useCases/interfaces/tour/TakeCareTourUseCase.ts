import { DepartureTour } from '@domain/entities/tour';

export interface TakeCareTourUseCase {
  invoke: (departureTourId: string) => Promise<DepartureTour>
}
