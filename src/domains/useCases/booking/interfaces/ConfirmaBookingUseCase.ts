export interface ConfirmBookingUseCase {
  invoke: (bookingId: string, departureTourId: string) => Promise<void>
}
