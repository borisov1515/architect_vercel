# Архитектура интеграции

## API-led connectivity (3 tier)

1. **System API** — доступ к системам-источникам
2. **Process API** — бизнес-логика, агрегация
3. **Experience API** — каналы (mobile, web, Salesforce)

## Когда middleware обязателен

- Оркестрация нескольких backend
- Очереди, retry, трансформация протоколов
- Снятие point-to-point зависимостей

## Монолит → микросервисы

Тесные P2P интеграции ломаются при росте. Решение: **разбить** integration layer на сервисы + шина/ESB.

## DMZ и API Gateway

Cloud → on-premise: middleware за **DMZ**, **API Gateway** для security и rate limiting.
