import { request, paginated } from './api.js';

const listTeams = (page) => paginated('/teams', page);
const listOpenTeams = (page) => paginated('/teams/open', page);
const listFullTeams = (page) => paginated('/teams/full', page);
const getTeam = (id) => request(`/teams/${id}`);
const getTeamProfile = (id) => request(`/teams/${id}/profile`);
const createTeam = (name) => request('/teams/new', { method: 'POST', body: { name } });

export {listFullTeams, listOpenTeams, listTeams, getTeam, getTeamProfile, createTeam};