# Customize & Integrate Web Services

**Module:** Salesforce B2C Commerce Third-Party Integration Strategies  
**Source:** https://trailhead.salesforce.com/content/learn/modules/b2c-integration-approaches/b2c-code-customize-web-service  
**Saved:** browser extraction (logged-in session)

---

Learning Objectives

After completing this unit, you’ll be able to:

Describe what a web service script does.

List what you need to do to implement SOAP or WS-Security.

Explain what you need to do when creating a controller for a web service.

List what an admin needs to do before a web service goes live.

Describe what the webreference2
copy call does.

How Do I Customize a Web Service?

Agentforce Commerce for B2C developers can go beyond configuring a web service in Business Manager for third-party integration. They can also create custom code that interacts directly with a web service via the Salesforce B2C Headless/Commerce APIs.

To customize a web service, you can:

Create a script using a pipeline or a controller.

Implement SOAP or WS-Security.

Create a custom attribute.

Use a Web Reference.

Create a Script

Business Manager is still an important part of configuring a web service. The general approach to coding a web service for a Agentforce Commerce for B2C storefront is to write a script for a RESTful web service and to store credentials or certificates in Business Manager.

The web service script’s job is to:

Get service objects from the registry.

Provide input parameters for the createRequest callback used to construct the URL to call the web service.

Provide error handling based on the result of the web service call.

Handle the output of the service and prepare it for rendering.

Use the ViewData object for controllers.

Implement SOAP or WS-Security

If you’re implementing a SOAP web service or require Web Services Security (WS-Security) features, write a script that uses the dw.ws package
copy class to implement web services. In this case, you must store certificates in the cartridge.

Web Services Security is an extension to SOAP to apply security to web services. It is a member of the web service specifications published by OASIS.

Create a Script

Your web service script needs to import the dw.svc
copy package.

Use LocalServiceRegistry.createService
copy to create a service object. Your script can modify or extend the service object. You can also include business logic to control the parameters used to invoke the web service.

Use service.call
copy to invoke the web service.

When the service is invoked, the Web Services framework checks the circuit breaker and rate limiter. If either the circuit breaker or rate limiter are triggered, then no call is made and the appropriate errors are logged. If neither are triggered, then the callback methods in the service instance are executed, and the dw.svc.Result
copy object is stored in the service.

When you create a controller for a web service, make sure you include error handling and render the results of the web service call.

Example: Simple FTP Service Call

Here’s an example of a simple FTP service call using pipelines. This call must run in a job context because the api.dw.net.FTPClient() quota prevents usage of FTP service calls in a storefront context.

In this example, the operation invoked for the web service is determined by an input variable passed from the pipeline. In the dictionary bindings for the script node, the numCalls
copy variable is bound to CurrentHttpParameterMap.numCalls.stringValue
copy and the testType
copy variable is bound to CurrentHttpParameterMap.testType.stringValue
copy.

/** *  testFTPClient.ds * *   @input testType : String *   @input numCalls : String *   @output svcConfig : dw.svc.Service *   @output ftpResult : dw.svc.Result * */ importPackage(dw.util); importPackage(dw.svc); importPackage(dw.net); importPackage(dw.io); function execute(args: PipelineDictionary): Number { var service: Service; var result: Result; var counter = args.numCalls; var mockCall = false; var pipelineError = false; var callTestFTP = LocalServiceRegistry.createService("test.ftp", { mockCall: function(svc: FTPService, params) { return [{ "name": "testfile1", "timestamp": new Date(2011, 02, 21) }, { "name": "testfile2", "timestamp": new Date(2012, 02, 21) }, { "name": "testfile3", "timestamp": new Date(2013, 02, 21) } ]; }, createRequest: function(svc: FTPService, args) { return svc; }, parseResponse: function(svc: FTPService, result: Array) { var ret: Array = []; for (var i = 0; i < result.length; i++) { ret.push(result[i].name); } ret.sort(); return ret; } }); // Execute the request on the service configuration function makeCall(svcConfig: Service, params: Object) { if (counter == null) { counter = 1; } while (counter != 0) { if (mockCall) { result = service.setMock().call(params); } else if (pipelineError) { result = service.setThrowOnError().call(params); } else { result = service.call(params); } counter--; } // Set pdict out values args.svcConfig = service; args.ftpResult = result; } switch (args.testType) { case "LIST": service = callTestFTP; service.setOperation("list"); break; case "CD": service = callTestFTP; service.setOperation("cd", "/"); break; case "MKDIR": service = callTestFTP; service.setOperation("mkdir", "test"); break; case "DELETE": service = callTestFTP; service.setOperation("del", "test"); break; } makeCall(service); if (result == null || service == null) { return PIPELET_ERROR; } return PIPELET_NEXT; }
Create a Custom Attribute

You can customize web service configurations, credentials, and profiles by adding a custom attribute to the respective system object—for example, when adding a custom string attribute to the ServiceConfig object that’s used to provide a path to a mock data file. You can use this later when the service is set to run in mock mode to have the mock response taken from this data file.

When you add custom attributes to an attribute group, you can edit them in Business Manager. 

Take these steps, for example, to add system object attributes.

Open Business Manager.

Select Administration > Site Development > System Object Types.

Click the name of the object you want to edit: ServiceConfig, ServiceCredential, or ServiceProfile.

Click the Attribute Definitions tab.

Click New.

Enter a unique ID, display name, and value type.

If you change the language or type, you must confirm the change before it's applied. Click Apply.

Add information for the fields required by the data type you selected and click Apply.

The developer can now code a web service using this new attribute.

Use a Web Reference

A web reference enables a project to consume one or more XML web services using an internet protocol such as SOAP or HTTP. In the Agentforce Commerce for B2C world, that means you can implement a web reference via a webreference2
copy call.

The webreference2
copy class, within the Salesforce B2C Commerce APIs, represents a web service defined in a web service description language (WSDL) file. The implementation is backed by a JAX-WS framework. It does not support RPC/encoded WSDLs, which must be migrated to a supported encoding such as document/literal to work with the API.

Remote procedure call (RPC) encoding is the popular combination of message style and encoding option for most RPC web services.

To create an instance of a webreference2
copy:

Save a web service WSDL file in the webreference2
copy directory.

Reference the WSDL file in a Agentforce Commerce for B2C script.

Request the service port using a get service
copy method.

For example, if your WSDL file is MyWSDL.wsdl, here’s how you create an instance of webreference2
copy and access the port.

 var webref = webreference2.MyWSDL; var port = webref.getDefaultService();

Here are the supported standards per implementation. 

Web Reference

	

Supported Standards

webreference2

	
SOAP 1.1 and SOAP 1.2

WSDL 1.1

Apache CXF

JAX-WS for all features except WS-addressing, attachments, or asynchronous calls

HTTPS 1.0 and 1.1

dw.ws - webservice2

Go Live: Before and After

Before the site goes live, make sure the site admin follows these steps for each system.

Configure credentials, private keys, and certificates on the development and production instance. These can't be imported or exported and must be manually created on each instance.

Use code replication to push code to the development and production instance.

Import the service, profile, and credential configurations into the development and production instances.

After your web service is live, make sure you view the generated logs in Business Manager (Administration > Site Development), to see what’s happening.

The log file name for a web service always starts with service
copy then the log prefix set in the web service profile, and then internal information. For example: service-logprefix-blade2-4-appserver-20150206.log 
copy

Agentforce Commerce for B2C logs messages to a custom log category with the following format:

service.serviceName.type

Type is one of the following.

Type

	

Description

head

	

After every service call, logs a message indicating success or failure.

comm

	

After every service call, logs data passed to the underlying transport and the response received from it. Communication logs are disabled by default and log at the INFO level when enabled. See Web Service Logging and Troubleshooting for details.

log

	

 Logs miscellaneous messages, such as service initialization and error traces.

Track all web services with the Web Services framework. As the technical architect, nothing should escape your view!

Next Steps

In this unit, you learned all about web services: how to customize them, what they do, and how they work. You also learned about the webreference2
copy call. Next, learn how to ensure integration security.

Resources
Commerce Cloud Developer Center: Salesforce B2C Headless/Commerce APIs
Salesforce Help: Salesforce B2C Commerce APIs
External Link: OASIS Web Services Security (WSS) TC
Trailhead: Salesforce B2C Commerce for Developers
Salesforce Help: Creating System Object Attribute Definitions
Salesforce Help: Code the Web Service Call
Salesforce Help: Web Service Logging and Troubleshooting
External Link: IBM Documentation: WSDL styles
Salesforce Help: Pipeline to Controller Conversion
