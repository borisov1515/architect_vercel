# Безопасность и идентификация

## Секреты в Salesforce

✅ **Named Credentials**, **Protected Custom Metadata**, **Protected Custom Settings**  
❌ Plain text в коде, unprotected custom fields

## OAuth / Connected App

- External client → Salesforce: Connected App + OAuth flows
- Package в другой org: **Auth Provider** + consumer key/secret central org

## Shield Platform Encryption

- Не замена authentication
- Перед внедрением: **review configurations**, влияние на интеграции и поиск

## Mutual TLS

Для portal integrations: **SSL/TLS Mutual Authentication** + CA-signed certificates.
