import { useEffect, useState } from 'react';
import type { GlossaryEntry } from '@/types';

export default function GlossaryPage() {
  const [entries, setEntries] = useState<GlossaryEntry[]>([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    fetch('/data/glossary.json').then((r) => r.json()).then((d) => setEntries(d.entries));
  }, []);

  const filtered = entries.filter(
    (e) => !q || e.term.toLowerCase().includes(q.toLowerCase()) || e.definition.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Глоссарий</h1>
      <input
        type="search"
        placeholder="Поиск термина…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="w-full p-3 border rounded-lg dark:bg-slate-900 dark:border-slate-700"
      />
      <div className="space-y-3">
        {filtered.map((e) => (
          <div key={e.term} className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">
            <p className="font-bold text-sf-blue">{e.term}</p>
            {e.termRu !== e.term && <p className="text-xs text-slate-500">{e.termRu}</p>}
            <p className="text-sm mt-2">{e.definition}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
