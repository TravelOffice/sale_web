import { Booking } from '@domain/entities/booking/Booking';

export type PaymentPendingFormData = Pick<Booking,
'waitingExpiredAt'
>;
