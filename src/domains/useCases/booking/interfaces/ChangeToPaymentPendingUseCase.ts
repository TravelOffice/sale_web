import { Booking } from '@domain/entities/booking/Booking';

export interface ChangeToPaymentPendingUseCase {
  invoke: (bookingId: string, waitingExpiredAt: number) => Promise<Partial<Booking>>
}
