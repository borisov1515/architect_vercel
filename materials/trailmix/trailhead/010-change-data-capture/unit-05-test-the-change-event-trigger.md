# Test the Change Event Trigger

**Module:** Change Data Capture Basics  
**Source:** https://trailhead.salesforce.com/content/learn/modules/change-data-capture/test-the-change-event-trigger  
**Saved:** browser extraction (logged-in session)

---

Learning Objectives

After completing this unit, you’ll be able to:

Write an Apex test class for the Apex change event trigger.

Run the test and provide test coverage for the Apex change event trigger.

Testing the Change Event Trigger

Now that you've learned how to write a change event trigger, let’s write a test for it. Testing your trigger is important not just as a good practice but it is also enforced by the platform. Before you can package or deploy Apex triggers to production, you must provide Apex tests and sufficient code coverage. 

You provide test coverage for the Apex trigger by writing an Apex test class, which includes one or more test methods. The structure of a test method for change event triggers looks as follows.

@isTest static void testChangeEventTrigger() { // Enable all Change Data Capture entities for notifications. Test.enableChangeDataCapture(); // Insert one or more test records // ... // Deliver test change events Test.getEventBus().deliver(); // Verify the change event trigger’s execution // ... }

The first statement you include in the test method is:

Test.enableChangeDataCapture();

This statement enables all entities for Change Data Capture and ensures that Salesforce record changes done in a test method fire change event triggers. This method enables all entities only for the test and doesn’t affect the Change Data Capture entity selections for the org.

After enabling Change Data Capture, perform some DML operations and then call the Test.getEventBus().deliver()
copy method. The method delivers the event messages from the test event bus to the corresponding change event trigger and causes the trigger to fire.

Test.getEventBus().deliver();

Test change events messages are published to the test event bus, which is separate from the Salesforce event bus. They aren’t persisted in Salesforce and aren’t delivered to event channels outside the test class. Properties of test change event messages, like the replay ID, are reset in test context and reflect only the values of test event messages.

Create and Run a Test for the Trigger

Let's get hands-on and create a test class, TestEmployeeChangeTrigger. The test method in the class creates an Employee test record and updates the record. Each of these operations fires the trigger on the Employee change event. The test ensures the trigger execution by querying the task that the trigger created and by verifying the count of tasks.

When running the test class in the Developer Console, the debug logs are available in the Logs tab. For Apex tests, there is no need to set up debug logs in Setup for the Automated Process entity.

To create the test class:

In the Developer Console, select File | New | Apex Class.

In the Name field, enter a name for the trigger: TestEmployeeChangeTrigger
copy.

Replace the default content with the following code.

@isTest public class TestEmployeeChangeTrigger { @isTest static void testCreateAndUpdateEmployee() { // Enable all Change Data Capture entities for notifications. Test.enableChangeDataCapture(); // Insert an Employee test record insert new Employee__c(Name='e-101', First_Name__c='Astro', Last_Name__c='Test', Tenure__c=1); // Call deliver to fire the trigger and deliver the test change event. Test.getEventBus().deliver(); // VERIFICATIONS // Check that the change event trigger created a task. Task[] taskList = [SELECT Id,Subject FROM Task]; System.assertEquals(1, taskList.size(), 'The change event trigger did not create the expected task.'); // Update employee record Employee__c[] empRecords = [SELECT Id,OwnerId,First_Name__c,Tenure__c FROM Employee__c]; // There is only one test record, so get the first one Employee__c emp = empRecords[0]; // Debug System.debug('Retrieved employee record: ' + emp); // Update one field and empty another emp.First_Name__c = 'Codey'; emp.Tenure__c = null; update emp; // Call deliver to fire the trigger for the update operation. Test.getEventBus().deliver(); // VERIFICATIONS // Check that the change event trigger created a task. // We should have two tasks now, including one from the first trigger invocation. Task[] taskList2 = [SELECT Id,Subject FROM Task]; System.assertEquals(2, taskList2.size(), 'The change event trigger did not create the expected task.'); } }
In the test class window, click Run Test. After the test finishes execution, the Tests tab shows the status of the test run.

Click the Tests tab and expand the Overall Code Coverage pane. The code coverage for EmployeeChangeTrigger is at 100%, which is the result of running this test.

You're now all set for writing a change event trigger with a test class so you can deploy it to production!

Resources
Salesforce Developers: Change Data Capture Developer Guide: Test Change Event Triggers

Hands-on Challenge
+500 points
GET READY

You’ll be completing this unit in your own hands-on org. Click Launch to get started, or click the name of your org to choose a different one.

YOUR CHALLENGE
Write a Test Class
Create a test method to provide test coverage for the OpportunityChangeTrigger that you created in the previous unit’s challenge.

Prework: Pass the previous unit’s challenge to create the trigger.
Create an Apex test class for your trigger modeled after the example TestEmployeeChangeTrigger code:
Class Name: TestOpportunityChangeTrigger
Method Name: testCreateAndUpdateOpportunity
Copy the body of the test method from the TestEmployeeChangeTrigger example class. You will modify it next.
In the test method, keep the first statement: Test.enableChangeDataCapture();
Create an opportunity:
Name: Sell 100 Widgets
StageName: Prospecting
CloseDate: Date.today().addMonths(3)
Call Test.getEventBus().deliver(); to fire the trigger.
Delete the verification section because you don't need to verify the trigger execution yet. You will do so later.
Modify the SOQL query to retrieve the StageName field from Opportunity.
Opportunity[] oppRecords = [SELECT Id,StageName FROM Opportunity];
Opportunity opp = oppRecords[0];
Update the stage name to Closed Won.
opp.StageName = 'Closed Won';
update opp;
Call Test.getEventBus().deliver(); to fire the trigger.
Query Task records using a SOQL query and verify that one task is returned.
Task[] taskList = [SELECT Id,Subject FROM Task];
System.assertEquals(1, taskList.size(), 'The change event trigger did not create the expected task.');
Run the test class and ensure that it passes and provides 100% coverage for the trigger.
Check Challenge to Earn 500 Points
