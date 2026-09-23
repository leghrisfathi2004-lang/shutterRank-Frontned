import { request, paginated } from './api.js';

const listTournaments = (page) => paginated('/tournois', page);
const getTournament = (id) => request(`/tournois/${id}`);
const getTournamentProfile = (id) => request(`/tournois/${id}/profile`);
const createTournament = ({ name, prizeId, teamIds }) =>
  request('/tournois/new', { method: 'POST', body: { name, prizeId, teamIds } });
const closeTournament = (id) => request(`/tournois/${id}/close`, { method: 'PUT' });

export {listTournaments, getTournament, getTournamentProfile, createTournament, closeTournament};