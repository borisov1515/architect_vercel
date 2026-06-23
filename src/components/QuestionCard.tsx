import type { Question } from '@/types';

export function QuestionCard({ question, index, total }: { question: Question; index: number; total: number }) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-bold uppercase tracking-wide text-sf-blue">
        Вопрос {index + 1} из {total} · Set {question.setId} · #{question.setQuestionNumber}
      </p>
      {question.paragraphs.map((p, i) => (
        <p key={i} className="text-slate-700 dark:text-slate-300 leading-relaxed">{p}</p>
      ))}
      {question.context && (
        <div className="bg-blue-50 dark:bg-slate-800 rounded-lg p-4 text-sm">
          {question.context.type === 'ol' ? (
            <ol className="list-decimal ml-5 space-y-1">{question.context.items.map((it, i) => <li key={i}>{it}</li>)}</ol>
          ) : (
            <ul className="list-disc ml-5 space-y-1">{question.context.items.map((it, i) => <li key={i}>{it}</li>)}</ul>
          )}
        </div>
      )}
      {question.diagramNote && (
        <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-400 p-3 text-sm italic rounded">
          📊 {question.diagramNote}
        </div>
      )}
      {question.sub && <p className="font-semibold text-slate-900 dark:text-white">{question.sub}</p>}
    </div>
  );
}

export function ExplanationPanel({ question }: { question: Question }) {
  const ex = question.explanation;
  const hasContent = ex.correct || ex.summary;
  if (!hasContent) {
    return (
      <div className="mt-6 p-4 rounded-lg border border-dashed border-slate-300 dark:border-slate-600 text-slate-500 text-sm">
        Объяснение пока не заполнено (status: {ex.status}). Правильный ответ будет добавлен позже.
      </div>
    );
  }
  return (
    <div className="mt-6 space-y-4">
      {ex.summary && <p className="font-medium text-green-700 dark:text-green-400">{ex.summary}</p>}
      {ex.correct && (
        <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
          <p className="text-sm font-semibold text-green-800 dark:text-green-300 mb-1">Почему верно</p>
          <p className="text-sm">{ex.correct}</p>
        </div>
      )}
      {Object.entries(ex.incorrect).map(([k, v]) => v && (
        <div key={k} className="p-3 bg-red-50/50 dark:bg-red-950/20 rounded border border-red-100 dark:border-red-900 text-sm">
          <span className="font-semibold text-red-700 dark:text-red-400">{k}:</span> {v}
        </div>
      ))}
      {ex.examTip && <blockquote className="text-sm border-l-4 border-amber-400 pl-3 italic">{ex.examTip}</blockquote>}
    </div>
  );
}
