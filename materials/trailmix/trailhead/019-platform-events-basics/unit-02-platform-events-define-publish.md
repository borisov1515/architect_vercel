# Understanding Platform Events Essentials

**Module:** Platform Events Basics  
**Source:** https://trailhead.salesforce.com/content/learn/modules/platform_events_basics/platform_events_define_publish  
**Saved:** browser extraction (logged-in session)

---

Learning Objectives

After completing this unit, you’ll be able to:

Define a platform event.

Describe how platform event messages can be published in Apex.

Use an Apex method to publish an event.

Publish an event using clicks in a process or flow.

Publish an event using REST API by inserting an sObject.

Define and Publish Platform Events

Now that you understand what platform events are and when they’re used, let’s get hands-on with defining a platform event! Remember the Cloud News agency? Let’s create a platform event definition that holds the data of news events.

Define a platform event named Cloud News:

From Setup, enter Platform Events
copy in the Quick Find box, then select Platform Events.

On the Platform Events page, click New Platform Event.

For Label, enter Cloud News
copy.

For Plural Label, enter Cloud News
copy.

For Description, enter Cloud news events deliver news at your fingertips
copy.

For Publish Behavior, keep the default of Publish Immediately.

To learn more about the publish behavior, see the "Platform Event Publish Behavior and Transactions" section later in this unit.

Click Save.

In the Custom Fields & Relationships related list, click New.

Select Text, and click Next.

For Field Label/Name, type Location
copy.

For Length, type 100
copy. Keep the defaults for the other fields and leave the Description field empty. Click Save.

Follow steps 7, 8, and 9 to add the next two fields:

Field Label/Name

	

Field Type

Urgent

	

Checkbox

News Content

	

Text Area (Long)

For the Cloud News event that you just defined, you created fields of various types, such as a text field or a checkbox. All field types that platform events support are:

Checkbox

Date

Date/Time

Number

Text

Text Area (Long)

Event Retention and ReplayId System Field

Salesforce stores high-volume platform events for 72 hours in the event bus. Standard-volume events that were defined before Spring ’19 are stored for 24 hours in the event bus. 

Newly defined events are high volume by default. Standard-volume events are the predecessors of high-volume events, and you can no longer define such events.

You can retrieve stored events from the event bus using Pub/Sub API. You can retrieve all stored events, or you can specify the replay ID of an event as the baseline for the retrieved portion of events. With Apex triggers, you can resume a suspended trigger and pick up the earliest retained unprocessed events. You learn later in this module how to manage Apex trigger subscriptions.

Even though Salesforce retains event messages temporarily, you can’t query them through SOQL or SOSL. Similarly, you can’t use event messages in the user interface in reports, list views, and search.

Each event message is assigned an opaque ID contained in the ReplayId field. The ReplayId field value, which is populated the system when the event is delivered to subscribers, refers to the position of the event in the event stream. Replay ID values are not guaranteed to be contiguous for consecutive events. A subscriber can store a replay ID value and use it on resubscription to retrieve events that are within the retention window. For example, a subscriber can retrieve missed events after a connection failure. Subscribers must not compute new replay IDs based on a stored replay ID to refer to other events in the stream.

API Name Suffix

When you create a platform event, the system appends the __e suffix to create the API name of the event. For example, for the Cloud News event, the API name is Cloud_News__e. Use the API name whenever you refer to the event programmatically, for example, in Apex, REST API, or Pub/Sub API.

Platform Event Publish Behavior and Transactions

You can choose a publish behavior for a platform event that you define. The publish behavior specifies when an event is published—either immediately after the publish call or after the transaction completes successfully.

Publish Immediately Publish Behavior

Select Publish Immediately if the event publishing isn't tied to transaction data. This is the default option, and we recommend it for most implementations. This option publishes the event message when the publish call executes, regardless of whether the transaction succeeds. With this option, a subscriber can sometimes receive the event message before the data is committed.

For example, select this option if the publisher and subscribers are independent, and subscribers don't rely on data committed by the publisher. Another example is when the immediate publishing behavior is suitable for an event used for logging purposes.

Publish After Commit Publish Behavior

Select Publish After Commit only if the subscriber requires committed transaction data when it receives the event message. With this option, the event message is published only after a transaction commits successfully and isn’t published if the transaction fails.

Consider this example for using the Publish After Commit option: A process publishes an event message and creates a task record, and a second process that is subscribed to the event is fired and expects to find the task record.

Publish Events

If your app is on the Salesforce Platform, you can publish events using an Apex method or with the Flow Builder declarative tool. If your app is an external app, you can publish events using Salesforce APIs, including Pub/Sub API and the data APIs, like REST API.

Publish Event Messages Using Apex

To publish event messages, you create an instance of the event and pass it to the EventBus.publish()
copy method.

The following example creates one event of type Cloud_News__e
copy, publishes it, and then checks whether the publishing was successful or encountered errors. The EventBus.publish()
copy method returns a Database.SaveResult
copy object, which contains the result of the publishing. If isSuccess()
copy returns true
copy, the publish request is queued in Salesforce and the event message is published asynchronously. If isSuccess()
copy returns false
copy, the event publish operation results in errors, which are returned in the Database.Error
copy object. This method doesn’t throw an exception due to an unsuccessful publish operation.

You can execute the Apex code snippet in the Developer Console.

From the quick access menu ( ), click Developer Console.

Click Debug | Open Execute Anonymous Window.

In the new window, replace any contents with the code snippet and then click Execute.

// Create an instance of the event and store it in the newsEvent variable Cloud_News__e newsEvent = new Cloud_News__e( Location__c='Mountain City', Urgent__c=true, News_Content__c='Lake Road is closed due to mudslides.'); // Call method to publish events Database.SaveResult sr = EventBus.publish(newsEvent); // Inspect publishing result if (sr.isSuccess()) { System.debug('Successfully published event.'); } else { for(Database.Error err : sr.getErrors()) { System.debug('Error returned: ' + err.getStatusCode() + ' - ' + err.getMessage()); } }

To publish more than one event in the same call, add your events to a list of events, and pass the list to the EventBus.publish()
copy method. The output of this method is an array of Database.SaveResult
copy objects: one for each published event. EventBus.publish()
copy can publish some passed-in events, even when other events can’t be published due to errors. The EventBus.publish()
copy method doesn’t throw exceptions caused by an unsuccessful publish operation. It is similar in behavior to the Apex Database.insert()
copy method when called with the partial success option.

// List to hold event objects to be published. List<Cloud_News__e> newsEventList = new List<Cloud_News__e>(); // Create event objects. Cloud_News__e newsEvent1 = new Cloud_News__e( Location__c='Mountain City', Urgent__c=true, News_Content__c='Lake Road is closed due to mudslides.'); Cloud_News__e newsEvent2 = new Cloud_News__e( Location__c='Mountain City', Urgent__c=false, News_Content__c='Small incident on Goat Lane causing traffic.'); // Add event objects to the list. newsEventList.add(newsEvent1); newsEventList.add(newsEvent2); // Call method to publish events. List<Database.SaveResult> results = EventBus.publish(newsEventList); // Inspect publishing result for each event for (Database.SaveResult sr : results) { if (sr.isSuccess()) { System.debug('Successfully published event.'); } else { for(Database.Error err : sr.getErrors()) { System.debug('Error returned: ' + err.getStatusCode() + ' - ' + err.getMessage()); } } }

When system resources become available, Salesforce publishes the queued events from the EventBus.publish()
copy call asynchronously and stores them in the event bus for a specific retention period. Most of the time, you don't need to worry about the final result of the queued event publishing because the eventual publishing succeeds. In rare cases, an internal system error can occur and can cause the asynchronous publishing to fail. To get confirmation of the final event publishing result, use Apex Publish Callbacks. For more information, see Get the Result of Asynchronous Platform Event Publishing with Apex Publish Callbacks in the Platform Events Developer Guide.

The Salesforce Platform provides allocations for how many events you can define in your org, and how many events you can publish in an hour. For events configured with the Publish After Commit behavior, each method execution is counted as one DML statement against the Apex DML statement limit.

You can check limit usage using the Apex Limits.getDMLStatements()
copy method. For events configured with the Publish Immediately behavior, each method execution is counted against a separate event publishing limit of 150 EventBus.publish()
copy calls. You can check limit usage using the Apex Limits.getPublishImmediateDML()
copy method. For more information see the Resources section. 

Publish Event Messages Using Clicks

To publish event messages without code, use the record creation functionality in Flow Builder. Configure a Create Records element to create an instance of the platform event (Cloud_News__e
copy), then set the values for the event. To set the value of a Boolean field, such as Urgent__c
copy, use {!$GlobalConstant.True}
copy.

Publish Event Messages Using Salesforce APIs

External apps use an API to publish platform event messages. You can publish events using Pub/Sub API, or data APIs, such as SOAP API, REST API, or Bulk API.

When using data APIs, you publish events in the same way that you insert sObjects. Like with Apex, the event message is published asynchronously. When you publish an event and get a success status of true
copy, the publish request is queued in Salesforce.

For example, for the Cloud News event, you can publish event notifications by inserting Cloud_News__e
copy records. The following example creates one event of type Cloud_News__e
copy in REST API.

sObject REST endpoint:

Request body for a POST request:

After the platform event message is created, the REST response looks like this output.

You can use any REST API tool or an HTTP client app to make REST API calls. For example, you can use Postman by following these steps. If you have not used Postman, yet, visit the Quick Start: Connect Postman to Salesforce project to get set up and fork the Salesforce APIs collection. Find more information about Postman in the Resources section.

Connect your DE org with Postman.

Log in to your Trailhead DE org.

Open the Postman app, select a Workspace, and navigate to your fork of the Salesforce API collection.

On the Authorization tab, scroll to the bottom and click Get New Access Token.

Click Allow.

In the Manage Access Tokens dialog, copy the instance URL to your clipboard.

Click Use Token.

On the Variables tab, in the _endpoint row, in the CURRENT VALUE column, paste the instance URL that you just copied, then click Save. You may need to close the documentation pane to see the Save button.

Test that your connection is working.

In Collections, select your fork of the Salesforce APIs collection.

Select REST to expand the REST APIs.

Select GET Limits, then click Send.

In the response window, the Status field should show as Status: 200 OK. If it does not, repeat the steps to get a new token.

Make a REST API call to publish event notifications.

In your fork of the Salesforce APIs collection, click REST.

Click SObject to expand it.

Click POST SObject Create.

In the Params tab, under Path Variables, for SOBJECT_API_NAME
copy , enter Cloud_News__e
copy.

In the Body tab, paste the following JSON body.

{ "Location__c" : "Mountain City", "Urgent__c" : true, "News_Content__c" : "Lake Road is closed due to mudslides." }
Click Send. The response that Salesforce returns after posting the event looks similar to the following.

{ "id" : "e00xx0000000001AAA", "success" : true, "errors" : [ { "statusCode": "OPERATION ENQUEUED", "message": "08ffc869-b9f8-4cff-a4ba-8dff9b3dd6cb", "fields": [] } ] }

Now that you’ve seen how to define and publish events, let’s see how to subscribe to them!

Resources

Platform Events Developer Guide: Platform Event Allocations

Apex Developer Guide: Execution Governors and Limits

Salesforce Help: Flows

Trailhead: Quick Start: Connect Postman to Salesforce

External Help: Postman Learning Center

Salesforce: Pub/Sub API Documentation

Salesforce: REST API Developer Guide

Salesforce: SOAP API Developer Guide

Salesforce: Bulk API Developer Guide
