# External Data Source and External Objects Setup

**Module:** Quick Start: Salesforce Connect  
**Source:** https://trailhead.salesforce.com/content/learn/projects/quickstart-lightning-connect/quickstart-lightning-connect2  
**Saved:** browser extraction (logged-in session)

---

Skip to main content
Trailhead
Quick Start: Salesforce Connect 
Create an External Data Source and External Objects
Create an External Data Source and External Objects
Add an External Data Source

In a real production system, you would use Salesforce Connect to access data in a back-end system, such as SAP or Microsoft SharePoint. In this task, you connect to a sample data source running on Heroku.

From Setup Quick Find, search and select External Data Sources.

Click New External Data Source.

Enter OrderDB
copy for External Data Source and name the data source OrderDB
copy.

Select Salesforce Connect: OData 2.0 as the type.

Enter https://orderdb.herokuapp.com/orders.svc
copy as the URL.

Leave the other fields with their default values, and click Save.

On the next screen, click Validate and Sync. Salesforce Connect retrieves the schema from the external system.

Select both the Order and OrderDetail tables.

Click Sync.

Scroll down to see the new external objects. Click them to see their fields.
