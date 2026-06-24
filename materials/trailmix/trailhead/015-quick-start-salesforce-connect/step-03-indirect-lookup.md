# Indirect Lookup Relationship Setup Guide

**Module:** Quick Start: Salesforce Connect  
**Source:** https://trailhead.salesforce.com/content/learn/projects/quickstart-lightning-connect/quickstart-lightning-connect3  
**Saved:** browser extraction (logged-in session)

---

Add an Indirect Lookup Field

An indirect lookup relationship is a new field type introduced with Salesforce Connect. It links an external object to a standard or custom object in the same way that a regular lookup relationship links standard or custom objects. In this task, you link Order to Accounts based on their Customer ID fields, resulting in a new related list on the Account page.

From Setup Quick Find, search and select External Objects.

Select Order.

Next to the customerID field, click Edit.

Click Change Field Type.

Select Indirect Lookup Relationship as the data type, and click Next.

For the Related To value, select Account and then click Next.

For the Target Field value, select Customer_ID__c and click Next.

Enter 18
copy as the field length. Leave the other options with their defaults.

Click Next.

To make the field visible to all profiles, select the checkbox next to Visible.

Click Next.
Note: In a real production setting, you would carefully analyze who should have access to order data.

Leave all the checkboxes in their default state and click Save. A new Orders related list is added to the Account page layouts.
Note: If the Orders related list is not visible on the Accounts page layout, try refreshing the page or adjusting the page layout: Setup > Object Manager > Account > Page Layouts > Account (Sales) Layout

Verify Step
+100 points

You’ll be completing this project in your own hands-on org. Click Launch to get started, or click the name of your org to choose a different one.

Verify step to earn 100 points
