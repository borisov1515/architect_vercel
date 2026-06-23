# Integration Architect Trainer

Локальная веб-платформа для подготовки к **Salesforce Certified Integration Architect**.

- 4 отдельных сета (Set 1–4), по 65 вопросов
- 30 режимов и фич (quiz, exam, SRS, теория, статистика…)
- Без внешней БД — прогресс в `localStorage`
- Деплой на **Vercel**

## Быстрый старт

```bash
cd result
npm install
npm run import:sets   # импорт из ../Platform Integration Architect/Latest Exam/
npm run dev           # http://localhost:5173
npm run build
```

## Авторизация

Простой вход без сервера (логин/пароль в `src/services/auth.ts`):

| | |
|---|---|
| Логин | `admin` |
| Пароль | `architect2026` |

«Запомнить» → `localStorage` на 30 дней. Без галочки → `sessionStorage` на 12 часов.

> Пароль виден в исходниках JS — подходит для личного use, не для публичной защиты данных.

## Vercel

1. Push в GitHub
2. [vercel.com](https://vercel.com) → Import Project
3. **Root Directory:** `result`
4. **Build Command:** `npm run build`
5. **Output Directory:** `dist`
6. Перед build добавь в настройках или в `package.json` prebuild: `npm run import:sets` (если JSON не в репо)

## Структура

| Путь | Описание |
|------|----------|
| `public/data/questions-set*.json` | Вопросы по сетам |
| `public/data/theory/` | Markdown теория |
| `public/data/glossary.json` | Глоссарий |
| `scripts/import-sets.mjs` | Парсер HTML → JSON |
| `src/` | React приложение |

## Объяснения

Поле `explanation` в JSON — заполняется по ходу (AI + ручная правка). Пока пусто — UI показывает заглушку.

## Исходники вопросов

`../Platform Integration Architect/Latest Exam/Set-1..4/` — не изменяются.
