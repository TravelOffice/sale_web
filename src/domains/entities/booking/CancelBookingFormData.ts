import { Booking } from '@domain/entities/booking/Booking';

export type CancelBookingFormData = Pick<Booking,
'canceledReason'
>;
