import { Booking } from '@domain/entities/booking/Booking';

export type ConfirmBookingFormData = Pick<Booking,
'departureTourId' |
'totalPaid' |
'totalPayment'
>;
