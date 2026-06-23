import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default function TheoryArticlePage() {
  const { slug } = useParams();
  const [md, setMd] = useState('');
  const [sectionId, setSectionId] = useState('');

  useEffect(() => {
    if (!slug) return;
    fetch(`/data/theory/${slug}.md`).then((r) => r.text()).then(setMd);
    fetch('/data/exam-blueprint.json')
      .then((r) => r.json())
      .then((d) => {
        const sec = d.sections.find((s: { theorySlug: string }) => s.theorySlug === slug);
        if (sec) setSectionId(sec.id);
      });
  }, [slug]);

  return (
    <div className="space-y-6">
      <Link to="/theory" className="text-sm text-sf-blue">← Теория</Link>
      <article className="prose-theory bg-white dark:bg-slate-900 rounded-xl p-8 shadow">
        <ReactMarkdown>{md}</ReactMarkdown>
      </article>
      {sectionId && (
        <Link to={`/quiz/1/section`} className="inline-block px-6 py-3 bg-sf-blue text-white rounded-lg font-medium">
          Практиковать тему (Set 1)
        </Link>
      )}
    </div>
  );
}
