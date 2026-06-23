# Шпаргалка: паттерны интеграции

| Сценарий | Рекомендуемый паттерн |
|----------|----------------------|
| UI ждёт ответ < 30 сек | Request and Reply / Continuation (долгий) |
| Уведомить систему, ответ не нужен | Fire and Forget |
| Внешняя система создаёт запись в SF | Remote Call-In (REST) |
| Показать данные из ERP без копии | Data Virtualization (Connect) |
| 2M records historical, view in SF | OData + Salesforce Connect |
| Real-time order to ERP, low code | Flow Fire-and-Forget / CDC + middleware |
| Agent needs generated ID from core banking | Request and Reply (sync) |
| Decouple 3 P2P integrations | ESB / microservices |

> **На экзамене:** читай *timing*, *volume*, *who is system of record*, *low code constraint*.
