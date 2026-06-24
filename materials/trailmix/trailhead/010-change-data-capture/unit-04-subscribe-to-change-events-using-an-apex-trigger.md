# Apex Trigger for Change Events

**Module:** Change Data Capture Basics  
**Source:** https://trailhead.salesforce.com/content/learn/modules/change-data-capture/subscribe-to-change-events-using-an-apex-trigger  
**Saved:** browser extraction (logged-in session)

---

Learning Objectives

After completing this unit, you’ll be able to:

Write an Apex trigger to subscribe to change events.

Generate change event notifications by making updates in Salesforce.

Verify debug log messages from the trigger in the debug log.

You've seen how to subscribe to change events using Pub/Sub API. Apex triggers are another way to subscribe to change events. Let’s learn more about them.

Asynchronous Apex Triggers for Change Events

You can subscribe to change events on the Lightning Platform using Apex triggers. Apex triggers for change events are similar to Apex triggers for Salesforce objects but have some differences. Like an Apex trigger for Salesforce objects, you define a change event trigger on the change event corresponding to the Salesforce object. Only after insert triggers are supported. 

Define a change event trigger with the after insert
copy keyword on the change event using this format.

trigger TriggerName on ChangeEventName (after insert) { }

Here’s an example for the AccountChangeEvent object, which is the change event corresponding to Account.

trigger MyAccountChangeTrigger on AccountChangeEvent (after insert) { }

The change event trigger fires when one or a batch of change events is received. Unlike object triggers, change event triggers run asynchronously after the database transaction is completed. The asynchronous execution makes change event triggers ideal for processing resource-intensive business logic while keeping transaction-based logic in the object trigger. By decoupling the processing of changes, change event triggers can help reduce transaction processing time.

Change event triggers have these characteristics.

They run under the Automated Process entity. As such, debug logs for the trigger are created by the Automated Process entity, and system fields, such as CreatedById and OwnerId, reference Automated Process.

They are subject to Apex synchronous governor limits.

They have a maximum batch size of 2,000 event messages (the number of items in Trigger.New
copy).

Apex Change Event Record and Header Fields

Because fields in a change event message are statically defined, just like in any other Apex type, all record fields are present. Apex change event messages can contain empty (null) fields. Unchanged fields are null, and so are fields that are explicitly set to null in an update. 

To figure out which fields were modified, use the changedFields
copy header field. It contains a list of record fields that were changed in an update operation. The example trigger in this unit shows how to use the changedFields
copy field to determine which fields were updated or deleted.

The changedFields
copy header field is available for Apex change event triggers saved using API version 47.0 or later.

Create a Change Event Trigger

Adding a change event trigger is as straightforward as adding a trigger for a Salesforce object. Using the Developer Console, you create a trigger on the change event associated with the Employee custom object that you created previously. The system creates the change event object, Employee__ChangeEvent, when you create a custom object. 

The following steps require that you create the Employee__c custom object first. Follow the steps in the previous unit to create this custom object. 

To create the change event trigger using the Developer Console:

Click the quick access menu ( ).

Click Developer Console.

In the Developer Console, select File | New | Apex Trigger.

In the Name field, enter a name for the trigger: EmployeeChangeTrigger
copy.

From the dropdown, select the change event object for the Employee custom object: Employee__ChangeEvent. The trigger is created with the after insert
copy keyword.

Replace the default content with the following code.

trigger EmployeeChangeTrigger on Employee__ChangeEvent (after insert) { List<Task> tasks = new List<Task>(); // Iterate through each event message. for (Employee__ChangeEvent event : Trigger.New) { // Get some event header fields EventBus.ChangeEventHeader header = event.ChangeEventHeader; System.debug('Received change event for ' + header.entityName + ' for the ' + header.changeType + ' operation.'); // For update operations, we can get a list of changed fields if (header.changetype == 'UPDATE') { System.debug('List of all changed fields:'); for (String field : header.changedFields) { if (null == event.get(field)) { System.debug('Deleted field value (set to null): ' + field); } else { System.debug('Changed field value: ' + field + '. New Value: ' + event.get(field)); } } } // Get record fields and display only if not null. System.debug('Some Employee record field values from the change event:'); if (event.First_Name__c != null) { System.debug('First Name: ' + event.First_Name__c); } if (event.Last_Name__c != null) { System.debug('Last Name: ' + event.Last_Name__c); } if (event.Name != null) { System.debug('Name: ' + event.Name); } if (event.Tenure__c != null) { System.debug('Tenure: ' + event.Tenure__c); } // Create a followup task Task tk = new Task(); tk.Subject = 'Follow up on employee record(s): ' + header.recordIds; tk.OwnerId = header.CommitUser; tasks.add(tk); } // Insert all tasks in bulk. if (tasks.size() > 0) { insert tasks; } }

This change event trigger iterates through each received change event message in Trigger.New
copy. For each event, the trigger gets a few header fields. If the operation is an update, the trigger also gets the list of fields that were changed by accessing the changedFields
copy header value. Next, the trigger displays record field values if not null. Finally, it  creates a follow-up task for new Employee records.

From the user interface, you can create change event triggers from the Developer Console only. Change event objects aren't listed in Object Manager in Lightning Experience, or in Setup in Salesforce Classic. 

Verify Change Event Trigger Execution

Now let’s verify manually that the trigger is working. To receive event messages in the trigger, enable the object first on the Change Data Capture page in Setup. In a previous step, you already enabled notifications for Employee, so you can skip that step here. Because debug logs are created under the Automated Process entity, enable debug logs in Setup for this entity for logs to be collected.

To open Setup in a new tab, click the quick access menu ( ), then click Setup.

From Setup, enter Debug Logs
copy in the Quick Find box, then select Debug Logs.

Click New.

For Traced Entity Type, select Automated Process.

Select the time period for log collection. The start and expiration dates default to the current date and time. Extend the expiration date by clicking the end date input box, and selecting the next day from the calendar.

For Debug Level, click New Debug Level. Enter CustomDebugLevel
copy for the name, accept the defaults.

Click Save.

Leave the Debug Logs Setup page open, since you’ll come back to it in a minute. Next, make some changes in Salesforce to fire the change event trigger. Create an Employee record and then update it.

In a new tab, from the App Launcher ( ), find and select Employees.

Click New.

Populate the following fields.

Employee Name: e-200
copy
Last Name: Smith
copy
First Name: Joseph
copy
Tenure: 1
copy
Click Save.

In the employee record detail page, click Edit.

Change the First Name field to Joe
copy.

Delete the value for Tenure.

Click Save.

Switch to the Debug Logs tab and refresh the browser.

To view the debug logs corresponding to the record creation, click View next to the second log in the list (logs are ordered by most recent first). The output of the System.debug
copy statements looks similar to the following.

...|DEBUG|Received change event for Employee__c for the CREATE operation. ...|DEBUG|Some Employee record field values from the change event: ...|DEBUG|First Name: Joseph ...|DEBUG|Last Name: Smith ...|DEBUG|Name: e-200 ...|DEBUG|Tenure: 1.0
To view the debug logs corresponding to the record update, click View next to the first log in the list. The output of the System.debug
copy statements looks similar to the following. Because the system updates the LastModifiedDate field when the record is updated, this field is listed as part of the changed fields.

...|DEBUG|Received change event for Employee__c for the UPDATE operation. ...|DEBUG|List of all changed fields: ...|DEBUG|Changed field value: LastModifiedDate. New Value: 2019-09-26 20:53:29 ...|DEBUG|Changed field value: First_Name__c. New Value: Joe ...|DEBUG|Deleted field value (set to null): Tenure__c ...|DEBUG|Some Employee record field values from the change event: ...|DEBUG|First Name: Joe

Congrats! You wrote a change event trigger and you’ve verified that it’s working properly in the user interface. In the next unit, you learn how to write an Apex test for the change event trigger to automate the testing of your trigger.

Resources
Salesforce Developers: Change Data Capture Developer Guide: Subscribe with Apex Triggers
Salesforce Developers: Apex Developer Guide

Hands-on Challenge
+500 points
GET READY

You’ll be completing this unit in your own hands-on org. Click Launch to get started, or click the name of your org to choose a different one.

YOUR CHALLENGE
Write a Change Event Trigger
Create a change event trigger that captures changes on opportunities and creates a follow-up task for opportunities whose stage is set to 'Closed Won'.
Create an Apex trigger modeled after the EmployeeChangeTrigger example trigger:
Name: OpportunityChangeTrigger
Object: OpportunityChangeEvent
Copy the body of the EmployeeChangeTrigger example trigger. Delete everything after the if statement for the header, starting with the System.debug statements.
Modify the for loop so it iterates over every received OpportunityChangeEvent. For each event, if the header changeType field is 'UPDATE', check if event.isWon field is equal to true. You will end up with the following if statement:
if ((header.changetype=='UPDATE') && (event.isWon==true)) { // Create a task }
Inside the new if statement block, add these lines to create a task.
Task tk = new Task();
tk.Subject = 'Follow up on won opportunities: ' + header.recordIds;
tk.OwnerId = header.CommitUser;
tasks.add(tk);
Insert the task list after the end of the for loop.
if (tasks.size() > 0) {
insert tasks;
}
Check Challenge to Earn 500 Points
