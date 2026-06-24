# Change Data Capture Characteristics

**Module:** Change Data Capture Basics  
**Source:** https://trailhead.salesforce.com/content/learn/modules/change-data-capture/learn-change-data-capture-characteristics  
**Saved:** browser extraction (logged-in session)

---

Learning Objectives

After completing this unit, you'll be able to:

Find out what objects are available for Change Data Capture.

List the fields that are returned in the change event header and describe which fields are included in the body for each operation.

Build a change event channel name.

List the permissions needed for subscribing to change events.

Object Support

Change Data Capture can generate change events for all custom objects defined in your Salesforce org and a subset of standard objects. It supports change events for the most popular standard objects including Account, Contact, Lead, User, Order, OrderItem, Product2, and others. For a list of objects that support change events, see StandardObjectNameChangeEvent in the Object Reference for Salesforce and Lightning Platform.

To receive notifications for record changes, select the custom objects and supported standard objects that you are interested in from the Change Data Capture page in Setup. We go over the steps for selecting objects later in this module.

A Change Event Example

Remember Robert? His consulting client has defined a custom object called Employee__c that is part of a custom HR app that manages employee data. To synchronize employee data in Salesforce to the external HR system, Robert created an app that receives and integrates change events of new and changed employee records.

Let's look at an example of an event message that his app receives using Pub/Sub API. It contains the data for a new employee record that a user created in Salesforce. The change event payload contains header fields in ChangeEventHeader that contain information about the change, record fields, and system fields. This change event example message contains the employee's first name, last name, and tenure, in addition to system fields like CreatedDate. The Tenure field is null because it wasn't set. Change events received with Pub/Sub API contain all the record fields, including null fields. In ChangeEventHeader, the entityName field contains the name of the Salesforce object and the changeType field indicates that this change was a record creation.

The ChangeEventHeader field includes header fields that contain information about the change. A few header fields of note are listed below.

entityName - This field contains the name of the standard or custom object for this record change. In our example, it is Employee__c.

changeType - This field contains the operation that caused the change. For common change events, this field can have one of the following values: CREATE, UPDATE, DELETE, UNDELETE. In our example, the change event was for a record creation, so the value is CREATE.

changedFields - Use this field to find out which fields were changed in an update operation. This field is empty for other operations.

diffFields - Available in events received in Pub/Sub API and Apex triggers only. Contains the names of fields whose values are sent as a unified diff because they contain large text values.

nulledFields - Available in events received in Pub/Sub API and Apex triggers only. Contains the names of fields whose values were changed to null in an update operation.

changeOrigin - Use this field to find out what caused the change. If your integration app changes a record in response to a record change of the same object, you can get into an infinite cycle of changes.

Transaction-Related Header Fields

transactionKey and sequenceNumber - Use the transaction fields to maintain an accurate replica of your org's data in another system.

Fields Included in the Body of an Event Message

The fields that Salesforce includes in an event message that a client receives depend on the operation performed and the subscriber type.

Merged Change Events

For efficiency, sometimes change events for one transaction are merged into one event if the same change occurred in multiple records of the same object type during one second.

Enriching Change Events with Extra Fields

Select fields to enrich change events delivered to Pub/Sub API subscribers.

Other Types of Events: Gap Events and Overflow Events

Salesforce generates gap events when change events can't be generated or to inform subscribers about errors. Salesforce generates overflow events when the volume of changes is large.

Subscribing to an Event Channel

This module uses Pub/Sub API and Apex triggers to subscribe to change events. Salesforce offers multiple ways to subscribe to a change event channel.

Subscription Channels

A subscription channel is a stream of change events that correspond to one or more entities.

Standard Channels - The ChangeEvents standard channel contains change events from one or more selected entities in a single stream.

Single-Entity Channels - Subscribe to change events for a single standard or custom object.

Custom Channels - Create a custom channel if you have multiple subscribers and each subscriber receives change events from a different set of entities.

Permissions for Receiving Change Events

Change Data Capture ignores sharing settings and sends change events for all records of a Salesforce object.

Field-Level Security

Change Data Capture respects your org's field-level security settings. Delivered events contain only the fields that a subscribed user is allowed to view.

In the next unit, you learn how to use an open-source sample tool, EMP Connector, to subscribe to a channel and receive events.

Resources
Salesforce Developers: Change Data Capture Developer Guide
Salesforce Developers: Pub/Sub API Developer Guide
