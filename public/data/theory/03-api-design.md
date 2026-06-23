# API и дизайн

## REST Composite

- **Composite** — граф связанных запросов
- **Composite Batch** — до 25 subrequests
- **sObject Tree** — до 200 записей с внешними ключами в одном вызове

## Лимиты

- Отслеживание: API Limits, Event Monitoring / API Event (user-initiated calls)
- Bulk для больших загрузок; parallel vs serial — trade-off CPU time vs concurrent batches

## WSDL

| WSDL | Назначение |
|------|------------|
| **Enterprise** | Один org, все метаданные |
| **Partner** | Логин, CRUD — multi-org friendly |
| **SOAP API** | Генерик API контракт |

## Контракты

RAML/OpenAPI для REST — **HttpCalloutMock** в тестах Apex REST clients.
