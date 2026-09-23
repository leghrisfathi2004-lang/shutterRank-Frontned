# ShutterRank — Components

## Tech choices
- **Styling**: Tailwind CSS (single stylesheet, utility classes → fewer files)
- **Theme**: light + dark (Tailwind `class` strategy)
- **Vibe**: gaming / football — brand green + electric accent (final palette lives in `tailwind.config.js`)
- **Add-new flows**: always via `Modal`
- **Admin lists**: polished `Table` with sort + filter + actions column
- **Card content**: only what the backend already returns (no invented metadata)

Legend: ✅ built · 🔧 to build · 🎯 page-specific (not in `src/components/`)

---

## Shared components (`src/components/`)

### UI primitives
| Component | Notes |
|---|---|
| `Button` 🔧 | variants: solid / ghost / danger · `loading` prop |
| `FormField` ✅ | label + input, controlled |
| `Card` 🔧 | generic bordered box (light + dark) |
| `Modal` 🔧 | portal-based, backdrop, close on `Esc` |
| `ConfirmDialog` 🔧 | thin wrapper on `Modal` — confirm / cancel |
| `Table` 🔧 | sortable columns, filter row, actions cell |
| `Tabs` 🔧 | Teams `All/Open/Full`, Admin sub-nav |
| `Pagination` 🔧 | every ⚡ endpoint |
| `StatusPill` 🔧 | team `open/full`, match `scheduled/live/completed`, tournament `progress/complete` |
| `Avatar` 🔧 | initials circle |
| `EmptyState` 🔧 | every empty list |
| `Loader` ✅ | loading text/spinner |
| `ErrorMessage` ✅ | red inline message |
| `PageHeader` 🔧 | `<h1>` + subtitle |
| `ThemeToggle` 🔧 | light/dark switch in Navbar |
| `BackLink` ✅ | "← back" |

### Layout / auth
| Component | Notes |
|---|---|
| `Navbar` 🔧 | extract from `App.jsx` · auth-aware links · `ThemeToggle` |
| `Footer` 🔧 | tiny |
| `RequireAuth` 🔧 | route guard → `/login` |
| `RequireAdmin` 🔧 | role guard → `/` |

### Domain rows / cards
| Component | Notes |
|---|---|
| `PlayerListItem` ✅ | Players list, Leaderboard, Team members, Dashboard |
| `TeamCard` 🔧 | Teams list, Tournament detail, Dashboard |
| `MatchRow` 🔧 | Matches list, Team profile, Tournament bracket |
| `TournamentCard` 🔧 | Tournaments list, Home preview |
| `GiftCardItem` 🔧 | Team profile (masked) + Admin (with code), prop-driven |

---

## Page-specific components 🎯 (inside their page folder)

| Page | Components |
|---|---|
| Tournament detail | `Bracket`, `PrizeCard`, `RegisteredTeamsList` |
| Match detail | `Scoreboard`, `MatchTimeline`, `NextMatchLink` |
| Team profile | `TrophyShelf`, `MembersList`, `JoinTeamButton` |
| Dashboard `/me` | `MyTeamPanel`, `CreateTeamModal` |
| Admin `/admin` | `CreateMatchModal`, `CreateTournamentModal` (uses `TeamPicker` — enforces power-of-2), `CreateGiftCardModal`, `AssignGiftCardModal`, `LiveMatchControls`, `CloseTournamentButton` |

---

## Pages

| Route | Access |
|---|---|
| `/` Home | public |
| `/login`, `/register` | public |
| `/players`, `/players/:id`, `/leaderboard` | public |
| `/teams`, `/teams/:id` | public |
| `/matches`, `/matches/:id` | public |
| `/tournaments`, `/tournaments/:id` | public |
| `/me` | auth (`RequireAuth`) |
| `/admin` | admin (`RequireAdmin`) |

---

## Totals
- **~19 shared** + **~15 page-specific**
- 5 shared already built
- Heavy reuse via `Modal`, `Card`, `Table`, `Pagination`, `StatusPill`, `FormField`
