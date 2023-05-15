import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';

export default function useUpdateBooking(bookingId, roomId) {
  const token = useToken();

  const {
    loading: updateBookingLoading,
    error: updateBookingError,
    act: updateBooking,
  } = useAsync( () => bookingApi.updateBooking({ bookingId, roomId, token }));

  return {
    updateBookingLoading,
    updateBookingError,
    updateBooking,
  };
}
