# Optimize Large Data Set Queries & Searches

**Module:** Large Data Volumes  
**Source:** https://trailhead.salesforce.com/content/learn/modules/large-data-volumes/conduct-data-queries-and-searches  
**Saved:** browser extraction (logged-in session)

---

Learning Objectives

After completing this unit, you’ll be able to:

Use queries without degrading performance when working with large data volumes.

Use bulk queries to efficiently query large data sets.

Describe the benefits of using skinny tables to contain frequently used fields.

Search Architecture

Storing huge amounts of data in your org can affect performance, and that definitely includes searches. Search is the capability to query records based on free-form text. The Salesforce search architecture is based on its own data store, which is optimized for searching for that text.

For data to be searched, it must first be indexed. Indexed searches are performed by first searching the indexes for appropriate records, then narrowing down the results based on access permissions, search limits, and other filters.

This creates a result set, which typically contains the most relevant results. After the result set reaches a predetermined size, the remaining records are discarded. The result set is then used to query the records from the database to retrieve the fields that a user sees. And when large volumes of data are added or changed, this whole process could take a long time.

Using Queries

Consider this scenario: You’ve got a nice lean set of objects. All the code for integrations and custom Visualforce pages has been written and performs well with test data. Everything is going fine as customers begin to use the system. But then performance begins to degrade seriously when the organization loads or accumulates a large amount of data.

The solution: query building. It’s key for designing an org that can handle LDV. It’s important to design selective list views, reports, and SOQL queries, and to understand query optimization.

SOQL vs. SOSL Queries

Search can be accessed with SOQL or SOSL queries. You can use SOQL to query child-to-parent relationships, which are often many-to-one, and to query parent-to-child relationships, which are almost always one-to-many.

SOSL can tokenize multiple terms within a field, and can build a search index off of this.

Limitations of SOQL and SOSL queries:

The limit for multiple SOSL searches in a single transaction is 20.

If there is only a single SOSL search in a transaction, which is a common occurrence, SOSL can return a full 40,000 records. This is in addition to SOQL in the same transaction potentially returning its 50,000 records.

If there is more than a single SOSL search in the transaction, the maximum records returned by EACH of the up to 20 separate SOSL searches is 2,000 (for example: 20 SOSL searches returning the max 2,000 records each max out the 40,000 record limit of the transaction).

The Query Optimizer

Because Salesforce uses multitenant architecture, the database system’s optimizer can’t effectively optimize Salesforce queries unaided. So the Salesforce platform includes its own query optimizer that takes advantage of indexed fields to create the most efficient execution plan for a given query, helping the database system’s optimizer produce effective execution plans for Salesforce queries.

The query optimizer maintains a table of statistics about the distribution of data in each index. It uses this table to perform pre-queries to determine whether using the index can speed up the query. It works on the queries that are automatically generated to handle reports, list views, and both SOQL queries and the other queries that piggyback on them.

Batch Apex

In general, the best way to query and process large data sets is to do it asynchronously in batches. You can query and process up to 50 million records using Batch Apex.

Batch Apex doesn't work in all use cases (for example, if you have a synchronous use like as a Visualforce page that needs to query more than 50,000 records), but it’s a great tool to have in your toolkit.

Bulk Queries

Another strategy to efficiently query large data sets is to use bulk queries. A bulk query can retrieve up to 15 GB of data, divided into fifteen 1 GB files. When results exceed 1 GB, additional files are added to complete the response.

Bulk API query supports both query and queryAll operations. The queryAll operation returns records that have been deleted because of a merge or delete. The queryAll operation also returns information about archived Task and Event records.

When adding a batch to a bulk query job, the Content-Type in the header for the request must be either text/csv, application/xml, or application/json, depending on the content type specified when the job was created. The actual SOQL statement applied for the batch is in plain text format.

How Bulk Queries Are Processed

When a bulk query is processed, Salesforce attempts to execute the query. If the query doesn’t execute within the standard two-minute timeout limit, the job fails and a QUERY_TIMEOUT error is returned. If this happens, rewrite a simpler query and resubmit the batch.

If the query succeeds, Salesforce attempts to retrieve the results. If the results exceed the 1GB file size limit or take longer than 5 minutes to retrieve, the completed results are cached and another attempt is made. After 30 attempts, the job fails and the error message Retried more than thirty times is returned. If this happens, consider using the PK Chunking header to split the query results into smaller chunks (more on PK chunking in a subsequent unit). If the attempts succeed, the results are returned and stored for seven days.

Using Skinny Tables

Say you~’fe followed coding best practices and worked with Salesforce Customer Support to place custom indexes wherever appropriate, but you’re still encountering performance problems. Users are complaining about their reports and dashboards timing out, and the SOQL called from your Visualforce page is performing slower and slower. If you desperately need to further improve performance, there’s a special, powerful solution: skinny tables.

A skinny table is a custom table that contains a subset of fields from a standard or custom base Salesforce object.

By having narrower rows and less data to scan than the base Salesforce object, skinny tables allows more rows per database to be fetched, increasing throughput when reading from a large object, as this diagram shows:

Also, skinny tables don’t include soft-deleted rows (i.e., records in the Recycle Bin with isDeleted = true), which often reduces the table volume. Custom indexes on the base table are also replicated, and they usually perform better because of the reduced table joins that happen in the underlying database queries.

Here’s an example of how a skinny table can speed up queries. Instead of using a date range like 01/01/16 to 12/31/16—which entails an expensive, repeated computation to create an annual or year-to-date report—you can use a skinny table to include a Year field and to filter on Year = '2016.'

The platform automatically synchronizes the rows between the base object and the skinny table, so the data is always kept current. The platform determines at query runtime when it would make sense to use skinny tables, so you don’t have to modify your reports or develop any Apex code or API calls.

Skinny tables are most useful with tables containing millions of records. They can be created on custom objects, and on Account, Contact, Opportunity, Lead, and Case objects. And they can enhance performance for reports, list views, and SOQL.

Skinny tables can be a convenient means of remedying performance issues. But they might not accommodate all use cases, or improve performance more than reading from the base Salesforce object with efficient indexes. They come with side effects you should understand, because they might restrict or burden your business processes.

Here are a few things to consider before implementing skinny tables:

Skinny tables are skinny. To ensure optimal performance, they contain only the minimum set of fields required to fulfill specific business use cases. If you later decide to add a field to your report or SOQL query, you must contact Salesforce Customer Support to re-create the table.

For Full sandboxes: Skinny tables are copied to your Full sandbox orgs. For other types of sandboxes: Skinny tables aren’t copied to your sandbox organizations. To have production skinny tables activated for sandbox types other than Full sandboxes, contact Salesforce Customer Support.

Skinny tables are custom tables in the underlying database. They don’t have the dynamic metadata flexibility you find in the base object. If you alter a field type (for example, change a number field to a text field) the skinny table becomes invalid, and you must contact Salesforce Customer Support to create a new skinny table.

Now that you have a few tools for speeding up searches involving large data volumes, continue to the next unit for the lowdown on data loads.

Resources
Salesforce Developer: Long- and Short-Term Approaches for Tuning Force.com Performance
Salesforce Developer: Working with Very Large SOQL Queries
PDF: Force.com SOQL Best Practices: Nulls and Formula Fields
Salesforce Developer: Best Practices for Deployments with Large Data Volumes/SOQL and SOSL
Salesforce Developer: How Bulk Queries Are Processed
Salesforce Developer: Best Practices for Deployments with Large Data Volumes
Salesforce Developer: Walk Through a Bulk Query Sample
PDF: Query & Search Optimization Cheat Sheet
