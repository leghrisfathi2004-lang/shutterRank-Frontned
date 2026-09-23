import { request, paginated } from './api.js';

const listPlayers = (page) => paginated('/players', page);
const getLeaderboard = (page) => paginated('/players/leaderboard', page);
const getPlayer = (id) => request(`/players/${id}`);
const getMe = () => request('/players/me');
const joinTeam = (teamId) => request('/players/join', { method: 'POST', body: { teamId } });
const quitTeam = () => request('/players/quit', { method: 'POST' });

export {listPlayers, getLeaderboard, getMe, getPlayer, joinTeam, quitTeam};