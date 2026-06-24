# Trailmix: Integration Architect — офлайн-материалы

Источник: [Prepare for your Platform Integration Architect Certification](https://trailhead.salesforce.com/users/strailhead/trailmixes/architect-integration-architecture)

## Честный ответ: всё одной кнопкой — нельзя

| Тип контента | Автоматически? | Как сохранить |
|--------------|----------------|---------------|
| **Help / Developer docs** | ✅ частично | `npm run fetch:trailmix` |
| **Trailhead модули (текст)** | ❌ нужен логин | **Trailhead GO** (официально) или **SingleFile** |
| **Hands-on challenges** | ❌ | Только на desktop Trailhead в org |
| **Видео в units** | ❌ bulk | Trailhead GO или вручную |

У Salesforce **нет публичного API** для выгрузки всего trailmix.

---

## Что уже сделано в проекте

1. **`trailmix-manifest.json`** — полный каталог ссылок по секциям экзамена (8% / 11% / 22% / …)
2. **`fetch-public-docs.mjs`** — качает публичные help.salesforce.com и developer.salesforce.com в `downloaded/`

```bash
cd result
npm run fetch:trailmix
```

---

## SingleFile — быстрый workflow (Trailhead)

1. Установи [SingleFile](https://github.com/gildas-lormeau/SingleFile) в Chrome
2. Залогинься на [Trailhead](https://trailhead.salesforce.com)
3. Открой модуль из `trailmix-manifest.json` → каждый **unit** → SingleFile → Save
4. Сохраняй в `materials/trailmix/singlefile/` с именем вида:
   `change-data-capture__unit-01-what-is-cdc.html`

**Совет:** начни с приоритетных модулей из manifest:
- Change Data Capture Basics
- Application Integration Patterns
- Apex Integration Services
- Platform Events Basics
- API Planning Framework

---

## Trailhead GO (официально)

На странице trailmix есть **Download Trailhead GO** — мобильное приложение с **офлайн-модулями** (без hands-on). Удобно для теории в дороге.

---

## Интеграция в тренажёр (опционально)

Можно добавить страницу `/trailmix` в приложение со ссылками из manifest — скажи, если нужно.
