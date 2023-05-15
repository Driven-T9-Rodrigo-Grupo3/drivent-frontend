import api from './api';

export async function bookingRoom(roomId, token) {
  const response = await api.post('/booking', { roomId: roomId }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
