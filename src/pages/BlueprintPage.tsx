import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Section {
  id: string;
  titleRu: string;
  weightPercent: number;
  descriptionRu: string;
  theorySlug: string;
}

export default function BlueprintPage() {
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    fetch('/data/exam-blueprint.json').then((r) => r.json()).then((d) => setSections(d.sections));
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Exam Blueprint</h1>
      <p className="text-slate-600 dark:text-slate-400">Официальная структура экзамена Integration Architect — куда вкладывать время.</p>

      <div className="flex flex-wrap gap-2 h-8 rounded-full overflow-hidden">
        {sections.map((s) => (
          <div
            key={s.id}
            className="bg-sf-blue flex items-center justify-center text-white text-xs font-medium"
            style={{ width: `${s.weightPercent}%` }}
            title={`${s.titleRu} ${s.weightPercent}%`}
          >
            {s.weightPercent}%
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {sections.map((s) => (
          <div key={s.id} className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h2 className="font-bold text-lg">{s.titleRu}</h2>
                <p className="text-sm text-slate-500 mt-1">{s.descriptionRu}</p>
              </div>
              <span className="text-2xl font-bold text-sf-blue shrink-0">{s.weightPercent}%</span>
            </div>
            <div className="flex gap-3 mt-4">
              <Link to={`/theory/${s.theorySlug}`} className="text-sm text-sf-blue underline">Теория</Link>
              <Link to={`/quiz/1/section`} className="text-sm text-sf-blue underline">Практика (Set 1)</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
