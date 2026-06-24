# Integrate Salesforce with Heroku via Heroku Connect

**Module:** Salesforce & Heroku Integration  
**Source:** https://trailhead.salesforce.com/content/learn/modules/salesforce_heroku_integration/integrating_with_heroku_connect  
**Saved:** browser extraction (logged-in session)

---

Learning Objectives

After completing this unit, you'll able to:

Describe the Heroku Connect Architecture.

Explain how to integrate Salesforce and Heroku with Heroku Connect.

Heroku Connect

You can use Heroku Connect for data replication and data proxies. Heroku Connect is used in conjunction with the awesome Heroku Postgres database. You can replicate data to and from Salesforce into this SQL database, or you can proxy it from the Heroku Postgres database into Salesforce using Salesforce Connect, which we cover in the next unit.

Data replication with Heroku Connect can be one way, from Salesforce to Heroku Postgres, or bidirectional. Data replication from Heroku Postgres to Salesforce can be configured to execute with very low latency, albeit not in real time. You have the option to control latency via a specified interval or alternatively, to poll on-demand in response to changes from the Salesforce Streaming API.

Because Heroku Connect uses Heroku Postgres, all standard database features are available with the replicated data. For instance, Dataclips (a Heroku Postgres feature) provides an easy way to query the data and share the queries either through the web or with formats like CSV.

A common use for Heroku Connect is business-to-consumer apps that use and potentially change data stored in Salesforce. Suppose you have a product catalog of inflatable unicorn party hats stored in Salesforce and want a public website to display that catalog. Heroku Connect makes that easy by replicating the product data to a Heroku Postgres database so that the public site can easily access the data. The public site could be built with a variety of open-source technologies, like Node.js, Java, or PHP. The interface to the data with Heroku Connect is just standard SQL.

This read-only use case is common, but updates back into Salesforce are also easy. For instance, if the public product website allowed users to "like" a product, that information could be stored in Salesforce to assist with back-office sales and marketing efforts.

Getting Started with Heroku Connect

You can dive into the detailed Heroku Connect documentation to learn more when you have a free Saturday night. Actually, any night will do.

Heroku Connect is a Heroku add-on, so it's easy to provision and configure through the Heroku dashboard. To configure Heroku Connect, you authenticate to a Salesforce instance using OAuth and allow Heroku Connect to make API calls on your behalf. Heroku Connect uses this API connection to synchronize the data between Salesforce and the Heroku Postgres database.

After you provision Heroku Connect for your Heroku app, you configure how and what data is synchronized. After the Salesforce-to-database mapping has been configured, your application can make a connection to the Heroku Postgres database and use standard SQL to access the data.

Heroku Connect Application Architecture

When using Heroku Connect for data replication, Salesforce owns the data schema. To add fields to a mapping, you customize the object in Salesforce and then configure the Heroku Connect mapping. You can map multiple objects. You can also map relationships between objects, enabling you to create custom objects in Salesforce that are related with standard objects. For instance, a Product Likes object could collate a Contact and a Product. Only the Heroku app would write to this object. Back-office users in Salesforce can then access the data for reporting and campaigns.

Typically, developers working on Heroku apps have a local development environment that mirrors the environment on Heroku. You can easily create the Heroku Connect schema in a local Postgres database to self-contain the development environment. An integration testing app on Heroku usually connects to a Salesforce instance so that developer changes can be tested against a Heroku Connect synchronized database before moving them to production.

Connecting to a Heroku Postgres database that is synchronized to Salesforce with Heroku Connect is no different than connecting to any other Postgres database. It's just a database!

Because the data has been replicated from Salesforce, you can run queries numerous times against Postgres, but there is only one read from Salesforce (until the data changes or the polling interval checks for changes). Because Heroku Postgres runs very near the Heroku app, the reads are incredibly fast with low latency.

Inserts and updates are all just standard SQL statements and are synchronized to Salesforce according to the mapping’s settings and schedule.
