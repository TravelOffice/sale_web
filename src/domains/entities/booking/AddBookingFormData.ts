import { BookingTourType } from '@domain/entities/booking/Booking';
import { HonorificType } from '@domain/entities/lead/Lead';
import { Service } from '@domain/entities/booking/Service';
import { Passenger } from '@domain/entities/booking/Passenger';

export interface AddBookingFormData {
  // Customer information, new customer will be created in database if not existed
  customer: {
    email: string
    primaryPhoneNumber: string
    honorific: HonorificType
    name: string
    address: string
  },
  // Reference to TourTemplate model, each TourTemplate is identified by pk+sk pair
  tourTemplateId: string,
  // One kind of ['shared', 'group', 'solo']
  tourType: BookingTourType,
  // Expected begin date of trip
  departureDate: number,
  // Reference to Sale model, each Sale is identified by pk+sk pair
  assigneeId: string,
  // Reference to Source model
  // For example, source can be Facebook, CallCenter, Social, etc
  sourceId: string,
  // Reference to Service model
  services: Service[]
  // Reference to Passenger model
  passengers: Passenger[]
}
