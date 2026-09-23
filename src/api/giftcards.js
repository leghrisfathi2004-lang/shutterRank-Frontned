import { request, paginated } from './api.js';

function listGiftcards (page) {
  paginated('/giftcards', page);
}

function getGiftcard (id) {
  request(`/giftcards/${id}`);
}

function createGiftcard ({ code, provider, value }) {
  request('/giftcards/new', { method: 'POST', body: { code, provider, value } });

}

function assignGiftcard (id, winnerId) {
  request(`/giftcards/${id}/assign`, { method: 'PUT', body: { winnerId } });

}

export {listGiftcards, getGiftcard, createGiftcard, assignGiftcard}