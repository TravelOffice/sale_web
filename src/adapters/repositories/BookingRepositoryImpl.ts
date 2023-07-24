import { apiProvider } from '@adapter/infrastructures';
import { BookingRepository } from '@adapter/repositories/interfaces/BookingRepository';
import { AddBookingFormData } from '@domain/entities/booking/AddBookingFormData';
import { AddBookingFromLeadFormData } from '@domain/entities/booking/AddBookingFromLeadFormData';
import { BookingStatus } from '@domain/entities/booking/Booking';
import { UpdateBookingFormData } from '@domain/entities/booking/UpdateBookingFormData';
import { CreateNoteFormData } from '@domain/entities/note/Note';

export default class BookingRepositoryImpl implements BookingRepository {
  /**
   * Directly add new booking to system
   * Booking data includes customer and tour information
   * @param formData New booking data input from form data
   */
  addBooking = async (formData: AddBookingFormData) => {
    const response = await apiProvider.authorizedRequest.post('/bookings', formData);
    return response.data;
  }

  /**
   * Add new booking to system through lead
   * Booking data includes lead and tour information
   * @param formData New booking data input from form data
   */
  addBookingFromLead = async (formData: AddBookingFromLeadFormData) => {
    const response = await apiProvider.authorizedRequest.post('/bookings/create-from-lead', formData);
    return response.data;
  }

  /**
   * Get booking by given id
   * @param bookingId Booking id
   */
  getBooking = async (bookingId: string) => {
    const response = await apiProvider.authorizedRequest.get(`/bookings/${bookingId}`);
    return response.data;
  }

  /**
   * Get bookings list
   * @param status Filtered status if have
   */
  getBookings = async (status?: BookingStatus) => {
    let response;
    if (status) {
      response = await apiProvider.authorizedRequest.get('/bookings-by-status', {
        queryParams: {
          status,
        },
      });
    } else {
      response = await apiProvider.authorizedRequest.get('/bookings');
    }

    return response.data;
  }

  /**
   * Update booking to system
   * @param bookingId The ID of booking
   * @param booking New booking information
   */
  updateBooking = async (bookingId: string, booking: UpdateBookingFormData) => {
    const response = await apiProvider.authorizedRequest.put(`/bookings/${bookingId}`, booking);
    return response.data;
  }

  /**
   * Change booking status
   * Transition rules are defined at [Booking] class
   * @param bookingId Booking id
   * @param status New status
   * @param reason Reason if new status is 'CANCELED'
   */
  changeStatus = async (bookingId: string, status: BookingStatus, reason?: string) => {
    let response;
    if (status === 'CANCELED') {
      // Call cancel api
      response = await apiProvider.authorizedRequest.put(`/bookings/${bookingId}/cancel`, { reason });
    } else {
      // TODO: Implement later since backend api is not defined yet
      throw new Error('Not implemented yet.');
    }

    return response.data;
  }

  /**
   * Adds a new note to a specific booking.
   *
   * @param bookingId - The ID of the booking to which the note will be added.
   * @param formData - The data for the new note in the form of `CreateNoteFormData`.
   * @returns A Promise that resolves to the data of the newly added note from the
   * server's response.
   */
  addNote = async (bookingId: string, formData: CreateNoteFormData) => {
    const response = await apiProvider.authorizedRequest.post(`/bookings/${bookingId}/notes`, formData);
    return response.data;
  }
}
