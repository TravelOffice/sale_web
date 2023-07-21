import { Booking } from '@domain/entities/booking/Booking';

export type UpdateBookingFormData = Pick<Booking,
'tourTemplateId' |
'tourTemplate' |
'tourType' |
'departureDate' |
'assigneeId' |
'sourceId' |
'notes' |
'services'
>;
