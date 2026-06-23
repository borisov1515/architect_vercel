import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Fuse from 'fuse.js';
import type { Question } from '@/types';
import { loadQuestionSet } from '@/services/questions';

export default function SearchPage() {
  const [all, setAll] = useState<Question[]>([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    Promise.all([1, 2, 3, 4].map((id) => loadQuestionSet(id))).then((files) => {
      setAll(files.flatMap((f) => f.questions));
    });
  }, []);

  const fuse = useMemo(
    () =>
      new Fuse(all, {
        keys: ['paragraphs', 'sub', 'options.text', 'tags', 'sectionId'],
        threshold: 0.4,
      }),
    [all],
  );

  const results = q.length >= 2 ? fuse.search(q).slice(0, 30) : [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Поиск вопросов</h1>
      <input
        type="search"
        placeholder="Platform Events, ESB, NTO…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="w-full p-3 border rounded-lg dark:bg-slate-900 dark:border-slate-700"
        autoFocus
      />
      <ul className="space-y-2">
        {results.map(({ item }) => (
          <li key={item.id}>
            <Link
              to={`/quiz/${item.setId}/study`}
              className="block p-4 bg-white dark:bg-slate-900 rounded-lg border hover:border-sf-blue text-sm"
            >
              <span className="text-xs text-sf-blue font-bold">Set {item.setId} · Q{item.setQuestionNumber}</span>
              <p className="mt-1 line-clamp-2">{item.sub || item.paragraphs[0]}</p>
            </Link>
          </li>
        ))}
      </ul>
      {q.length >= 2 && !results.length && <p className="text-slate-500">Ничего не найдено</p>}
    </div>
  );
}
