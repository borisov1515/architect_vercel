# Evaluate an Integration Pattern

**Source:** https://trailhead.salesforce.com/content/learn/modules/app-integration-patterns/app-integration-patterns-3  
**Saved:** browser extraction (logged-in session)

---

## Remote Process Invocation — Request and Reply

- **Layer:** Business Logic | **Timing:** Synchronous | **Direction:** Salesforce → System | **Volume:** Small transactions

UI-triggered (LWC, Flow, Visualforce+Apex) → Apex callout → external system reply → Salesforce updates UI/data.

**Best solution for UI-driven scenarios:** LWC / Flow / Visualforce with Apex controllers (not triggers — async; not batch — limits).

## Idempotent Design

- Add unique message ID to requests
- Check for duplicate records before insert
- Prevents duplicate processing from repeated button clicks

See Integration Patterns Overview for all patterns.
