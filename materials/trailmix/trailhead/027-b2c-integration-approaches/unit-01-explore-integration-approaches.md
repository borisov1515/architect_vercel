# Integration Strategy Best Practices

**Module:** Salesforce B2C Commerce Third-Party Integration Strategies  
**Source:** https://trailhead.salesforce.com/content/learn/modules/b2c-integration-approaches/b2c-explore-integration-approaches  
**Saved:** browser extraction (logged-in session)

---

Learning Objectives

After completing this unit, you’ll be able to:

List the interfaces you can use for integration.

Explain how you can push or pull data.

Explain the need for real-time versus batch integration.

Explain the tradeoffs between implementing integrations client-side versus server-side.

Describe how the loose coupling principle provides for fault tolerance.

Commerce Cloud is now Agentforce Commerce and B2C Commerce is now Agentforce Commerce for B2C. You may see references to Commerce Cloud and B2C Commerce in our applications and documentation.

Understand Integration Requirements

The Agentforce Commerce for B2C platform is all about integrating various third-party services to create an amazing shopper experience. These typically include checkout services such as tax services and shipping and payment processors. An implementation might also have a separate service that maintains a repository of product videos to display on the product details page. And there’s always links to social media.

Each Agentforce Commerce for B2C merchant and project has a unique set of requirements when it comes to integration. As the technical architect, it's critical that you fully understand each integration interface and can summarize data inputs and outputs in all cases. That means coming up with a strategy and applying best practice principles along the way. While an effective integration strategy can improve data flow for the entire implementation, the application of key integration principles can help produce a more scalable and stable application.

Integration Interfaces

Some of the interfaces you can use for integration include the Agentforce Commerce for B2C Web Services framework and the Agentforce Commerce for B2C scheduled jobs interface. Both are available within Business Manager. Which one you chose depends on your integration strategy. You can even use both. Learn more about the Web Services framework in the next unit.

You can also use the Salesforce Commerce API (SCAPI) for programmatic access. Review the APIs for more information.

Integration Strategies

Now that you’ve explored interfaces, here are some key strategies to consider.

Synchronous (real-time) versus asynchronous (batch)

Push versus pull

Client-side versus server-side

Each strategy has strengths and weaknesses. As you map these to a project, you can identify the best strategy, or combination of strategies, for each integration scenario. For example, the strategy you select for an integration to show loyalty points will be different from one that imports product data.

Let’s take a look at these strategies.

Synchronous Integration

Synchronous integration happens in real time, ensuring that the data is visible or updated immediately. Implement this strategy using the Web Services framework, a tool that helps you manage calls to web services and analyze service performance. Within the Web Services framework, Agentforce Commerce for B2C storefront request processing is suspended until the third party responds or times out. We discuss the Web Services framework in the next unit.

We recommend that you use the synchronous integration strategy to implement stateless third-party integration designs such as loyalty points, tax calculation, and real-time order history view from an order management system.

For example, for a tax calculation integration, it’s best to send an entire basket and receive tax data for all product line items (PLIs). This strategy is more efficient than processing PLI by PLI and sending multiple requests. With multiple requests, you must keep track of the state. If the request fails for one of the PLIs, you have to try later or reattempt the request. This is a problem because stateful integrations run the risk of hitting the HTTP request quota of eight requests per storefront page. You don’t want to run into problems when shoppers load up their carts!

Asynchronous Integration

Asynchronous integration happens at a specific time. Use this strategy when real-time data views or updates are not necessary. Implement this integration using a data file or a web service/API call. Here are some examples.

Catalog imports from product information management (PIM)

Order exports to an order management system (OMS)

Customer data export to a customer relationship management (CRM) system

To implement asynchronous integrations, create a scheduled job for reusable steps or run the jobs manually to transfer data in or out of the Agentforce Commerce for B2C platform. Time these jobs at off-peak hours to improve platform performance. 

The best practice is to implement communication with third parties for file upload/download or API/web service calls using the Web Services framework.

Push or Pull

Which end initiates an integration is really important. You can push or pull the data. Here’s what you need to consider.

Method

	

Initiated by...

	

Example

Push

	

The data’s source

	

A customer relationship management (CRM) system pushes changes to customer data to Agentforce Commerce for B2C via the Data API.

Pull

	

The data’s target destination

	

Agentforce Commerce for B2C pulls an entire customer data file from a secure shell (SSH) file transfer protocol (SFTP) server.

You can integrate customer relationship management (CRM) into an application. For the initial data load, SCAPI supports bulk data operations, which can be used to perform one-time extracts or imports of CRM data into the Agentforce Commerce for B2C system. SCAPI's capabilities allow you to manage large datasets efficiently, ensuring that the initial data load is seamless.

For delta (change) updates, SCAPI can handle real-time or batch updates depending on your requirements. You can use SCAPI to push updates to the Agentforce Commerce for B2C system as they occur or schedule batch updates to synchronize data periodically. This approach ensures that your data remains up-to-date and consistent across systems.

Client-Side Versus Server-Side

Whether you choose client-side or server-side integrations depends entirely on what you are integrating. For the Agentforce Commerce for B2C platform, the client-side is the browser layer, and the B2C backend custom layer is on the server-side.

Most third-party tracking and tagging is done on the client-side. Some third-party systems provide direct client-side integration options. Examples are ratings/reviews, captcha verification, and maps integration. The client-side provides an asynchronous experience using Ajax.

Use server-side integration when you need a login/password or secret token to access a third-party service. You should also use it if you need to persist or include third-party data in search indexes, for example.

Apply Integration Principles

Applying integration principles such as loose coupling and transfer server help you deliver a more scalable and stable platform. Let's take a look.

Loose Coupling

Coupling is the degree of interdependence between software modules, and a measure of how closely connected two routines or modules are. A loosely coupled system is where each component has, or makes use of, little or no knowledge of other components. Loose coupling is good because the components of your system don’t heavily depend on each other by making assumptions about other components’ functionality. When two parts are loosely coupled, they are more independent of each other and less likely to break when the other components change.

Loose coupling provides for fault tolerance, making an integration more robust. That means you reduce the risk in one system when another system is down. With fault tolerance, you assume that any integration has the possibility of failing. To minimize risk, you determine how the integration can overcome failure situations and identify the expected impact to the shopping experience. Depending on whether or not the integration is in a critical path, your fault tolerance strategy can change.

Transfer Server

Developers use a transfer server to transfer data between Agentforce Commerce for B2C and a third party. When you use a transfer server, your files and data must be consumable by the other systems. Most implementations support multiple types of data, for example, product, customer, coupon, tax, and so on. So each integration that follows the transfer server principle must have its own process. A decoupled integration makes the entire process smoother and more maintainable. One bad transfer doesn’t break everything.

A typical transfer server is secure shell protocol (SSH) file transfer protocol (SFTP). Salesforce recommends that you use a merchant-provided SFTP server that can be configured with file retention/security and access restrictions.

What else can be a transfer server? HTTP upload download is a good candidate. You can also use a WebDAV server and other proprietary services.

Always consider PCI/PII information when storing data in files and the need for additional data encryption.

Next Steps

In this unit, you learned about the tools that help you integrate third-party systems and how to create an integration strategy. You explored how to apply best practice integration principles. Next, learn how to configure a web service in Business Manager.

Resources
Trailhead: Salesforce Commerce Cloud Architect Roles: Quick Look
Trailhead: Build Your Career as a Salesforce B2C Commerce Functional Architect
Trailhead: Salesforce B2C Commerce Client Analysis
Trailhead: Project Documentation for Salesforce B2C Commerce Functional Architects
Trailhead: Salesforce B2C Commerce Import & Export
Salesforce Help: B2C Commerce import and export schemas
Salesforce Help: SFRA
Trailhead: Salesforce B2C Commerce Scheduled Jobs
Commerce Cloud Developer: Headless/Commerce API
Salesforce Help: Open Commerce API (OCAPI)
Trailhead: Build Processes and Unit Tests for Salesforce B2C Commerce Technical Architects
