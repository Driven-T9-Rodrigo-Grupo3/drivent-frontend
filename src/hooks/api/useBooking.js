
import * as bookingApi from '../../services/bookingApi';
import useAsync from '../useAsync';
import useToken from '../useToken';

export default function useBooking() {
  const token = useToken();

  const { 
    data: booking,
    loading: bookingLoading,
    error: bookingError,
    act: getBooking
  } = useAsync( () => bookingApi.getBooking(token));

  return {
    booking, 
    bookingLoading,
    bookingError,
    getBooking
  };
}
