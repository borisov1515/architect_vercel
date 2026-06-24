# Understanding Change Data Capture

**Module:** Change Data Capture Basics  
**Source:** https://trailhead.salesforce.com/content/learn/modules/change-data-capture/understand-change-data-capture  
**Saved:** browser extraction (logged-in session)

---

## Learning Objectives

After completing this unit, you'll be able to:

- Describe what change events are.
- Explain the benefits of streaming technology.
- Explain when to use change events.

## Before You Start This Module

We know you're eager to get started! But before you settle in to work through this module, you should be familiar with some concepts to be able to complete this module.

Because one of the ways to subscribe to Change Data Capture is with Apex triggers, you should have some basic understanding of the Apex classes and triggers and Apex tests.

If you haven't used Apex before and are new to object-oriented programming, check out the Build Apex Coding Skills trail. This trail lays out a series of modules that help you build your Apex knowledge step by step from the ground up.

If you're familiar with object-oriented programming and want to learn about Apex, check out these modules: Apex Basics & Database, Apex Testing, and Apex Triggers.

Also, a familiarity with platform events helps you understand Change Data Capture events, which are a special type of platform events. Although not required for completing this module, we recommend you take the Platform Events Basics module too.

## What Is Change Data Capture?

Change Data Capture is a streaming product on the Lightning Platform that enables you to efficiently integrate your Salesforce data with external systems. With Change Data Capture, you can receive changes of Salesforce records in real time and synchronize corresponding records in an external data store. Change Data Capture publishes events for changes in Salesforce records corresponding to create, update, delete, and undelete operations.

Use Change Data Capture to update data in an external system instead of doing periodic exports or API polling. Capturing changes with Change Data Capture event notifications ensures that your external data can be updated in real time and stays fresh.

You can think of Change Data Capture as part of the real-time data replication process for the cloud. Data replication includes the following stages.

1. Initial (day 0) copy of the entire data set to the external system
2. Continuous synchronization of new and updated data to the external system
3. Reconciliation of duplicate data between the two systems

Change Data Capture is the continuous synchronization part of replication (step 2). In other words, it publishes the deltas of Salesforce data, whether for new records or changed records. Change Data Capture requires an integration app for receiving events and performing updates in the external system.

## What Are Streaming Events and Why Use Them?

Streaming events are instant notification messages that one system (the publisher) sends to another (the subscriber). Using the publisher/subscriber model, Change Data Capture sends notifications to subscribers whenever a data change in Salesforce occurs. Notification messages are sent to the event bus to which clients can subscribe using Pub/Sub API or Apex triggers. Event-driven systems streamline the communication between distributed enterprise systems, increase scalability, and deliver real-time data. Using an event-driven architecture to connect systems is more efficient than polling data through APIs such as SOAP API or REST API. When using APIs to poll the server for data updates, freshness of the data depends on the poll frequency. In addition, clients can make excessive calls and cause server slowdown.

## When to Use Change Data Capture

Say you have an enterprise resource planning (ERP) system that stores your business information, and some of your data in Salesforce is duplicated there. To ensure that your ERP data is up to date, you can use change events to synchronize changes to the Salesforce records in your ERP system. For example, if order information resides in both your ERP system and Salesforce, you can stream order change events from Salesforce to an integration app. The app then synchronizes the changes in the ERP system.

Use change events to:

- Receive notifications of Salesforce record changes, including create, update, delete, and undelete operations.
- Capture changes of most fields for all records.
- Get information about the change in the event header, such as the origin of the change, so you can ignore changes that your client generates.
- Perform data updates using transaction boundaries when more than one operation is part of the same transaction.
- Use a versioned event schema.
- Subscribe to mass changes in a scalable way.
- Get access to retained events for up to 3 days.

We cover the details of change event messages, including header fields, in the next unit.

## An Example Integration App

Robert Bullard is a software developer at Get Cloudy Consulting, a high-tech consulting firm specializing in CRM implementations. Robert is developing an HR synchronization app for a client. The app synchronizes Salesforce record data changes with an HR system that's external to Salesforce. Robert's consulting client creates and modifies some of its human resource data in Salesforce as Employee__c custom object records. The client wants the employee data in the HR system to be in sync with Salesforce.

Robert's integration app has the following requirements.

- Replicate every new or changed Employee (Employee__c) custom object record in the HR data store.
- Replicate all Employee records along with all their fields.
- Use transaction-based replication. If multiple updates are in a single transaction, the integration app sends these updates as part of one transaction.
- Resume the replication from past event notifications that are stored for up to 3 days if the data replication process fails.

## Data Synchronization with Change Data Capture

After reviewing the different event streaming options in Salesforce, Robert decides that Change Data Capture is the answer. When he subscribes his app to the channel for the Employee custom object, the app receives notifications for every change with all modified fields. The app inspects header fields in the notification message to figure out if the change can be committed right away, or if the change should be combined with other changes. Because Salesforce stores change events for up to 3 days, the app can retrieve missed notifications.

## Resources

- Salesforce Developers: Change Data Capture Developer Guide
- Salesforce Developers: Pub/Sub API Developer Guide
- Trailhead: Platform Events Basics
