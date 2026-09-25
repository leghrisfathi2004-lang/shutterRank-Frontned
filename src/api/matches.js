import { request, paginated } from './api.js';

const listMatches = (page) => paginated('/matchs', page);
const getMatch = (id) => request(`/matchs/${id}`);
const getMatchProfile = (id) => request(`/matchs/${id}/profile`);
const createMatch = ({ teamId1, teamId2 }) =>
  request('/matchs/new', { method: 'POST', body: { teamId1, teamId2 } });
const startMatch = (id) => request(`/matchs/${id}/start`, { method: 'PATCH' });
// teamId = side that scored, scorerId = player who scored (gets +1 score)
const addGoal = (id, teamId, scorerId) =>
  request(`/matchs/${id}/goal`, { method: 'PATCH', body: { teamId, scorerId } });
const finishMatch = (id, winnerId) =>
  request(`/matchs/${id}/finish`, { method: 'PATCH', body: { winnerId } });

export {listMatches, getMatch, getMatchProfile, createMatch, startMatch, addGoal, finishMatch};