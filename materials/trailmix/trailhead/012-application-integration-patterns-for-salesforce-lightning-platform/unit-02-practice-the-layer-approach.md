# Practice the Layer Approach

**Source:** https://trailhead.salesforce.com/content/learn/modules/app-integration-patterns/app-integration-patterns-2  
**Saved:** browser extraction (logged-in session)

---

## Four Dimensions

1. **Layers** — UI, business process, data
2. **Volume** — data amount, message size, governor limits
3. **Timing** — synchronous vs asynchronous (batch)
4. **Direction** — Salesforce → system, system → Salesforce, bidirectional

## Layer Mapping

| Pattern | Layer |
|---------|-------|
| Remote Process Invocation (Request/Reply, Fire and Forget) | Business logic |
| Remote Call-In | Business logic |
| Data Virtualization, Batch Sync | Data |
| High-Frequency Replication | Data and UI |
| Publish/Subscribe | Data and business logic |

**UI layer:** Canvas, mashups, Lightning Out  
**Business layer:** MuleSoft, platform events, flows, outbound messaging  
**Data layer:** Heroku Connect, Salesforce Connect, Apex, REST/SOAP, Composite API, Bulk API
