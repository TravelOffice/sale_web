import { BookingTourType } from '@domain/entities/booking/Booking';
import { HonorificType } from '@domain/entities/lead/Lead';

export interface AddBookingFormData {
  // Customer information, new customer will be created in database if not existed
  customer: {
    email: string
    phone: string
    honorific: HonorificType
    fullName: string
    address: string
  },
  // Reference to TourTemplate model, each TourTemplate is identified by pk+sk pair
  tourTemplateId: string,
  // One kind of ['shared', 'group', 'solo']
  tourType: BookingTourType,
  // Expected begin date of trip
  departureDate: string,
  // Reference to Sale model, each Sale is identified by pk+sk pair
  assigneeId: string
}
