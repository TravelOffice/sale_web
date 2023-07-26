import { tourRepository } from '@adapter/repositories';
import { Booking } from '@domain/entities/booking/Booking';
import { GetBookingsOfDepartureTourUseCase } from '../interfaces/tour/GetBookingsOfDepartureTourUseCase';

export default class GetBookingsOfDepartureTourUseCaseImpl
implements GetBookingsOfDepartureTourUseCase {
  invoke = async (
    departureTourId: string,
  ): Promise<Booking[]> => tourRepository.getBookingsByDepartureTour(departureTourId);
}
