import { Link, useLocation } from 'react-router-dom';
import { useAppStore } from '@/stores/appStore';
import { logout, getSession } from '@/services/auth';

const NAV = [
  { to: '/', label: 'Главная' },
  { to: '/sets', label: 'Сеты' },
  { to: '/theory', label: 'Теория' },
  { to: '/trailmix', label: 'Trailmix' },
  { to: '/glossary', label: 'Глоссарий' },
  { to: '/blueprint', label: 'Blueprint' },
  { to: '/stats', label: 'Статистика' },
  { to: '/search', label: 'Поиск' },
  { to: '/history', label: 'История' },
  { to: '/settings', label: 'Настройки' },
];

export default function Layout({ children, onLogout }: { children: React.ReactNode; onLogout: () => void }) {
  const location = useLocation();
  const toggleDark = useAppStore((s) => s.toggleDark);
  const streak = useAppStore((s) => s.progress.streak.current);
  const session = getSession();

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-gradient-to-r from-sf-blue to-sf-dark text-white shadow-lg">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3">
          <Link to="/" className="font-bold text-lg">Integration Architect Trainer</Link>
          <div className="flex items-center gap-3 text-sm">
            {session && <span className="opacity-80 text-xs">{session.username}</span>}
            {streak > 0 && <span title="Streak">🔥 {streak}</span>}
            <button type="button" onClick={toggleDark} className="px-2 py-1 rounded bg-white/20 hover:bg-white/30" title="Тёмная тема">☀/🌙</button>
            <button type="button" onClick={handleLogout} className="px-2 py-1 rounded bg-white/20 hover:bg-white/30 text-xs" title="Выйти">Выход</button>
          </div>
        </div>
        <nav className="max-w-5xl mx-auto px-4 pb-3 flex flex-wrap gap-2 text-sm">
          {NAV.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`px-3 py-1 rounded-full transition ${location.pathname === to || (to !== '/' && location.pathname.startsWith(to)) ? 'bg-white text-sf-blue font-semibold' : 'bg-white/15 hover:bg-white/25'}`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">{children}</main>
      <footer className="text-center text-slate-500 text-sm py-6">Salesforce Integration Architect — local trainer</footer>
    </div>
  );
}
