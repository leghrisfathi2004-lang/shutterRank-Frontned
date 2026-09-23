# ShutterRank API — Endpoints

Base URL: `/api`

Auth: `Authorization: Bearer <token>` (token comes from register/login).

All responses follow: `{ success, status, message, data? }`.

**Paginated list endpoints** (marked ⚡ below) accept `?page=N` (default `1`). Fixed limit of 10. `data` shape is `{ items, page, limit, total, pages }`.

---

## Public (no auth)

| Method | URL | Body | Notes |
|--------|-----|------|-------|
| POST | `/auth/register` | `{ name, email, password }` | Returns `{ player, token }` |
| POST | `/auth/login` | `{ email, password }` | Returns `{ player, token }` |
| GET ⚡ | `/players?page=N` | — | Slim list (`name, score, teamId`) |
| GET ⚡ | `/players/leaderboard?page=N` | — | Players sorted by `score` desc (`_id, name, score`) |
| GET | `/players/:id` | — | Public profile (no email/role/password) |
| GET ⚡ | `/teams?page=N` | — | All teams |
| GET ⚡ | `/teams/open?page=N` | — | Only `status: open` |
| GET ⚡ | `/teams/full?page=N` | — | Only `status: full` |
| GET | `/teams/:id` | — | Raw team doc |
| GET | `/teams/:id/profile` | — | Team + leader + members + trophies + giftcards (no code) |
| GET ⚡ | `/matchs?page=N` | — | All matches |
| GET | `/matchs/:id` | — | Raw match doc |
| GET | `/matchs/:id/profile` | — | Match with teams, winner, tournoi, nextMatch populated |
| GET ⚡ | `/tournois?page=N` | — | All tournois |
| GET | `/tournois/:id` | — | Raw tournoi doc |
| GET | `/tournois/:id/profile` | — | Tournoi + prize + teams + all matches |

---

## User (Bearer token required)

| Method | URL | Body | Notes |
|--------|-----|------|-------|
| GET | `/players/me` | — | Full self view (email, role, teamId populated) |
| POST | `/teams/new` | `{ name }` | Authenticated user becomes the leader |
| POST | `/players/join` | `{ teamId }` | Join a team as a member |
| POST | `/players/quit` | — | Leave current team |

Guard: a player can be in only one team at a time, whether leader or member. Attempting to create or join a second team returns `400`.

---

## Admin (Bearer token + `role: admin`)

| Method | URL | Body | Notes |
|--------|-----|------|-------|
| POST | `/matchs/new` | `{ teamId1, teamId2, Date? }` | Creates a friendly match |
| PATCH | `/matchs/:id/goal` | `{ teamId }` | +1 goal for the team; match must be `live` |
| PATCH | `/matchs/:id/start` | — | Sets match status to `live` |
| PATCH | `/matchs/:id/finish` | `{ winnerId }` | Sets winner; advances bracket / awards prize if applicable |
| POST | `/tournois/new` | `{ name, prizeId?, teamIds }` | Creates tournoi + full bracket (teamIds length must be a power of 2) |
| PUT | `/tournois/:id/close` | — | Marks tournoi `complete` |
| GET ⚡ | `/giftcards?page=N` | — | List all gift cards (includes codes — admin-only) |
| GET | `/giftcards/:id` | — | Single gift card with code |
| POST | `/giftcards/new` | `{ code, provider, value }` | Create a new gift card |
| PUT | `/giftcards/:id/assign` | `{ winnerId }` | Assign the card to a winning team |

---

## Auth header example

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

## Pagination (⚡ endpoints)

- Query param: `?page=N` (defaults to `1`, invalid values fall back to `1`).
- Limit is fixed at **10**; not configurable via query.
- Response `data`:

```json
{
  "items": [ /* up to 10 docs */ ],
  "page": 1,
  "limit": 10,
  "total": 34,
  "pages": 4
}
```

An out-of-range page returns `items: []` with the same envelope.

## Error responses

Consistent shape from `errorHandler`:

```json
{ "success": false, "status": "fail", "message": "…" }
```

Common codes: `400` (validation / already in a team / team full), `401` (missing / invalid token), `403` (not admin), `404` (not found), `500` (server error).
