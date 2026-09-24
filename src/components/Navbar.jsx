import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  BarChart3,
  ChevronDown,
  Gift,
  LogOut,
  Menu,
  Shield,
  Swords,
  Trophy,
  User,
  Users,
  X,
} from 'lucide-react';
import { useAuth } from '../Context/AuthContext.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import Avatar from './Avatar.jsx';

const PUBLIC_LINKS = [
  { to: '/players', label: 'Players', icon: Users },
  { to: '/leaderboard', label: 'Leaderboard', icon: BarChart3 },
  { to: '/teams', label: 'Teams', icon: Shield },
  { to: '/matches', label: 'Matches', icon: Swords },
  { to: '/tournaments', label: 'Tournaments', icon: Trophy },
];

const ADMIN_LINKS = [{ to: '/giftcards', label: 'Gift cards', icon: Gift }];

function desktopLinkClass({ isActive }) {
  return `inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100'
      : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
  }`;
}

function mobileLinkClass({ isActive }) {
  return `flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100'
      : 'text-neutral-600 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:bg-neutral-900'
  }`;
}

function Navbar() {
  const { user, loading, logout } = useAuth();
  const { pathname } = useLocation();

  // menus remember the path they were opened on → navigating closes them without an effect
  const [menuPath, setMenuPath] = useState(null);
  const [userMenuPath, setUserMenuPath] = useState(null);
  const menuOpen = menuPath === pathname;
  const userMenuOpen = userMenuPath === pathname;

  const userMenuRef = useRef(null);

  useEffect(() => {
    if (!userMenuOpen) return;
    const onClick = (e) => {
      if (!userMenuRef.current?.contains(e.target)) setUserMenuPath(null);
    };
    const onKey = (e) => e.key === 'Escape' && setUserMenuPath(null);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [userMenuOpen]);

  // pages need login → logged-out visitors get no links, only "Sign in"
  let links = [];
  if (user) links = user.role === 'admin' ? [...PUBLIC_LINKS, ...ADMIN_LINKS] : PUBLIC_LINKS;

  const handleLogout = () => {
    setUserMenuPath(null);
    setMenuPath(null);
    logout();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/80 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80">
      <nav className="flex h-14 w-full items-center gap-2 px-4 md:px-8">
        <Link to="/" className="mr-4 flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600 text-white dark:bg-brand-500">
            <Trophy size={15} aria-hidden />
          </span>
          ShutterRank
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={desktopLinkClass}>
              <Icon size={16} aria-hidden />
              {label}
            </NavLink>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-1">
          <ThemeToggle />

          {loading ? (
            <span className="h-8 w-8 animate-shimmer rounded-full bg-neutral-200 dark:bg-neutral-800" />
          ) : user ? (
            <div ref={userMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setUserMenuPath(userMenuOpen ? null : pathname)}
                aria-haspopup="menu"
                aria-expanded={userMenuOpen}
                className="flex h-9 items-center gap-2 rounded-lg pl-1 pr-2 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <Avatar name={user.name} size="xs" />
                <span className="hidden max-w-32 truncate text-sm font-medium sm:inline">
                  {user.name}
                </span>
                <ChevronDown size={14} aria-hidden className="text-neutral-400" />
              </button>

              {userMenuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-56 origin-top-right animate-scale-in rounded-pop border border-neutral-200 bg-white p-1 shadow-pop dark:border-neutral-800 dark:bg-neutral-900"
                >
                  <div className="px-3 py-2">
                    <p className="truncate text-sm font-medium">{user.name}</p>
                    <p className="truncate text-xs text-neutral-500">{user.email}</p>
                  </div>
                  <div className="my-1 h-px bg-neutral-100 dark:bg-neutral-800" />
                  <Link
                    to="/me"
                    role="menuitem"
                    className="flex h-9 items-center gap-2 rounded-md px-3 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <User size={16} aria-hidden className="text-neutral-400" />
                    My dashboard
                  </Link>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleLogout}
                    className="flex h-9 w-full items-center gap-2 rounded-md px-3 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                  >
                    <LogOut size={16} aria-hidden />
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex h-9 items-center rounded-lg bg-brand-600 px-4 text-sm font-medium text-white shadow-card transition-colors hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600"
            >
              Sign in
            </Link>
          )}

          {user && (
            <button
              type="button"
              onClick={() => setMenuPath(menuOpen ? null : pathname)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100 md:hidden dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
              {menuOpen ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
            </button>
          )}
        </div>
      </nav>

      {menuOpen && (
        <div className="animate-fade-in border-t border-neutral-200 px-4 py-3 md:hidden dark:border-neutral-800">
          <div className="flex flex-col gap-1">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} className={mobileLinkClass}>
                <Icon size={18} aria-hidden />
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
