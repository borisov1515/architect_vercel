# Salesforce and Heroku Integration via Connect

**Module:** Salesforce & Heroku Integration  
**Source:** https://trailhead.salesforce.com/content/learn/modules/salesforce_heroku_integration/integrating_with_salesforce_connect  
**Saved:** browser extraction (logged-in session)

---

Learning Objectives

After completing this unit, you'll be able to:

Discuss the Salesforce Connect Architecture.

Develop Salesforce Connect Custom Adapters.

Describe when and how to use Salesforce Connect with Heroku.

Salesforce Connect with Heroku

Salesforce Connect is an easy way of proxying external data into Salesforce without copying it to the database. In this way, you can pull data into Salesforce and correlate that data with other objects in Salesforce. Salesforce Connect works with a variety of data sources.

Any OData 2.0 data source can be pulled into Salesforce with Salesforce Connect.

Heroku Connect can expose a Heroku Postgres database to Salesforce Connect.

Any Heroku app can provide endpoints that can be consumed with Salesforce Connect.

In this unit, we're focusing on the third option. If you'd like more info on the others, you can learn how to use a Heroku Postgres database with Salesforce Connect with Heroku External Objects.

Heroku apps can provide web endpoints for web and mobile apps as well as REST services. Because REST services can easily be consumed in Salesforce with Apex, it's easy to write custom adapters for Salesforce Connect that proxy the data that the REST services provide.

The primary use case for Salesforce Connect custom adapters is when an external system (like your Heroku app!) provides data that is useful in the standard Salesforce UI. For instance, let's say you have a customer-oriented real estate app on Heroku that exposes REST data to JavaScript and mobile UIs. It would be great to bring some of that real estate data into the Salesforce UI, because some back-office business processes and reports could use it. All you need to do is write an adapter from the REST services running on Heroku to the Salesforce Connect structure.

The primary benefit of using Salesforce Connect instead of traditional ETL methods is that the data is always in sync because it's retrieved in near real time and not copied.

Get Started with Salesforce Connect and Heroku

To get started learning about Salesforce Connect custom adapters, check out the Rendering GitHub JSON Data in Salesforce blog post. If you are unfamiliar with running REST services on Heroku, pick a programming language and framework that fits your needs and expertise.

With the REST endpoint on Heroku ready to be consumed, it's now just a matter of writing some Apex code to bridge between Salesforce Connect and the service. For the example real estate REST service, we could have a simple Apex adapter that extends the DataSource.Connection class and implements the sync(), query(), and search() methods with a basic structure like:

global class RealEstateConnection extends DataSource.Connection { override global List<DataSource.TableResult> search(DataSource.SearchContext searchContext) { } override global List<DataSource.Table> sync() { } override global DataSource.TableResult query(DataSource.QueryContext queryContext) { } }

You can implement the search() method using custom search functionality or use this search out-of-the-box utility:

override global List<DataSource.TableResult> search(DataSource.SearchContext searchContext) { return DataSource.SearchUtils.searchByName(searchContext, this); }

The sync() method tells Salesforce about the data structure of the External Objects.For this example, we can just add a single table with a few columns. The ExternalId, DisplayUrl, and Name fields are required.

override global List<DataSource.Table> sync() { List<DataSource.Column> columns = new List<DataSource.Column>(); columns.add(DataSource.Column.text('ExternalId', 255)); columns.add(DataSource.Column.url('DisplayUrl')); columns.add(DataSource.Column.text('Name', 128)); columns.add(DataSource.Column.text('city', 128)); columns.add(DataSource.Column.text('price', 128)); List<DataSource.Table> tables = new List<DataSource.Table>(); tables.add(DataSource.Table.get('Properties', 'Name', columns)); return tables; }

When a user in Salesforce accesses an External Object’s list of records, the query() method fetches and parses the data into the data structure defined in the sync() method. Here is an example of the query() method for the real estate REST service.

override global DataSource.TableResult query(DataSource.QueryContext queryContext) { List<Map<String, Object>> properties = DataSource.QueryUtils.process(queryContext, getProperties()); DataSource.TableResult tableResult = DataSource.TableResult.get(queryContext, properties); return tableResult; } public List<Map<String, Object>> getProperties() { Http httpProtocol = new Http(); HttpRequest request = new HttpRequest(); String url = 'https://ionic2-realty-rest-demo.herokuapp.com/properties/'; request.setEndPoint(url); request.setMethod('GET'); HttpResponse response = httpProtocol.send(request); List<Map<String, Object>> properties = new List<Map<String, Object>>(); for (Object item : (List<Object>)JSON.deserializeUntyped(response.getBody())) { Map<String, Object> property = (Map<String, Object>)item; property.put('ExternalId', property.get('id')); property.put('DisplayUrl', 'https://ionic2-realty-rest-demo.herokuapp.com/'); property.put('Name', property.get('title')); properties.add(property); } return properties; }

The getProperties() method makes a request to the real estate REST API on Heroku. The query() method transforms the data into the data structure of the External Object.

When the other setup steps have been completed, the real estate data is available in Salesforce.

Because Salesforce Connect proxies the data, each time the user requests the data, Salesforce Connect uses the adapter to fetch the data. Now the data looks and acts just like any other data in Salesforce, except that it's coming from an app on Heroku!

Salesforce Connect Advanced Features

Salesforce Connect custom adapters make it easy to pull data into Salesforce from Heroku. Almost too easy. You can even define relationships between the different data sets. Learn more about External Object references in the DataSource.Column docs.

Pro tip: This simple example uses anonymous data but, in most cases, use some form of authentication with the external datastore. Learn more about authentication for external data sources in the Apex docs.

Salesforce Connect custom adapters can also handle data paging, which is essential if your REST services expose large data sets.
