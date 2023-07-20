import { tourRepository } from '@adapter/repositories';
import { DepartureTour } from '@domain/entities/tour';
import { AssignTourOperator } from '../interfaces/tour/AssignTourOperator';

export default class AssignTourOperatorImpl implements AssignTourOperator {
  invoke = async (
    departureTourId: string,
    tourOperatorId: string,
  ): Promise<DepartureTour> => tourRepository.assignTourOperator(departureTourId, tourOperatorId);
}
