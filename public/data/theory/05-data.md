# Интеграция данных

## Sync vs Virtualization

| Подход | Когда |
|--------|-------|
| **ETL / sync** | Нужны отчёты в SF, данные в SF |
| **Salesforce Connect / OData** | Master вне SF, только чтение в UI |
| **External Services** | OpenAPI callout с минимумом кода |

## События

- **CDC** — изменения sObjects, replay, record access rules
- **Platform Events** — custom payload, after commit, limits на publish/delivery
- **PushTopic** — legacy, SOQL-based

## Идемпотентность

Payment / order processing: **process once**, middleware координирует, не дублировать updates.

## MDM

Несколько external ID → map к Salesforce ID в middleware или MDM hub.
