# Guide to Subscribing to Salesforce Platform Events

**Module:** Platform Events Basics  
**Source:** https://trailhead.salesforce.com/content/learn/modules/platform_events_basics/platform_events_subscribe  
**Saved:** browser extraction (logged-in session)

---

Learning Objectives

After completing this unit, you’ll be able to:

Describe how to subscribe to platform event messages.

Subscribe to an event on the platform and in external apps.

Test platform events in an Apex test method.

Subscribe to Platform Events

Now that you’ve seen how to publish platform events, how do you subscribe to them to be notified of the latest news or of the shipment of a package? On the Salesforce Platform, you subscribe to events using Apex triggers, processes, flows, and the empApi
copy Lightning component. In an external app, you subscribe to events using Pub/Sub API.

Subscribe to Platform Event Notifications with Apex Triggers

You’ve probably used Apex triggers before, to perform actions based on database events. With platform events, the process is similar. You simply write an after insert Apex trigger on the event object to subscribe to incoming events. Triggers provide an autosubscription mechanism in Apex. No need to explicitly create and listen to a channel. Triggers receive event notifications from various sources—whether they’re published through Apex or APIs.

Platform events support only after insert triggers. The after insert trigger event corresponds to the time after a platform event is published. After an event message is published, the after insert trigger is fired.

To create a platform event trigger, use the Developer Console.

From the quick access menu ( ), click Developer Console, and then click File | New | Apex Trigger.

Provide a name and choose your event for the sObject, and click Submit.

The Developer Console automatically adds the after insert
copy event in the trigger template. Also, you can conveniently create a trigger from the event’s definition page in Setup, in the Triggers related list, but you have to specify the after insert
copy keyword.

The following example shows a trigger for the Cloud News event. It iterates through each event and checks whether the news is urgent through the Urgent__c
copy field. If the news is urgent, the trigger creates a case to dispatch a news reporter and adds the event location to the case subject.

Before you run this example, create a queue with a label of Regional Dispatch. To learn how to set up a queue, see Set Up Queues in Salesforce Help. For more information about the Group object, which represents a queue, see Group in the Object Reference for Salesforce and Lightning Platform.

This example assigns cases to a queue. Queues aren't part of platform events and you don't need to use them to use platform events. Assigning cases to a queue enables distributing cases to a team of support agents that are members of the queue.

// Trigger for listening to Cloud_News events. trigger CloudNewsTrigger on Cloud_News__e (after insert) { // List to hold all cases to be created. List<Case> cases = new List<Case>(); // Get queue Id for case owner Group queue = [SELECT Id FROM Group WHERE Name='Regional Dispatch' AND Type='Queue']; // Iterate through each notification. for (Cloud_News__e event : Trigger.New) { if (event.Urgent__c == true) { // Create Case to dispatch new team. Case cs = new Case(); cs.Priority = 'High'; cs.Subject = 'News team dispatch to ' + event.Location__c; cs.OwnerId = queue.Id; cases.add(cs); } } // Insert all cases corresponding to events received. insert cases; }
Set Up Debug Logging

Unlike triggers on standard or custom objects, triggers on platform events don’t execute in the same Apex transaction as the one that published the event. The trigger runs in its own process under the Automated Process entity, which is a system user. As a result, debug logs corresponding to the trigger execution are created by the Automated Process entity and aren’t available in the Developer Console. To collect platform event trigger logs, add a trace flag entry for the Automated Process entity in Setup.

From Setup, enter Debug Logs in the Quick Find box, then click Debug Logs.

Click New.

For Traced Entity Type, select Automated Process.

Select the start date and expiration date for the logs you want to collect.

For Debug Level, enter * and click Search.

Select a predefined debug level, such as SFDC_DevConsole or click New to create your own debug level.

Click Save.

Debug logs for Apex tests are an exception. They include logging for event triggers in the same test execution log.

Things to Note About Platform Event Triggers

Order of Event Processing

A trigger processes platform event notifications sequentially in the order they’re received. The order of events is based on the event replay ID. An Apex trigger can receive a batch of events at once. The order of events is preserved within each batch. The events in a batch can originate from one or more publishers.

Asynchronous Trigger Execution

A platform event trigger runs in its own process asynchronously and isn’t part of the transaction that published the event. As a result, there might be a delay between when an event is published and when the trigger processes the event. Don't expect the result of the trigger’s execution to be available immediately after event publishing.

Automated Process System User

Because platform event triggers don’t run under the user who executes them (the running user) but under the Automated Process system user, we set the owner ID field explicitly in our CloudNewsTrigger
copy example. We used the ID of a sample user queue called Regional Dispatch for the trigger example. If you create a Salesforce record with an OwnerId
copy field in the trigger, such as a case or opportunity, explicitly set the owner ID. For cases and leads, you can, alternatively, use assignment rules to set the owner.

Also, system fields of records created or updated in the event trigger, such as CreatedById
copy and LastModifiedById
copy, reference the Automated Process entity. Similarly, the Apex UserInfo.getUserId()
copy statement returns the Automated Process entity.

You can override the running user of a platform event trigger so that the trigger runs under that user instead of Automated Process. Configure the trigger by using PlatformEventSubscriberConfig in Metadata API or Tooling API. For more information, see Configure the User and Batch Size for Your Platform Event Trigger in the Platform Events Developer Guide.

Apex Governor Limits

Like standard or custom object triggers, platform event triggers are subject to Apex governor limits.

Apex Trigger Limitations

Platform event triggers share many of the same limitations of custom and standard object triggers. For example, you can’t make Apex callouts synchronously from triggers.

Trigger Batch Size

The batch size in a platform event trigger is 2,000 event messages, which is larger than the Salesforce object trigger batch size of 200. The batch size corresponds to the size of the Trigger.New
copy list. You can modify the batch size of a platform event trigger. For more information, see Configure the User and Batch Size for Your Platform Event Trigger in the Platform Events Developer Guide.

Subscriptions Related List on the Event Definition Page

You can view the state of all event triggers on the Platform Event Definition Detail page in Setup. Under Subscriptions, each active trigger is listed along with execution information and the state. Information includes the replay ID of the last published and last processed events. The state indicates whether the trigger is running or is disconnected from the subscription because of unrecoverable errors or insufficient permissions. The Error state is reached only when a trigger has been retried the maximum number of times. The following screenshot shows the Subscriptions related list on the Cloud News event detail page.

The Subscriptions related list also lists flows and processes that are subscribed to the event.

The Subscriptions related list doesn’t include subscribers that use Pub/Sub API, or the empApi Lightning component. You learn about the other types of subscribers later in this unit.

For high-volume platform events, the Last Published Id value is not available and is always shown as Not Available.

Manage an Event’s Apex Trigger Subscribers

As a system administrator, you can resume a suspended subscription where it left off, starting from the earliest event message that is available in the event bus. If you want to bypass event messages that are causing errors or are no longer needed, you can resume the subscription from the tip, starting from new event messages.

To manage a trigger subscription, in the Subscriptions related list, click Manage next to the Apex trigger.

In the subscription detail page, choose the appropriate action.

To suspend a running subscription, click Suspend.

To resume a suspended subscription, starting from the earliest event message that is available in the event bus, click Resume.

To resume a suspended subscription, starting from new event messages, click Resume from Tip.

You can’t manage subscriptions for flows and processes through the Subscriptions related list.

When you save a trigger, the trigger subscription resumes automatically. For more information, see View and Manage an Event’s Subscribers on the Platform Event’s Detail Page in the Platform Events Developer Guide.

Test Platform Event Triggers

Ensure that your platform event trigger is working properly by adding an Apex test. Before you can package or deploy any Apex code (including triggers) to production, your Apex code must have tests. To publish platform events in an Apex test, enclose the publish statements within Test.startTest and Test.stopTest statements.

// Create test events Test.startTest(); // Publish events Test.stopTest(); // Perform validation here

In a test context, the publish method call queues up the publish operation. The Test.stopTest() statement causes the event publishing to be carried out. After Test.stopTest(), perform your validations.

Here is an example of a test class for our Cloud_News event and its associated trigger. Publishing the event causes the associated trigger to fire. After Test.stopTest(), the test verifies that the publishing was successful by inspecting the value returned by isSuccess() in Database.SaveResult. Also, the test queries the case that the trigger created. If the case record is found, the trigger executed successfully, and the test passes.

@isTest public class PlatformEventTest { @isTest static void test1() { // Create test event instance Cloud_News__e newsEvent = new Cloud_News__e( Location__c='Mountain City', Urgent__c=true, News_Content__c='Test message.'); Test.startTest(); // Call method to publish events Database.SaveResult sr = EventBus.publish(newsEvent); Test.stopTest(); // Perform validation here // Verify that the publish was successful System.assertEquals(true, sr.isSuccess()); // Check that the case that the trigger created is present. List<Case> cases = [SELECT Id FROM Case]; // Validate that this case was found. // There is only one test case in test context. System.assertEquals(1, cases.size()); } }

Subscribe to Platform Event Notifications with a Lightning Component

Lightning apps can use the empApi
copy Lightning Web or Aura component to subscribe to events in the app.

Subscribe in a Lightning Web Component

To use the empApi
copy methods in your Lightning web component, import the methods from the lightning/empApi
copy module as follows.

import { subscribe, unsubscribe, onError, setDebugFlag, isEmpEnabled } from 'lightning/empApi';

Then call the imported methods in your JavaScript code.

For an example of how to use the lightning/empApi
copy module and a complete reference, see the lightning-emp-api documentation in the Lightning Component Library.

Subscribe in an Aura Component

To use the empApi
copy methods in your Aura component, add the lightning:empApi
copy component inside your custom component and assign an aura:id
copy attribute to it.

<lightning:empApi aura:id="empApi"/>

Then in the client-side controller, add functions to call the component methods.

For an example of how to use the lightning:empApi
copy component and a complete reference, see the lightning:empApi documentation in the Lightning Component Library.

Subscribe to Platform Event Notifications Using Clicks

To start a flow when a platform event message is received, create a platform event–triggered flow. From the Start element, choose a platform event whose event messages trigger the flow to run.

As you build the flow, you can use the field values from the platform event message by referencing the $Record
copy global variable.

Alternatively, you can subscribe to a platform event in flows by using a Pause element. Instead of starting a flow when a platform event message is received, that event message causes a paused flow interview to resume. For example, here’s a Pause element that pauses the flow until Salesforce receives a Cloud News event message. The flow resumes only if the event’s location matches {!contact.MailingCity}
copy. The {!contact}
copy record variable stores values for a contact record.

 
copy

Subscribe to Platform Event Notifications with Pub/Sub API

Pub/Sub API provides a single interface for publishing and subscribing to platform events. Based on gRPC API and HTTP/2, Pub/Sub API efficiently publishes and delivers binary event messages in the Apache Avro format. gRPC is an open source Remote Procedure Call (RPC) framework that enables connecting devices, mobile applications, and browsers to backend services. For more information, see the gRPC Documentation. Apache Avro is a data serialization system. For more information, see Apache Avro.

Pub/Sub API uses a pull subscription model in which the client requests a number of events from the server based on its processing capacity. Unlike push-based subscriptions in which a client waits to receive new events pushed from the server, with a pull subscription, a client proactively requests events from the server. This event flow control ensures that the client doesn’t get overwhelmed with more events that it can handle if there is a spike in event publishing.

Some of the benefits Pub/Sub API provides include:

Publishing, subscribing, and event schema retrieval all in one API.

Final publish results of publish operations, and not intermediate queueing results.

Flow control that lets you specify how many events to receive in a subscribe call based on event processing speed in the client.

Real-time, highly performant data streaming that uses compression through HTTP/2.

Support for 11 programming languages in the client that are offered by the gRPC API, such as Python, Java, Node, and C++. For all the supported languages, see https://grpc.io/docs/languages/.

A Pub/Sub API client can retrieve the schema, replay ID, and payload from the received event separately, and decode the payload. For example, the payload of the received Cloud News event looks similar to this message.

{ "CreatedDate": 1652978695951, "CreatedById": "005SM000000146PYAQ", "Location__c": "San Francisco", "Urgent__c": true, "Ink_Percentage__c": "Large highway is closed due to asteroid collision." }

For more information, see the Pub/Sub API Documentation.

Now that you’ve seen how to use Platform Events on the Salesforce Platform and in external apps, the possibilities are endless! Use Platform Events for any number of applications and integrations, such as processing business transactions or engaging in proactive customer service. With Platform Events, you adopt an event-based programming model and enjoy the benefits of event-based software architecture.

Resources

Pub/Sub API Documentation: Java Quick Start for Pub/Sub API

Platform Events Developer Guide: Platform Event Allocations

Platform Events Developer Guide: Retry Event Triggers with EventBus.RetryableException

Trailhead: Build an Instant Notification App

Salesforce Help: Assignment Rules
