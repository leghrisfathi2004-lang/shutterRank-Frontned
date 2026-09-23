import { request } from './api.js';
import { setToken } from '../lib/token.js';

export async function register({ name, email, password }) {
  const data = await request('/auth/register', {
    method: 'POST',
    body: { name, email, password },
    auth: false,
  });
  if (data?.token) setToken(data.token);
  return data;
}

export async function login({ email, password }) {
  const data = await request('/auth/login', {
    method: 'POST',
    body: { email, password },
    auth: false,
  });
  if (data?.token) setToken(data.token);
  return data;
}
