# Improve Salesforce & Heroku Integration

**Module:** Salesforce & Heroku Integration  
**Source:** https://trailhead.salesforce.com/content/learn/modules/salesforce_heroku_integration/getting_started_with_integration  
**Saved:** browser extraction (logged-in session)

---

Learning Objectives

After completing this unit, you'll be able to:

Explain the different reasons to integrate Salesforce and Heroku.

Describe the methods for integrating Salesforce and Heroku.

As a Salesforce developer you know that Heroku provides a great place to run apps that integrate with Salesforce for a variety of use cases. But what exactly are those reasons and what are the best methods for integration? Read on and your questions will soon be answered.

Reasons for Integrating Salesforce and Heroku

Modern enterprise systems are composed of many different parts with different interfaces for a variety of types of users. These interfaces often pull together data from a variety of data sources. The microservices architecture has emerged as a way to decouple the pieces of a system into more easily maintainable, independently deployable services to provide endpoints that bring disparate systems together. Heroku is a great place to run apps and microservices that you can use with Salesforce through a variety of integration methods.

Four common reasons to integrate apps on Heroku with Salesforce are:

Data replication

Data proxies

Custom user interfaces

External processes

We look at each one in more depth later on in the module.

Integration Through Data Replication

Data replication is copying or synchronizing data between Salesforce and another system. You can use data replication for data warehousing to enable cross-data source reporting and analysis. You can also use it to work with legacy systems that either need data from Salesforce or feed data into Salesforce. The most common use case with Heroku and Salesforce is to provide a high-throughput, low-latency interface for customer-facing applications built with open-source technologies.

For instance, let's say you're selling inflatable unicorn party hats. Salesforce is your system of record for product information, such as pricing and inventory, with a public website built with Node.js, Rails, Java, and so on. The website uses that data to display availability and provide ordering functionality. With the public web application running on Heroku, it makes sense to replicate the product information to a datastore on Heroku so that it can handle a massive number of requests with low latency. For example, if users of the public site can "like" a product, you can use data replication to propagate the number of likes back to Salesforce for the marketing team.

Integration Through Data Proxies

Data proxies aggregate different datastores, but unlike data replication, the data isn't copied. The data can be read only on demand. This approach enables data science, business intelligence, reporting, and dashboarding tools to collate data across multiple datastores without worrying about data synchronization challenges like storage and staleness. You can integrate legacy systems and external systems through data proxies to provide data to Salesforce, or Salesforce can provide its data to other external systems.

If a Salesforce user needs to run inventory reports that correlate product data in Salesforce with warehouse data from an external system, data proxies can provide that information without using slower methods like extract transform and load (ETL). When the report is run, Salesforce fetches the necessary data from the external system without ever storing the data. The same also works in the opposite direction — an app running on Heroku is a data proxy for Salesforce to another system providing a security and transformation layer. We'll touch on that shortly.

Integration Through Custom User Interfaces

You can easily create custom user interfaces for Salesforce using a variety of technologies, such as Visualforce and Lightning Components, to name two. When interfaces are built with open-source technologies like Java, Node.js, PHP, and so on, they can run on Heroku and be integrated into the Salesforce UI or just with Salesforce data. Other times, a legacy or external system provides a user interface that needs to be surfaced in the Salesforce UI.

For example, a company that uses Salesforce for CRM acquires another company with a custom system built in Java. An easy first method of integrating those systems is simply to run the Java system on Heroku and render it in Salesforce. Running the Java system on Heroku can alleviate the scaling and ops burdens while standardizing on a deployment architecture for custom systems. Standalone user interfaces that run on Heroku and integrate with Salesforce data can provide back-office extensions to Salesforce as well as customer-facing web and mobile apps. Custom user interfaces might have libraries, features, or developer skillsets that drive the decision to use Heroku and open-source technologies over the native Salesforce Platform options.

Integration Through External Processes

External processes can offload batch processing and trigger event handling to apps on Heroku. This method can be helpful depending on the type of job that needs to be done and the amount of effort involved. Data science, machine learning, image and video processing, and integration with legacy or external systems can be reasons to offload external processes to Heroku.

As an example, let's say your real estate company uploads photos for each house it lists for sale. These photos are huge, so you need a way to resize them to reduce loading times and storage costs. You can easily offload this job to an external process on Heroku. Each time a photo is uploaded to Salesforce, it is sent to an app on Heroku for processing, and the resized image is saved back into Salesforce. The app on Heroku that handles the external process could be responsible only for that one piece of the system. In that case, the app is likely considered a microservice that can be deployed separately without any other system dependencies.

Integration Methods Overview

So now you know that data replication, data proxies, custom user interfaces, and external processes are all great reasons to combine Heroku and Salesforce. But how do you actually do this? A number of methods to accomplish these types of integrations are available, including:

Heroku Connect

Salesforce Connect

Salesforce REST APIs

Callouts

We'll dive into each one shortly, but here's a quick overview to get you started.

Heroku Connect

Heroku Connect provides both data replication and data proxies for Salesforce. Data replication synchronizes data between Salesforce and a Heroku Postgres database. Depending on how it's configured, the synchronization is either one way or bidirectional. Heroku Connect also provides a data proxy to Salesforce through the OData protocol using Heroku External Objects. Heroku External Objects provides an OData wrapper for the Heroku Postgres database that Heroku Connect maintains a connection for. This feature allows other web services to retrieve data from within the specified Heroku Postgres database using RESTful endpoints generated by the wrapper.

One of the biggest benefits of using Heroku Connect for data replication is that a subset of Salesforce data is quickly and easily accessible to an app on Heroku. As an app developer, you simply write standard SQL for queries as you normally would. Heroku Connect and Postgres provide a low-latency and high-throughput access to Salesforce data.

Salesforce Connect

You can use Salesforce Connect (formerly called Lightning Connect) as a data proxy to pull OData or other data sources into Salesforce on demand. No data is copied to the Salesforce database. You can run endpoints that expose OData 2.0 on Heroku or as provided by external systems. As mentioned previously, Heroku Connect can expose a Heroku Postgres database as OData for consumption by Salesforce Connect. Alternatively, Salesforce Connect custom adapters allow Salesforce to proxy any data source that Apex can talk to, including REST with XML or JSON and SOAP.

The primary benefit of Salesforce Connect is that it brings external data into the Salesforce UI and makes it look as if the data resides in Salesforce, although it's just proxied on demand from an external data source. This process makes it easy to collate disparate data sources for Salesforce users.

Salesforce REST APIs

The Salesforce REST APIs provide apps on Heroku access to Salesforce data through simple JSON-formatted HTTP requests. You can use this integration for data proxies and custom user interfaces. Applications built with open-source technologies that are running on Heroku can use OAuth to authorize users in a custom user interface and then interact with Salesforce data on their behalf. Integration use cases without a user interface can broker data between Salesforce and external systems.

Callouts

You can use callouts from Salesforce to call external processes on Heroku. You write the callouts in Apex or use outbound message actions to have events on Salesforce trigger the execution of a process on Heroku. That process often uses one of the previously mentioned integration methods to get the result of the process back into Salesforce.

Visit the Extend Flows with Heroku Compute: An Event Driven Pattern blog post to learn about Heroku and external services.

Comparing Integration Methods

Each Salesforce and Heroku integration method has a place depending on developer skill sets and the use case at hand. Here are some basic differences between the integration options.

	

Heroku Connect

	

Salesforce Connect

	

REST APIs

	

Callouts

Security Model

	

Integration user

	

Various (including integration user and named principal)

	

OAuth

	

App user

Limits

	

Excluded from limits

	

Max # of sources, objects, and fields

	

API limits

	

API limits

SObject Features

	

All standard features

	

Read only

No formula and roll-up summary fields

No triggers and approvals process

No Validation Rules

Field history tracking

No notes, attachments

	

All standard features

	

N/A

Data Strategy

	

Real-time BiDi sync or OData

	

OData or proxy

	

Read & copy

	

Payload

End Users

	

Anonymous, customers

	

Salesforce users

	

Any

	

No

Protocol

	

SQL

	

Apex

	

HTTP

	

HTTP

Here are some general suggestions for integrations:

To replicate data between Salesforce and Heroku, use Heroku Connect.

To expose a Heroku Postgres database to Salesforce, use Heroku Connect External Object.

To proxy OData, SOAP, XML, or JSON data sources into Salesforce, use Salesforce Connect.

If Heroku Connect doesn't fit the bill, like when you have a custom UI on Heroku where users log in via Salesforce, use the Salesforce REST APIs.

To offload or extend the processing of Salesforce data events, use callouts from Salesforce to Heroku.

Resources
Heroku: Heroku Connect
Salesforce Help: Salesforce Connect
Salesforce Help: Outbound Message Actions
