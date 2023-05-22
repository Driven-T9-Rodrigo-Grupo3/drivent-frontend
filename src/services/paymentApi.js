import api from './api';

export async function postPayment(body, token) {
  const response = await api.post('/payments/process', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function postStripePayment(token) {
  const response = await api.post('/payments/create-checkout-session', null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}

export async function verifyPayment(token) {
  try {
    const response = await api.get('/payments/verify', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.paid;
  } catch (error) {
    return false;
  }
}
