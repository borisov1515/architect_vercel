import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface ChildFile {
  name: string;
  path: string;
  kind: 'markdown' | 'html';
}

interface TrailmixItem {
  order: number;
  title: string;
  path: string;
  kind: 'folder' | 'markdown' | 'html';
  units?: number;
  steps?: number;
  children: ChildFile[];
}

interface TrailmixIndex {
  title: string;
  source: string;
  summary: { trailheadModulesDone: number; totalManifestItems: number };
  items: TrailmixItem[];
}

export default function TrailmixPage() {
  const [data, setData] = useState<TrailmixIndex | null>(null);

  useEffect(() => {
    fetch('/data/trailmix-index.json')
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null));
  }, []);

  if (!data) {
    return <p className="text-slate-500">Загрузка trailmix…</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Trailmix — полный офлайн-курс</h1>
        <p className="text-sm text-slate-500 mt-2">
          {data.items.length} материалов · модули Trailhead, help, developer docs
        </p>
        <a href={data.source} target="_blank" rel="noreferrer" className="text-xs text-sf-blue underline">
          Оригинал на Trailhead
        </a>
      </div>

      <div className="space-y-4">
        {data.items.map((item) => (
          <section
            key={item.order}
            className="bg-white dark:bg-slate-900 rounded-xl shadow border border-slate-100 dark:border-slate-800 overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-slate-400">#{String(item.order).padStart(2, '0')}</span>
              <h2 className="font-semibold text-sf-blue flex-1">{item.title}</h2>
              {item.units != null && (
                <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">{item.units} units</span>
              )}
              {item.steps != null && (
                <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">{item.steps} steps</span>
              )}
            </div>

            {item.kind === 'folder' && item.children.length > 0 ? (
              <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                {item.children.map((child) => (
                  <li key={child.path}>
                    <Link
                      to={`/trailmix/read/${encodeURIComponent(child.path)}`}
                      className="block px-5 py-3 text-sm hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                    >
                      {child.name.replace(/\.(md|html)$/i, '').replace(/-/g, ' ')}
                      <span className="ml-2 text-xs text-slate-400">{child.kind === 'html' ? 'HTML' : 'MD'}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-5 py-3">
                <Link
                  to={`/trailmix/read/${encodeURIComponent(item.path)}`}
                  className="text-sm text-sf-blue underline"
                >
                  Открыть материал →
                </Link>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
