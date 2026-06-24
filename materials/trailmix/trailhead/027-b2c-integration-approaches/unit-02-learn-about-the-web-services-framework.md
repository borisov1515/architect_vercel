# Optimize Third-Party Web Service Integration

**Module:** B2C Commerce Integration Strategies  
**Source:** https://trailhead.salesforce.com/content/learn/modules/b2c-integration-approaches/b2c-learn-web-services-framework  
**Saved:** browser extraction (logged-in session)

---

Learning Objectives

After completing this unit, you’ll be able to:

List five things you can do with the Web Services framework to manage third-party integrations.

Explain the difference between rate limiting and circuit breaker.

Explain what you can do when a third-party service stops responding or responds slowly.

List the Web Services framework indicators to check when investigating poor performing web services.

List four important tips when using the Web Services framework.

Understand the Web Services Framework

The Agentforce Commerce for B2C Web Services framework offers the best defense in keeping third-party integrations up, running, and stable. Managing all the merchant’s web services in one place lets merchants handle calls to unavailable web services, cap the number of calls to a web service, analyze web service performance, and more. In the Web Services framework, you can enable or disable services, which is not possible with direct calls outside the Web Services framework.

You can also:

Enforce limits: Enforce limits that you configure, for example, on the number of calls allowed in a time interval, and limits on the number of failed calls allowed in a time interval.

Collect analytics: Review the overall status of web service calls and check for error, meantime, and available rates.

Investigate performance: Use the storefront key performance indicators (KPIs) it captures, such as page load time and the third-party service level agreements (SLAs), to determine the timeout and circuit breaker configuration.

Fine-tune these numbers based on load-testing results and peak volume integration performance.

Design fall-back scenarios for nonperforming critical services, such as tax calculations.

Here’s what the Web Services framework user interface looks like.

Fine-Tune the Implementation

Merchants can fine-tune their Agentforce Commerce for B2C implementations in several ways. They can use custom code to implement challenges to malicious site activity. They can use the Web Services framework to monitor, filter, and challenge suspicious traffic specific to their business requirements with out-of-the-box tools and recommended best practices. Here are some examples.

Best Practice

	

Description

Rate Limiting

	
Allows a maximum number of calls to a web service in a specified time period. Its timeout is similar to a circuit breaker.

The rate limit is checked prior to every invocation of the web service.

When the limit is reached, the application throws a ServiceUnavailableException.

Circuit Breaker

	
Suspends calls to a web service if a certain number of calls fail within a specified time interval.

Checks whether the limit of failed calls is reached prior to every invocation.

When the limit is reached, the application throws a ServiceUnavailableException.

Circuit breaker configurations allow the third-party to recover from a faulty situation by reducing the calls that are likely to fail.

Track Performance

Many third-party integrations are not designed for high scalability. That's where the Web Services framework comes in, with its ability to monitor each of them.

When performance degrades for an integration, for example, the Web Services framework can perform a nondisruptive failover. It wraps requests to degrading web services within guardrails such as rate limiting and the circuit breaker, as described earlier.

A third-party service can have a significant impact on a site if it stops responding or responds slowly. You can use the Web Services framework to adjust response timeouts and lock settings for individual services, or disable a service altogether. Make sure you configure timeouts for third-party service requests based on what’s typical for each. Salesforce recommends 2 seconds or less for non-checkout services, and 5 to 10 seconds or less for checkout services.

To prevent overloading database resources if a third-party integration stops working, avoid placing web services in business logic that opens a database transaction. This is a best practice!

When investigating poor performing services, review these framework indicators.

Real-time service status: View call status and the number of calls per second. Observe real-time, weekly, and daily trending. Focus on specific sites. Zoom in under the real-time trend tab to view data.

Real-time call duration: View call duration in milliseconds. Observe real-time, weekly, and daily trending.

What the Web Services Framework Supports

When you configure a web service, whether in Business Manager or programmatically, you need to do it in a way that the Web Services framework can understand. Here’s what the Web Services framework supports.

Business Manager

Configure these web services settings in Business Manager.

Profiles

Credentials

Timeouts

Rate limits

Circuit breaker

Use this for invocation.

var result = myFTPService.call(); if(result.status == 'OK') { } else { }

Programmatic Access

Access web services via the dw.svc.* package with these network features.

FTPService

HTTPService

SOAPService

Use this for service registration.

var myFTPService = LocalServiceRegistry.createService("MyFTPService", { createRequest: function(svc, params) { svc.setOperation("list", "/"); }, parseResponse : function(svc, listOutput) { } }); We take a closer look in the next few units.
Best Practices and Tips

The Web Services framework has been around for a while, which means there are lists of useful advice, best practices, and things to stay away from readily available. Here’s our list of tips. 

Manage all web services with the Web Services framework.

Configure the Web Services framework to timeout to avoid thread exhaustion.

Use the log filtering callback method to remove private or sensitive data from the log message.

Pay attention to timeouts.

Set the timeout interval higher than the average response time from the third party.

Identify critical and noncritical web services. Configure lower timeouts for noncritical services.

As a general rule, timeouts on real-time service integrations should be less than 5–10 secs. On critical paths, they should be as low as possible to ensure optimal performance and reduce the risk of thread exhaustion.

Batch integrations (executed from scheduled jobs) can have a higher timeout setting (20–30 secs).

Examine the average weekly performance, and set the optimal connection timeout on all web services. The timeout setting is mandatory.

Set values for connection timeout and circuit-breaker settings for third-party web services based on response time service level agreements (SLA) with third-party endpoint providers.

Create a backup plan for critical services. For example, if the specified third-party tax service isn't working properly, you can use the Agentforce Commerce for B2C tax calculation capabilities as a fallback.

Strategically use a circuit breaker and rate limiter on services. They can impact performance—and the shopper experience.

Use LocalServiceRegistry
copy instead of the deprecated ServiceRegistry
copy.

Configure rate-limiting based on third-party service level agreements (SLA)s.

Document each web service to make sure all services are included in planning and to help with ongoing maintenance. These details should not reside with one, or even a few people, who might not be available at a critical moment.

Discuss an integration’s expected load pattern with the third-party service provider and ensure their product can handle the load and expected response times.

Next Steps

In this unit, you learned how the Web Services framework can help manage third-party integrations by enforcing limits, collecting analytics, and tracking performance. You learned what to do when a third-party service stops responding or responds slowly, and other useful tips. 

Next, learn how to create a web service in Business Manager and programmatically.

Resources
Salesforce Help: Web Services
Trailhead: Salesforce B2C Commerce Cache for Performance & Scalability
Trailhead: Project Documentation for Salesforce B2C Commerce Technical Architects
Trailhead: Salesforce B2C Commerce Storefront Security Strategies
Trailhead: Holiday Season Readiness with Salesforce B2C Commerce
