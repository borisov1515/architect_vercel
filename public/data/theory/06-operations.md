# Тестирование и эксплуатация

## Мониторинг Salesforce

- **Критические бизнес-процессы** + benchmarks — не только API limits
- API Limits — часть картины, не единственный KPI degradation

## Batch resilience

- **BatchApexErrorEvent** для retry/monitoring
- Меньший batch size → больше времени, риск "too many concurrent batches"

## Bulk API monitoring

- **getBatchInfo** из клиента (Java)
- Custom logging object + reports

## Error handling в UI

- Mock service — только для dev/test, не production fallback
- Retry в middleware при transient failures
