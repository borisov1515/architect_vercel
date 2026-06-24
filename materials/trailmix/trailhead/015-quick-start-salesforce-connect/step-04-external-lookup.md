# External Lookup Relationship Setup Guide

**Module:** Quick Start: Salesforce Connect  
**Source:** https://trailhead.salesforce.com/content/learn/projects/quickstart-lightning-connect/quickstart-lightning-connect4  
**Saved:** browser extraction (logged-in session)

---

Add an External Lookup Field

An external lookup relationship is another new field type introduced with Salesforce Connect. This type links an object to an external object. In this task, you link an external object to another external object! You link Order Detail to Order based on the Order ID field in both objects, resulting in a new related list on the Order page.

From Setup Quick Find, search and select External Objects.

Select OrderDetail.

Next to the orderID field in Custom Fields & Relationships, click Edit.

Click Change Field Type.

Select External Lookup Relationship as the data type.

Click Next.

For the Related To value, select Order and then click Next.

Enter 18
copy as the field length. Leave the other options with their defaults.

Click Next.

To make the field visible to all profiles, select the checkbox next to Visible and click Next.

Leave all the checkboxes in their default state and click Save. A new OrderDetails related list is added to the Order page layouts.

Check your work! Navigate to the account object. Click any order number to view a new related list below the order data.

Click an External ID to see the line item's data.

Summary

Congratulations! In just a few minutes, you integrated external data by configuring an external data source in Salesforce, linked external objects with standard Salesforce account data, and brought it all together in the Salesforce user interface, all without writing a single line of code! Now that's data integration, lightning fast!

Verify Step
+100 points

You’ll be completing this project in your own hands-on org. Click Launch to get started, or click the name of your org to choose a different one.

Verify step to earn 100 points
