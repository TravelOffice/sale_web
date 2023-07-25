import { DepartureTour } from '@domain/entities/tour';

export interface AssignTourOperator {
  invoke: (departureTourId: string, tourOperatorId: string) => Promise<DepartureTour>
}
