import { useState, useEffect } from 'react';
import { login, isAuthenticated, refreshSession } from '@/services/auth';

interface Props {
  onSuccess: () => void;
}

export default function LoginPage({ onSuccess }: Props) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      refreshSession();
      onSuccess();
    }
  }, [onSuccess]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const ok = login(username, password, remember);
    setLoading(false);
    if (ok) {
      onSuccess();
    } else {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 p-8">
        <h1 className="text-2xl font-bold text-sf-blue mb-1">Integration Architect Trainer</h1>
        <p className="text-sm text-slate-500 mb-8">Вход для доступа к тренажёру</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-1">Логин</label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sf-blue"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">Пароль</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sf-blue"
              required
            />
          </div>

          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="rounded border-slate-300"
            />
            Запомнить на этом устройстве (30 дней)
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-sf-blue text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Вход…' : 'Войти'}
          </button>
        </form>

        <p className="text-xs text-slate-400 mt-6 text-center">
          Без сервера · сессия в браузере
        </p>
      </div>
    </div>
  );
}
