import { request, paginated } from './api.js';

function listGiftcards (page) {
  return paginated('/giftcards', page);
}

function getGiftcard (id) {
  return request(`/giftcards/${id}`);
}

function createGiftcard ({ code, provider, value }) {
  return request('/giftcards/new', { method: 'POST', body: { code, provider, value } });
}

function assignGiftcard (id, winnerId) {
  return request(`/giftcards/${id}/assign`, { method: 'PUT', body: { winnerId } });
}

export {listGiftcards, getGiftcard, createGiftcard, assignGiftcard};
