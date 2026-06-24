# Intro to External Services

**Module:** External Services  
**Source:** https://trailhead.salesforce.com/content/learn/modules/external-services/get-started-with-external-services  
**Saved:** browser extraction (logged-in session)

---

Learning Objectives

After completing this unit, you’ll be able to:

Explain the External Services feature and external services.

Describe the high-level workflow of an external service.

Why External Services?

Watch the Introduction video to see how you can declaratively transform API specifications into invocable actions.

Customers today expect a seamless customer experience, no matter if that experience consists of behind-the-scenes business solutions and services that reside on a single platform or across multiple platform hosts. It’s this interaction between Salesforce and outside services where External Services shines. 

External Services facilitates this exchange by letting you declaratively (no coding!) integrate with externally hosted services that perform business actions or computations for use in your Salesforce org. So what kind of valuable third-party services can be integrated into a Salesforce org? Here are a few examples.

Credit scoring service function for your Salesforce Account detail page

An eligibility verification service for discounts

Flexible digital payment services

Mapping services with visualization tools

Real-time order notification in Slack

Identification: Fraud prevention service

Integration of separate omnichannel retailing services

Google services

Government and international institutions services

Air quality index (AirNow)

Citizen services

Centers for Disease Control and Prevention (CDC)

The World Bank

We get into the details about what External Services is and how it works in a bit. But first, let’s look at a few examples that illustrate the workflow and highlight how External Services changes the integration landscape for all kinds of web services.

Make your new Salesforce org users automatic collaborators for external, org-related applications. Suppose you want users to have access to an external payroll information app so that they can look up their own timesheet and pay data. You register your external service (the payroll app), External Services converts the service into actions for use with Flow Builder. Next, you create a flow with triggers that act on the input (for example, user ID) from your payroll app. Now every time you create a new user within Salesforce, an autolaunched flow fires and adds the user as a collaborator with access to the payroll app service outside of Salesforce that contains their timesheet and salary.

Access outside Salesforce services to perform a task. Let’s say you want to connect to a credit service that determines if credit is extended to an account record stored in your Salesforce org. Here’s how it works. You register your external service (the credit validation service). External Services converts the service into invocable actions (see definition) for use with a platform tool like Flow Builder. Then you use Flow Builder to create a flow that includes the actions from this outside service into inputs like order amount and credit terms. When the flow runs, it updates the credit terms for the order associated with the account.

Once you learn the basics, you are able to use External Services’ workflow to harness services outside Salesforce that best suit your business model, use case, and, most importantly, your customers.

What We Talk About When We Talk About External Services

Do you know your external web service from your External Services? Let’s start with some definitions. 

External Services: A Salesforce integration product that encompasses (1) registering an external web service that you submit as an OpenAPI-compliant specification defining the web service, and (2) magically (well, almost!) bringing the operations of your external web service into the Salesforce Platform (see invocable actions) for use with point-and-click tools like Flow Builder. In a nutshell, it declaratively connects external REST APIs using OpenAPI standards.

External web service: Also referred to as external services (lowercase). Any type of function, action or process that’s developed and hosted outside of the Salesforce Platform. For an external web service to be consumable by External Services, it must be a REST-based API that typically uses the HTTPS protocol to navigate the web. (If you don’t know what REST is, that’s OK.)

API specification: Also referred to as an API spec, API specification is a file that contains the descriptive schema that defines what an API can do. External Services adheres to a JSON-based, OpenAPI specification format. An API spec is readable by both humans and machines. It defines the basics for the naming, order, and contents of objects, and ensures clear interactions with a REST API. See OpenAPI Specification.

Invocable actions (in the context of External Services): These represent the declarative building blocks available from a growing number of Salesforce Platform tools like Flow Builder or Einstein Bots. Invocable actions assist admins and developers by providing a way to implement and use any type of action in a consistent manner. In the External Services ecosystem, once you register your external web service’s operations with External Services, you can access the resulting invocable actions from, for example, the Flow Builder tool.

Flow Builder: A point-and-click tool for building flows. 

Flow: A flow is the part of Salesforce Flow that collects data and performs actions in your Salesforce org or in an external system. Salesforce Flow includes flows (built with Flow Builder) and processes (built with Process Builder).

While these terms—OpenAPI specification, API spec, and schema—are geared toward developers, External Services helps bridge the gap between the coding of web services and automating the access to them. 

The Big Picture

It’s time to take a step back and look at the whole picture to understand the interconnected building blocks of External Services. Notice that much of the work to register an external web service of your own is done declaratively via the External Services registration page. Once registered, you can use tools like Flow Builder to build a flow with the invocable actions of your web service.

Here’s an overview of what’s happening. Notice that while there are six steps, the key ones for External Services are 3, 4, and 5. 

An external web services provider, such as a bank, hosts its REST-based API. In this scenario, think of a REST-based API as specifying a type of contract between the bank (provider) and you (consumer).

The web service provider (like in our bank web service example) or a developer (or maybe even you) shares a JSON-based API spec that describes the API.

A Salesforce administrator or developer declaratively creates a named credential to authenticate the web service endpoint using the URL of the REST-based API provided by the external web service provider. The endpoint is simply what exposes the web services resources for interaction with External Services.

A Salesforce admin declaratively registers the web service and uses both the Named Credential and API spec during the registration process. External Services imports the API spec’s operations into your org and makes them available as invocable actions.

A Salesforce admin uses Flow Builder to access the invocable flow actions that were registered in Step 4.

During runtime, flow sends a callout to the web service endpoint. The web service returns output based on the API spec. Data is retrieved, created, updated, or deleted by the external web service. Salesforce can capture these responses from the external web service for use with a tool like Flow Builder.

If an API producer has not shared a spec with you, then creating an API spec in Step 2 is not a declarative process. You can either create the API spec (depending on your background) yourself, enlist your developer, or use a schema builder tool like Swagger Editor to do this. 

In the next unit, we cover the ins and outs (or more accurately, the inputs and outputs) of an API spec and discuss what it is. Once you have your API spec in hand, you can use the declarative tools already in Salesforce to add the business actions you need to your org.

Resources
Salesforce Help: External Services
Trailhead: Build Flows with Flow Builder
