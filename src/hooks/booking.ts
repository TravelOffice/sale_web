import { useQuery } from '@tanstack/react-query';
import { bookingPresenter } from '@adapter/presenters';

export function useBookings() {
  return useQuery(['bookings'], async () => bookingPresenter.getBookings());
}

export function useBooking(id: string) {
  return useQuery(['bookings', id], async () => bookingPresenter.getBooking(id));
}

export function useBookingNotes(id: string) {
  const query = useBooking(id);
  return {
    ...query,
    data: query.data?.notes ?? [],
  };
}
