import { Booking } from '@domain/entities/booking/Booking';

export type UpdateBookingFormData = Pick<Booking,
'tourTemplateId' |
'tourTemplateName' |
'tourTemplate' |
'tourType' |
'departureTourId' |
'departureDate' |
'assigneeId' |
'sourceId' |
'notes' |
'services' |
'passengers' |
'totalPaid' |
'totalPayment'
>;
