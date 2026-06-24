# Optimize Large Data Volume & Avoid Data Skew in Salesforce

**Module:** Large Data Volumes  
**Source:** https://trailhead.salesforce.com/content/learn/modules/large-data-volumes/design-your-data-model  
**Saved:** browser extraction (logged-in session)

---

Learning Objectives

After completing this unit, you’ll be able to:

Design a data model for large data volumes.

Describe the three types of data skew and how to avoid them.

Extend a data model to include external objects.

Plan Your Data Model

Data is one of the key elements of any application. Users constantly create data. All day long. Every day. So. Much. Data. Suddenly your org has accumulated millions of records, thousands of users, and several gigabytes of data storage.

These large data volumes (LDV) can lead to sluggish performance, including slower queries, slower search and list views, and slower sandbox refreshing. You can avoid this predicament if you plan for accommodating LDV up front, designing your data model to build scalability from the get-go.

The Scoop on Data Skew

A key for managing large data volumes for peak performance is carefully architecting record ownership to avoid data skew. Data skew happens when more than 10,000 child records are associated with the same parent record within an org.

Plan your data model with enough accounts to keep the number of child records per parent below this threshold, and distribute new child records across these accounts as they’re created. If you don’t use these strategies, there are three types of data skew that can occur and negatively affect performance: account data skew, ownership skew, and lookup skew.

Account Data Skew

Certain Salesforce objects, like accounts and opportunities, have special data relationships that maintain parent and child record access under private sharing models. Too many child records associated with the same parent object in one of these relationships causes account data skew. Say you have a bunch of unassigned contacts and park them under one account named “Unassigned.” This can create issues with record locking and sharing performance.

Record Locking

Here’s another scenario: You’re updating a large number of contacts under the same account in multiple threads. For each update, the system locks both the contact being changed and its parent account to maintain integrity in the database. Even though each lock is held for a very short time, because all the updates are trying to lock the same account, there’s a high risk an update will fail because a previous one is still holding the lock on the account.

Sharing Issues

There’s a similar dynamic when it comes to sharing. Depending on how you have sharing configured, when you do something that seems simple, like changing the owner of an account, you may need to examine every one of the account’s child records and adjust their sharing, as well. That may include recalculating the role hierarchy and sharing rules. And if we’re talking about hundreds of thousands of child records, that can eat up tons of time.

Ownership Skew

When a large number of records with the same object type are owned by a single user, this imbalance causes ownership skew. Since every record is required to have an owner, it seems like the natural solution is to skew those records onto a generic owner, such as the aforementioned “Unassigned.” But this can cause performance issues due to sharing calculations required to manage visibility of those records.

When the skewed owner exists in the role hierarchy, operations like deletes or owner updates must remove sharing from the old owner and all parent users within the role hierarchy, and from all users given access by sharing rules. That’s why ownership changes tend to be one of the most costly transactional changes in the system.

In some cases an ownership skew simply can’� be avoided. In these cases, it’s best to ensure the skewed owner doesn’t have a role. That way, you take the user and their records away from the role hierarchy and its associated sharing rules.

Lookup Skew

Lookup skew happens when a very large number of records are associated with a single record in the lookup object (the object you’re searching against). Because you can place lookup fields on any object in Salesforce, lookup skew can create problems for any object within your organization.

If you end up with lookup skew and have a highly complex custom implementation, you might be creating a problem without realizing it. By carefully considering your options for managing lookup skew, you can avert lock issues on lookup fields to ensure your architecture can scale to meet your org’s growth.

What makes lookup skew so bad? Lookup fields in Salesforce are essentially foreign key relationships between objects. Every time a record is inserted or updated, Salesforce must lock the target records that are selected for each lookup field. This ensures that when the data is committed to the database, its integrity is maintained.

Under normal circumstances, save operations execute so quickly that you don’t encounter locks. But when you add custom code and LDV simultaneously in an automated process, you might encounter lock exceptions that cause failures when you try to insert or update records.

Since there aren’t any tools specifically designed to identify lookup skew, finding these architectural issues can be like finding a needle in a haystack. It’s important to remember that lookup skew, under certain usage patterns, may not cause any problem at all, so it’s best to search based on patterns that will cause problems. You should evaluate objects with a large number of records and heavy concurrent insert and update activity.

Using External Objects

Another strategy for LDV is using external objects—which means there’s no need to bring data into Salesforce. With a data-tiering strategy that spreads data across multiple objects and brings it on demand from another object or external store, you avoid both storing large amounts of data in your org, and the performance issues associated with LDV.

External objects are similar to custom objects, except they map to data that’s stored outside your Salesforce organization, enabling your users to search and interact with the external data.

By accessing record data on demand, external objects always reflect the current state of the external data. You don't have to manage a copy of that data in Salesforce, so you're not wasting storage and resources keeping data in sync. External objects are best used when you have a large amount of data that you can’t or don’t want to store in your Salesforce org, and you only need to use a small amount of that data at any one time.

An external data source specifies how to access an external system. Salesforce Connect uses external data sources to access data that's stored outside your Salesforce organization. Files Connect uses external data sources to access third-party content systems. External data sources have associated external objects, which your users use to interact with the external data and content.

External Object Lookups

External objects support standard lookup relationships, which use the 18-character Salesforce record IDs to associate related records with each other. But data that’s stored outside your Salesforce org often doesn’t contain those record IDs. So two special types of lookup relationships are available for external objects: external lookups and indirect lookups.

These external lookups and indirect lookups compare a specific field’s values on the parent object to the relationship field’s values on the child object. When values match, the records are related to each other.

Use an external lookup relationship when the parent is an external object. An external lookup relationship links a child standard, custom, or external object to a parent external object. The values of the standard External ID field on the parent external object are matched against the values of the external lookup relationship field. For a child external object, the values of the external lookup relationship field come from the specified External Column Name.

Use an indirect lookup relationship when the external data doesn’t include Salesforce record IDs. An indirect lookup relationship links a child external object to a parent standard or custom object. When you create an indirect lookup relationship field on an external object, you specify the parent object field and the child object field to match against each other, selecting a custom unique external ID field on the parent object to match against the child’s indirect lookup relationship field, whose values are determined by the specified External Column Name.

Here’s a breakdown of the types of relationships available to external objects:

Relationship

	

Allowed Child Objects

	

Allowed Parent Objects

	

Parent Field for Matching Records

Lookup

	

Standard

Custom

External

	

Standard

Custom

	

The 18-character Salesforce record ID

External Lookup

	

Standard

Custom

External

	

External

	

The External ID standard field

Indirect Lookup

	

External

	

Standard

Custom

	

You select a custom field with the External ID and unique attributes

Now you know key things to keep in mind (and avoid) when architecting your org for large data volumes. You may also want to engage an architect from Salesforce Strategic Services to help you design the best way to manage the initial configuration and growth over time. In the next unit, we throw LDV queries and searches into the mix.

Resources
Salesforce Help: Define External Objects
PDF: Designing Record Access for Enterprise Scale
Salesforce Developer: Overview of Salesforce Objects and Fields / External Objects
