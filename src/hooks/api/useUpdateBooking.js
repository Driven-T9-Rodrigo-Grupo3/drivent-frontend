import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';

export default function useUpdateBooking(bookingId, roomId) {
  const token = useToken();
  console.log(bookingId, roomId, token);

  const {
    loading: updateBookingLoading,
    error: updateBookingError,
    act: putBooking,
  } = useAsync( () => bookingApi.updateBooking({ bookingId, roomId, token }), false);

  return {
    updateBookingLoading,
    updateBookingError,
    putBooking,
  };
}
