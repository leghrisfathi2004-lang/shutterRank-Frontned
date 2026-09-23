import axios from 'axios';
import { API_URL } from '../config.js';
import { getToken, clearToken } from '../lib/token.js';

//axios.create({ baseURL }): creates a custom Axios instance with the API address already set. You write api.get("/users") instead of the full URL each time.
const api = axios.create({ baseURL: API_URL });

api.interceptors.response.use(
  (res) => res.data?.data,
  (err) => {
    const status = err.response?.status;
    const message = err.response?.data?.message || err.message;
    if (status === 401) clearToken();
    const e = new Error(message);
    e.status = status;
    return Promise.reject(e);
  }
);

export function request(path, { method = 'GET', body, auth = true, headers = {} } = {}) {
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  return api.request({ url: path, method, data: body, headers });
}

export function paginated(path, page = 1) {
  const n = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const sep = path.includes('?') ? '&' : '?';
  return request(`${path}${sep}page=${n}`);
}
