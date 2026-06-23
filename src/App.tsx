import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppStore } from '@/stores/appStore';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import SetsPage from '@/pages/SetsPage';
import QuizPage from '@/pages/QuizPage';
import TheoryPage from '@/pages/TheoryPage';
import TheoryArticlePage from '@/pages/TheoryArticlePage';
import GlossaryPage from '@/pages/GlossaryPage';
import StatsPage from '@/pages/StatsPage';
import BlueprintPage from '@/pages/BlueprintPage';
import SettingsPage from '@/pages/SettingsPage';
import SearchPage from '@/pages/SearchPage';
import HistoryPage from '@/pages/HistoryPage';

export default function App() {
  const init = useAppStore((s) => s.init);
  useEffect(() => { init(); }, [init]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sets" element={<SetsPage />} />
        <Route path="/quiz/:setId/:mode" element={<QuizPage />} />
        <Route path="/theory" element={<TheoryPage />} />
        <Route path="/theory/:slug" element={<TheoryArticlePage />} />
        <Route path="/glossary" element={<GlossaryPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/blueprint" element={<BlueprintPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </Layout>
  );
}
