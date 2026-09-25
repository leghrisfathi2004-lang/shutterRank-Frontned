# ShutterRank Frontend — Onboarding

Living context for whoever picks this project up.

---

## What is this
Frontend for **ShutterRank** — a team/tournament tracker (football/gaming vibe). Backend is a separate service documented in `backend_API.md` at project root (READ IT FIRST). Backend runs on `localhost:3000` and mounts routes at `/api`.

**Current state**: feature-complete, UI polished (clean minimal style), code kept deliberately simple — it's a school project, every file should be readable top to bottom.

---

## Stack
- **React 19** + **Vite 8**
- **React Router 7** — client-side routing
- **Tailwind CSS v4** — via `@tailwindcss/vite` plugin, class-based dark mode
- **lucide-react** — icons (`<Trophy size={16} />`)
- **Inter** font — loaded from Google Fonts in `index.html`
- **axios** — through a single wrapper (`src/api/api.js`), interceptor unwraps `{success, data}` envelope
- **No state library** — React Context is enough for auth
- **JWT auth** — token in `localStorage` under `sr_token`, auto-attached in request interceptor

---

## Folder layout

```
src/
├── api/               # one file per resource
│   ├── api.js         # axios instance, request(), paginated()
│   ├── auth.js        # register, login
│   ├── players.js     # listPlayers, getLeaderboard, getMe, joinTeam, quitTeam, ...
│   ├── teams.js       # listTeams, listOpenTeams, listFullTeams, getTeamProfile, createTeam
│   ├── matches.js     # listMatches, getMatchProfile, createMatch, startMatch, addGoal, finishMatch
│   ├── tournaments.js # listTournaments, getTournamentProfile, createTournament, closeTournament
│   └── giftcards.js   # listGiftcards, createGiftcard, assignGiftcard
├── Context/
│   └── AuthContext.jsx  # useAuth() → {user, loading, logout, refreshUser}
├── hooks/
│   └── useFetch.js    # {data, error, loading, refetch}(fn, deps)
├── lib/
│   └── token.js       # get/set/clearToken (localStorage safe-wrapped)
├── components/        # all reusable components (flat)
├── pages/             # one file per route
├── App.jsx            # Navbar + <Routes> (with the auth/admin guards)
├── config.js          # API_URL, TOKEN_KEY, TEAM_MAX_PLAYERS (= 11)
├── index.css          # Tailwind import, @theme tokens, base styles
└── main.jsx           # <StrictMode><BrowserRouter><AuthProvider><App/>…
```

---

## Conventions

### 1. Every page follows the same shape
```jsx
function Players() {
  const [page, setPage] = useState(1);
  const { data, error, loading, refetch } = useFetch(() => listPlayers(page), [page]);

  return (
    <div>
      <PageHeader title="Players" subtitle="Everyone on ShutterRank." />
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error} onRetry={refetch} />
      ) : (
        <>
          <PlayersTable players={data.items} />
          <Pagination page={data.page} pages={data.pages} onChange={setPage} />
        </>
      )}
    </div>
  );
}
```
Detail pages use early returns: `if (loading) return <Loader />; if (error) return <ErrorMessage … />;`.
Small page-only pieces (scoreboard, members list, login form) are written **inside the page**, not as separate components.

### 2. Each modal is its own file — NO shared `Modal` primitive
Explicitly rejected by the user. Each modal contains its own backdrop + panel + form + API call. Duplication is fine.

Every modal takes `{ onClose, onSuccess }`. Backdrop click closes, `stopPropagation` on the panel. Same layout everywhere: header (title + one-line text + X button) → body → grey footer (Cancel + main action).

### 3. `useFetch` for every GET
```js
const { data, error, loading, refetch } = useFetch(() => fn(...args), [deps]);
```
`refetch()` re-runs the fetch. Call it after mutations. For pagination, put `page` in the deps.

### 4. `useAuth()` is the single source of truth for the current user
- `user` — full profile with `role` (`'player' | 'admin'`) and `teamId` populated (or null)
- `refreshUser()` — call after join/quit/create team
- Login/Register pages call `api/auth.js` directly (it saves the token), then `refreshUser()` loads the user

### 5. Guards (all in `App.jsx`)
- Every route except `/`, `/login`, `/register` sits inside one `<RequireAuth><Outlet/></RequireAuth>` layout route → not logged in = redirect to `/login`
- `/giftcards*` sits inside a nested `<RequireAdmin>` layout route → non-admin = redirect to `/`
- **Also gate UI**: `{user?.role === 'admin' && <Button …/>}` for admin buttons on shared pages
- Navbar shows no page links when logged out (only "Sign in")

### 6. Function-declaration + bottom export style (user pref)
```js
const listX = (page) => paginated('/x', page);
export { listX };
```
For components: `function Foo() {}; export default Foo;`

---

## Design system

### Tokens — `@theme` in `src/index.css`
- `brand-{50,100,300…700}` — emerald: primary buttons, active states, "live"/"open"
- `accent-{50,100,400,500,600}` — amber: **only** prizes, trophies, gift cards
- `rounded-card`, `rounded-pop` — card / popup radius
- `shadow-card` (resting), `shadow-pop` (hover, menus, modals)
- `animate-fade-in`, `animate-scale-in`, `animate-shimmer`
- Everything else: Tailwind neutrals (`neutral-200/800` borders, white/`neutral-900` surfaces, `neutral-50/950` page background)

### Dark mode
- Class-based: `<html class="dark">`
- `ThemeToggle.jsx` (sun/moon icon) flips the class + saves to `localStorage.sr_theme`
- Pre-render script in `index.html` sets the class before paint (no flash)

### Layout
- `<main className="w-full px-4 py-8 md:px-8">` — full width
- Lists/grids fill the width; narrow pages (Me, Login, Register) are a centered column (`mx-auto max-w-…`)
- Sticky navbar; below `md` the links collapse into a menu button

### Tables
The 4 tables (`PlayersTable`, `LeaderboardTable`, `MatchesTable`, `GiftcardsTable`) each write the same classes inline — same look, no shared file: rounded bordered box, grey header row, `divide-y` rows, hover, whole row clickable.

---

## Components (`src/components/`)

| Group | Files |
|---|---|
| UI building blocks | `Button` (solid / secondary / danger / danger-ghost, sm / md / lg, `icon`, `loading`), `InputField` (label + optional `icon`), `SelectField`, `Card` (optional `title` + `icon`), `PageHeader`, `Tabs`, `Pagination`, `StatusPill`, `Avatar` (initials, `square` for teams), `EmptyState`, `Loader`, `ErrorMessage` (optional `onRetry`), `BackLink`, `ThemeToggle`, `Navbar` |
| Route guards | `RequireAuth`, `RequireAdmin` |
| Lists | `PlayersTable`, `LeaderboardTable`, `MatchesTable` (`showRound` prop), `GiftcardsTable`, `TeamsGrid`, `TournamentsGrid` |
| Modals | `AddGoalModal` (pick the scorer), `CreateTeamModal`, `CreateMatchModal`, `CreateTournamentModal`, `CreateGiftcardModal`, `AssignGiftcardModal`, `FinishMatchModal`, `QuitTeamConfirm` |
| Action | `JoinTeamButton` (hides itself unless: logged in, no team, team open) |

---

## Pages / routes

| Route | Access | Notes |
|---|---|---|
| `/` | public | Hero only — Sign in / Create account (or "Go to dashboard") |
| `/login`, `/register` | public | Form inside the page; success → `/me` |
| `/me` | auth | Profile card + your team (quit, with confirm) or create/browse |
| `/players` | auth | Paginated table (no detail page) |
| `/leaderboard` | auth | Paginated, rank continues across pages |
| `/teams`, `/teams/:id` | auth | Tabs All/Open/Full + pagination. Detail: leader, members, trophies, gift cards, `JoinTeamButton` |
| `/matches`, `/matches/:id` | auth | Scoreline table. Detail: scoreboard + admin Start / +Goal (pick scorer → +1 player score) / Finish |
| `/tournaments`, `/tournaments/:id` | auth | Cards with prize. Detail: prize, matches (with Round), teams, admin close (no confirm) |
| `/giftcards` | admin | Table + create; "Assign" button per unassigned row (no detail page) |
| `*` | public | "Page not found" `EmptyState` in `App.jsx` |

---

## Backend contract summary (read `backend_API.md` for full)

- All responses: `{ success, status, message, data? }` — the axios interceptor already unwraps `.data`
- Paginated endpoints: `?page=N` → `{items, page, limit, total, pages}` (fixed limit 10)
- Auth: `Authorization: Bearer <token>` — auto-attached; 401 clears the token
- Enums: Team `open | full` · Match `scheduled | live | completed` · Tournament `progress | complete` · GiftCard `unassigned | assigned` · Player role `player | admin`
- Match: `teams: [{ teamId, goals }]` (array of 2), plus `round`, `winnerId`, `tournoiId`, `nextMatchId`
- A team is `full` at **11** players (`TEAM_MAX_PLAYERS` in `config.js`)
- Tournament creation: `teamIds.length` must be a power of 2 (frontend checks it)

### Response shapes that matter (easy to get wrong)
- `GET /tournois/:id/profile` → `{ tournoi, matches }` — tournament fields are under `tournoi`
- `GET /matchs/:id/profile` → populated `winnerId`, `tournoiId`, `nextMatchId` (not `winner` / `tournoi` / `nextMatch`)
- `GET /teams/:id/profile` → `trophies` is an array of **strings** (tournament names)
- `GET /players` → `teamId` is populated `{ _id, name }` (never render it directly)
- `GET /matchs` (list) → `teams[].teamId` is a **plain id** (not populated) → table shows `#abc123`. Fix would be backend-side: `.populate('teams.teamId', 'name')` in `match.service.js`
- Tournament matches of later rounds have `teamId: null` until decided → shown as "TBD"

---

## Dev
```bash
npm run dev      # Vite on :5173, proxies /api → :3000
npm run build
npm run lint     # 3 known errors in AuthContext.jsx / useFetch.js (setState in effect, fast-refresh export) — pre-existing, harmless
```

`.env` has `VITE_API_URL=http://localhost:3000/api` (proxy also handles it in dev).

---

## Things to preserve

- Simple code first: one idea per file, page-only markup stays in the page
- `useFetch` / `useAuth` patterns
- Full-width `<main>`, centered narrow pages
- Class-based dark mode with brand + accent tokens (amber only for prizes/trophies)
- Function declaration + bottom export style
- No shared Modal primitive (user rejected it)
- Admin-only UI wrapped in `{user?.role === 'admin' && …}`
