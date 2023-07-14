import { DepartureTour } from '@domain/entities/tour';

export interface GetAllDepartureToursUseCase {
  invoke: () => Promise<DepartureTour[]>
}
