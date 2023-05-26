import api from './api';

export async function getActivities(token) {
  const response = await api.get('/activities', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getBookingActivityByUser(token) {
  const response = await api.get('/activities/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
}

export async function getBookingsActivity(activityId, token) {
  const response = await api.get(`/activities/${activityId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
    
  return response.data;
}

export async function bookingActivity(activityId, token) {
  const response = await api.post('/activities', { activityId: activityId }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
