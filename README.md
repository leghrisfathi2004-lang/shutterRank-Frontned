# ShutterRank — Frontend

Web app to manage a small competition: players join teams, teams play matches, and matches build knockout tournaments with a gift-card prize.
Built with React for a school project. It talks to the ShutterRank backend (REST API + JWT).

## Stack
- **React 19** + **Vite**
- **React Router 7**: pages and login protection
- **Tailwind CSS v4**: styling, light / dark mode
- **axios**: API calls, the token is sent automatically
- **lucide-react**: icons

## Getting started
1. Start the backend on `http://localhost:3000`.
2. Create `.env` in this folder:
   ```
   VITE_API_URL=http://localhost:3000/api
   ```
3. Install and run:
   ```bash
   npm install
   npm run dev      # → http://localhost:5173
   ```

Other scripts: `npm run build` (production build), `npm run lint`.

## How to use
- **Visitor**: the home page offers *Sign in* / *Create an account*. Every other page needs an account.
- **Player**:
  - **Dashboard** (`/me`): create a team, or join an open one from **Teams**. You can also quit your team.
  - Browse **Players**, **Leaderboard**, **Matches** and **Tournaments**.
- **Admin**, in addition:
  - **Matches**: create a match, start it, add goals (choose the scorer, who gets +1 score), finish it and pick the winner.
  - **Tournaments**: create one with a gift-card prize and 2, 4, 8… teams. The bracket is generated automatically.
  - **Gift cards**: add cards and assign them to a winning team.

## Structure
```
src/
├── api/          # one file per resource: the functions that call the backend
├── Context/      # AuthContext: the logged-in user, shared by every page
├── hooks/        # useFetch: loads data and gives { data, error, loading, refetch }
├── lib/          # token.js: saves the JWT in localStorage
├── components/   # reusable UI (Button, Card, …), tables, grids and modals
├── pages/        # one file per route (Home, Teams, MatchDetail, …)
├── App.jsx       # the routes; RequireAuth / RequireAdmin protect them
└── index.css     # Tailwind + theme colors
```

Every page follows the same pattern: fetch with `useFetch`, then show a loader, an error, or the content.
