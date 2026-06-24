import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default function TrailmixReadPage() {
  const { '*': rawPath } = useParams();
  const filePath = rawPath ? decodeURIComponent(rawPath) : '';
  const isHtml = filePath.toLowerCase().endsWith('.html');
  const [md, setMd] = useState('');
  const [error, setError] = useState(false);

  const title = filePath.split('/').pop()?.replace(/\.(md|html)$/i, '').replace(/-/g, ' ') ?? 'Материал';
  const staticUrl = `/materials/trailmix/${filePath}`;

  useEffect(() => {
    if (!filePath || isHtml) return;
    setError(false);
    fetch(staticUrl)
      .then((r) => {
        if (!r.ok) throw new Error('not found');
        return r.text();
      })
      .then(setMd)
      .catch(() => setError(true));
  }, [filePath, isHtml, staticUrl]);

  return (
    <div className="space-y-4">
      <Link to="/trailmix" className="text-sm text-sf-blue">← Trailmix</Link>
      <h1 className="text-xl font-bold capitalize">{title}</h1>

      {isHtml ? (
        <iframe
          title={title}
          src={staticUrl}
          className="w-full min-h-[70vh] rounded-xl border border-slate-200 dark:border-slate-700 bg-white"
        />
      ) : error ? (
        <p className="text-red-500">Файл не найден: {filePath}</p>
      ) : md ? (
        <article className="prose-theory bg-white dark:bg-slate-900 rounded-xl p-6 md:p-8 shadow">
          <ReactMarkdown>{md}</ReactMarkdown>
        </article>
      ) : (
        <p className="text-slate-500">Загрузка…</p>
      )}
    </div>
  );
}
