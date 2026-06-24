# Web Service Integration Guide

**Module:** B2C Commerce Integration Strategies  
**Source:** https://trailhead.salesforce.com/content/learn/modules/b2c-integration-approaches/b2c-create-web-service  
**Saved:** browser extraction (logged-in session)

---

Learning Objectives

After completing this unit, you’ll be able to:

List the steps you can take to create a new web service.

Describe Agentforce Commerce for B2C Web Service framework best practices (timeout, circuit breaker, rate limit).

List the Business Manager configurations you must create for each web service.

Explain why web service names are important.

Explain the purpose of the service type.

Create a New Web Service

You learned about the Agentforce Commerce for B2C Web Services framework in the previous unit. Now it’s time to learn about web services and how to create them.

You can take these steps to create a new web service for Agentforce Commerce for B2C third-party integrations.

Step

	

Task

1

	

Configure a web service in Business Manager.

2

	

Code a web service.

3

	

Set up logging and troubleshoot a web service.

4

	

Get it ready to go live.

Configure a Web Service

To integrate a third-party application via a web service, specify these credentials and web service profiles in Business Manager.

Configuration

	

Description

Web service

	

Specifies the credentials and web service profile that Agentforce Commerce for B2C uses when calling a web service. It generates a ServiceConfig
copy object.

Web service credential

	

Is used for basic authentication.

Web service profile

	

Determines how Agentforce Commerce for B2C manages timeouts and rate limits for the web service. It defines how Agentforce Commerce for B2C detects and manages high numbers of requests to and responses from the service, as well as its availability. Different services with similar requirements can all use the same service profile.

When you configure a web service, you must create the credentials and profiles first. Then create the web service.

Names Are Important

When naming a service, it’s important to use an identifiable pattern, such as this: cartridge.protocol.service.operation 
copy

Here are some examples.

mycartridge.http.payment.get
copy
mycartridge.ftp.partner.getPriceList
copy

When service names contain periods, the period-delimited name segments become part of the logging hierarchy. Always include the cartridge in the name. This helps when you have multiple web service integrations, because it groups logging information and ensures unique service names.

You also need to take care when naming the prefix for the log file for your service. All logs are written in the shared log directory to a file named service-prefix-internalID-date.log
copy.

If you don’t enter a prefix, the prefix name defaults to main
copy, and the file is named service-main-serviceID-date
copy.

These are examples. You can use your own naming convention.

Create Web Service Credentials

To access Business Manager, you must have a Agentforce Commerce for B2C implementation. In this module, we assume you have the proper permissions to perform these tasks. If you don’t, that’s OK. Read along to learn how you would take these steps in a staging instance. Don't try to follow our steps in your Trailhead Playground. Agentforce Commerce for B2C isn't available in the Trailhead Playground. If you have a staging instance of Agentforce Commerce for B2C, you can try out these steps in your instance. If you don't have a staging instance, ask the site administrator if there is one that you can use.

Agentforce Commerce for B2C uses web service credentials for basic authentication. Here’s how to specify credentials.

Open Business Manager.

Select Administration > Operations > Services.

Click the Credentials tab.

Click New.

Enter a name for the credential: test.mycartridge.http.partner
copyDon’t include spaces or user/password details.

Enter the URL to the service, including the protocol. For example: http://51.134.145.10
copyTo use one service configuration for several URIs, you can extend or alter the URL using getURL
copy callback in the service registry definition.

Enter the username for the credential: s-architect
copy
Enter the password: StringliGhtd1
copyThe password is masked after you type it and can't be retrieved from Business Manager. Store the value securely elsewhere.

Click Apply.

You can skip the operation part of the service name. This lets you use the same credential for multiple operations that are executed through the same service.

Configure a Web Service Profile

The web service profile defines how Agentforce Commerce for B2C detects and manages high numbers of requests to and responses from the service and its availability. Different services with similar requirements can use the same service profile. The following Business Manager web service profile settings are considered Web Services framework best practices.

Timeout

Specify the timeout in milliseconds. This value is used for both the connection and socket timeout of any internal connection. If Agentforce Commerce for B2C receives no response within this time, it throws an error.

The total run time of a service can be longer than the timeout, as long as individual responses don't exceed it. For example, consider a 5000-ms timeout. A 4-second connection attempt, followed by reading two chunks of data at 4 seconds apiece, takes about 13 seconds total. Because none of the individual communications exceeded 5 seconds, the process does not time out.

Service Type

When you create a web service configuration in Business Manager, you must select a service type. The service type determines the underlying class used to call your web service and adds methods to those inherited from the Service class.

Type

	

Class

HTTP

	dw.net.HTTPClient
copy

HTTP Form

	dw.net.HTTPClient
copy

FTP

	dw.net.FTPClient
copy

SFTP

	dw.net.SFTPClient
copy

SOAP

	dw.ws.webReference2
copy

Generic

	

Does not wrap any class.

Circuit Breaker

Circuit breakers provide an extra level of protection on top of the default behavior. They identify when a service is unavailable and stop making calls to the web service. The best practice is to enable the circuit breaker and configure it according to the service call rate. Here’s what you can specify in Business Manager.

The number of calls that must fail to trigger the circuit breaker. You must also set a value for the Circuit Breaker Interval (ms). Otherwise, leave both fields empty.

The number of milliseconds in which the maximum number of calls can fail. You must also set a value for the Max Circuit Breaker Calls field. Otherwise, leave both fields empty.

Rate Limit

This setting limits the number of outgoing calls within a specific interval. You can specify:

The maximum number of calls that Agentforce Commerce for B2C makes for the interval.

The number of milliseconds in which Agentforce Commerce for B2C can make the maximum number of calls to the web service.

Configure a Profile

Here’s how to configure a web service profile.

Open Business Manager.

Select Administration > Operations > Services.

Click the Profiles tab.

Click New.

Enter the profile name: synchronous.storefront.profile
copy
Enter the number of milliseconds for the client connection timeout: 1,000
copy
Select Enable Circuit Breaker and enter the number of calls that must fail to trigger the circuit breaker.

Select Enable Rate Limit and enter the maximum number of calls that Agentforce Commerce for B2C makes for the rate limit interval.

Create a Web Service

Here’s how to configure a web service.

Open Business Manager.

Select Administration > Operations > Services.

Click New.

Enter a name for the service using the naming pattern: mycartridge.http.payment.get
copy
Select the service type: HTTP
The type determines the underlying class used to call the web service and adds methods to the methods inherited from the service class.

Select Enabled if the web service is available and you want to make calls to it. It isn't enabled by default.

In the Service Mode list, select one:

Select Live to make calls to a live web service.

Select Mocked to use the mocked call configured in your service registry to simulate the expected response from the web service.

Enter a prefix for the log file for this service: payment
copyThis must be at least 3 characters long.

Select Communication Log Enabled to log the data in the request and response of the web service call. If you select this, Salesforce strongly recommends using the log filtering callback methods to remove private or sensitive data from the log messages.

Select Force PRD behavior in non-production environments to prevent unfiltered communication logs from being written on non-production instances.

If you enable this on a non-production instance, communication logs are disallowed unless you configure a filter.

If you disable this on a non-production instance, communication logs are allowed regardless of whether a filter is configured.

This setting has no effect on production instances.

Select a service profile: profile-123

Select a service credential: credential-123

Next Steps

In this module, you learned how to configure a web service in Business Manager. Next, learn how to code and customize a web service for a Agentforce Commerce for B2C integration.

Resources
Salesforce Help: Web Services
Salesforce Help: Configuring Web Services in Business Manager
Salesforce Help: Code the Web Service Call
Salesforce Help: Web Service Logging and Troubleshooting
Salesforce Help: Create a Web Service Configuration
Salesforce Help: Create a Web Service Credential
Salesforce Help: Create a Web Service Profile
Salesforce Help: Service Types
