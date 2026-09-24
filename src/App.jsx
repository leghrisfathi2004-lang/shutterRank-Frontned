import { Routes, Route, Outlet, Link } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import RequireAuth from './components/RequireAuth.jsx';
import RequireAdmin from './components/RequireAdmin.jsx';
import Home from './pages/Home.jsx';
import Players from './pages/Players.jsx';
import PlayerDetail from './pages/PlayerDetail.jsx';
import Leaderboard from './pages/Leaderboard.jsx';
import Teams from './pages/Teams.jsx';
import TeamDetail from './pages/TeamDetail.jsx';
import Matches from './pages/Matches.jsx';
import MatchDetail from './pages/MatchDetail.jsx';
import Tournaments from './pages/Tournaments.jsx';
import TournamentDetail from './pages/TournamentDetail.jsx';
import Giftcards from './pages/Giftcards.jsx';
import GiftcardDetail from './pages/GiftcardDetail.jsx';
import Me from './pages/Me.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import EmptyState from './components/EmptyState.jsx'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="w-full px-4 py-8 md:px-8">
        <Routes>
          {/* public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* everything below needs a logged-in user */}
          <Route
            element={
              <RequireAuth>
                <Outlet />
              </RequireAuth>
            }
          >
            <Route path="/me" element={<Me />} />
            <Route path="/players" element={<Players />} />
            <Route path="/players/:id" element={<PlayerDetail />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/teams/:id" element={<TeamDetail />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/matches/:id" element={<MatchDetail />} />
            <Route path="/tournaments" element={<Tournaments />} />
            <Route path="/tournaments/:id" element={<TournamentDetail />} />

            {/* admin only */}
            <Route
              element={
                <RequireAdmin>
                  <Outlet />
                </RequireAdmin>
              }
            >
              <Route path="/giftcards" element={<Giftcards />} />
              <Route path="/giftcards/:id" element={<GiftcardDetail />} />
            </Route>
          </Route>

          <Route path="*"
            element={
              <EmptyState title={"error!"} text={"page not found!"}  action={
                <Link to="/" className="font-medium text-neutral-900 hover:underline dark:text-neutral-100">
                  Go home
                </Link>}/> }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
