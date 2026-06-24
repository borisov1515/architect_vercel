# Boosting Apex Web Services Integration

**Module:** Apex Integration Services  
**Source:** https://trailhead.salesforce.com/content/learn/modules/apex_integration_services/apex_integration_webservices  
**Saved:** browser extraction (logged-in session)

---

Learning Objectives

After completing this module, you'll be able to:

Describe the two types of Apex web services and provide a high-level overview of these services.

Create an Apex REST class that contains methods for each HTTP method.

Invoke a custom Apex REST method with an endpoint.

Pass data to a custom Apex REST method by sending a request body in JSON format.

Write a test method for an Apex REST method and set properties in a test REST request.

Write a test method for an Apex REST method by calling the method with parameter values.

Follow Along with Trail Together

Want to follow along with an expert as you work through this step? Take a look at this video, part of the Trail Together series on Trailhead Live. 

(This clip starts at the 1:07:03 minute mark, in case you want to rewind and watch the beginning of the step again.)

Expose Your Apex Class as a Web Service

You can expose your Apex class methods as a REST or SOAP web service operation. By making your methods callable through the web, your external applications can integrate with Salesforce to perform all sorts of nifty operations.

For example, say your company's call center is using an internal application to manage on-premises resources. Customer support representatives are expected to use the same application to perform their daily work, including managing case records in Salesforce. By using one interface, representatives can view and update case records and access internal resources. The application calls an Apex web service class to manage Salesforce case records.

Expose a Class as a REST Service

Making your Apex class available as a REST web service is straightforward. Define your class as global, and define methods as global static. Add annotations to the class and methods. For example, this sample Apex REST class uses one method. The getRecord
copy method is a custom REST API call. It's annotated with @HttpGet
copy and is invoked for a GET request.

@RestResource(urlMapping='/Account/*') global with sharing class MyRestResource { @HttpGet global static Account getRecord() { // Add your code } }

As you can see, the class is annotated with @RestResource(urlMapping='/Account/*')
copy. The base endpoint for Apex REST is https://MyDomain.my.salesforce.com/services/apexrest/. The URL mapping is appended to the base endpoint to form the endpoint for your REST service. In the class example, the REST endpoint is https://MyDomain.my.salesforce.com/services/apexrest/. For your org, it could look something like, https://MyDomain.my.salesforce.com/services/apexrest/Account/*.

In this module when you see “MyDomain” in links or code be sure to change it out with your Salesforce Org My Domain.

The URL mapping is case-sensitive and can contain a wildcard character (*).

Define each exposed method as global static
copy and add an annotation to associate it with an HTTP method. The following annotations are available. You can use each annotation only once in each Apex class.

Annotation

	

Action

	

Details

@HttpGet
copy	

Read

	

Reads or retrieves records.

@HttpPost
copy	

Create

	

Creates records.

@HttpDelete
copy	

Delete

	

Deletes records.

@HttpPut
copy	

Upsert

	

Typically used to update existing records or create records.

@HttpPatch
copy	

Update

	

Typically used to update fields in existing records.

Expose a Class as a SOAP Service

Making your Apex class available as a SOAP web service is as easy as with REST. Define your class as global
copy. Add the webservice
copy keyword and the static
copy definition modifier to each method you want to expose. The webservice
copy keyword provides global access to the method it is added to.

For example, here's a sample class with one method. The getRecord
copy method is a custom SOAP API call that returns an Account record.

global with sharing class MySOAPWebService { webservice static Account getRecord(String id) { // Add your code } }

The external application can call your custom Apex methods as web service operations by consuming the class WSDL file. Generate this WSDL for your class from the class detail page, accessed from the Apex Classes page in Setup. You typically send the WSDL file to third-party developers (or use it yourself) to write integrations for your web service.

Because platform security is a first-class Salesforce citizen, your web service requires authentication. In addition to the Apex class WSDL, external applications must use either the Enterprise WSDL or the Partner WSDL for login functionality.

Apex REST Walkthrough

Now the fun stuff. The next few steps walk you through the process of building an Apex REST service. First, you create the Apex class that is exposed as a REST service. Then you try calling a few methods from a client, and finally write unit tests. There's quite a bit of code, but it will be worth the effort!

Your Apex class manages case records. The class contains five methods, and each method corresponds to an HTTP method. For example, when the client application invokes a REST call for the GET HTTP method, the getCaseById
copy method is invoked.

Because the class is defined with a URL mapping of /Cases/*
copy, the endpoint used to call this REST service is any URI that starts with https://MyDomain.my.salesforce.com/services/apexrest/Cases/.

We suggest that you also think about versioning your API endpoints so that you can provide upgrades in functionality without breaking existing code. You could create two classes specifying URL mappings of /Cases/v1/*
copy and /Cases/v2/*
copy to implement this functionality.

Let's get started by creating an Apex REST class.

Open the Developer Console from Setup ().

In the Developer Console, select File | New | Apex Class.

For the class name, enter CaseManager
copy and then click OK.

Replace the autogenerated code with the following class definition.

@RestResource(urlMapping='/Cases/*') global with sharing class CaseManager { @HttpGet global static Case getCaseById() { RestRequest request = RestContext.request; // grab the caseId from the end of the URL String caseId = request.requestURI.substring( request.requestURI.lastIndexOf('/')+1); Case result = [SELECT CaseNumber,Subject,Status,Origin,Priority FROM Case WHERE Id = :caseId]; return result; } @HttpPost global static ID createCase(String subject, String status, String origin, String priority) { Case thisCase = new Case( Subject=subject, Status=status, Origin=origin, Priority=priority); insert thisCase; return thisCase.Id; } @HttpDelete global static void deleteCase() { RestRequest request = RestContext.request; String caseId = request.requestURI.substring( request.requestURI.lastIndexOf('/')+1); Case thisCase = [SELECT Id FROM Case WHERE Id = :caseId]; delete thisCase; } @HttpPut global static ID upsertCase(String subject, String status, String origin, String priority, String id) { Case thisCase = new Case( Id=id, Subject=subject, Status=status, Origin=origin, Priority=priority); // Match case by Id, if present. // Otherwise, create new case. upsert thisCase; // Return the case ID. return thisCase.Id; } @HttpPatch global static ID updateCaseFields() { RestRequest request = RestContext.request; String caseId = request.requestURI.substring( request.requestURI.lastIndexOf('/')+1); Case thisCase = [SELECT Id FROM Case WHERE Id = :caseId]; // Deserialize the JSON string into name-value pairs Map<String, Object> params = (Map<String, Object>)JSON.deserializeUntyped(request.requestbody.tostring()); // Iterate through each parameter field and value for(String fieldName : params.keySet()) { // Set the field and value on the Case sObject thisCase.put(fieldName, params.get(fieldName)); } update thisCase; return thisCase.Id; } }
Press CTRL+S to save.

Create a Record with a POST Method

Let's use the Apex REST class that you've just created and have some fun. First, we'll call the POST method to create a case record.

To invoke your REST service, you need to use a… REST client! You can use almost any REST client, such as your own API client, the cURL command-line tool, or the curl library for PHP. We'll use the Workbench tool as our REST client application.

Apex REST supports two formats for representations of resources: JSON and XML. JSON representations are passed by default in the body of a request or response, and the format is indicated by the Content-Type
copy property in the HTTP header. Since JSON is easier to read and understand than XML, this unit uses JSON exclusively. In this step, you send a case record in JSON format.

Apex REST supports OAuth 2.0 and session authentication mechanisms. In simple terms, this means that we use industry standards to keep your application and data safe. Fortunately, you can use Workbench to make testing easier. Workbench is a powerful, web-based suite of tools for administrators and developers to interact with orgs via Lightning Platform APIs. With Workbench, you use session authentication as you log in with your username and password to Salesforce. And you use the REST Explorer to call your REST service.

Navigate to https://workbench.developerforce.com/login.php.

For Environment, select Production.

Select the latest API version from the API Version drop-down.

You may need to select a different API version if the latest version has issues.

Accept the terms of service, and click Login with Salesforce.

To allow Workbench to access your information, click Allow.

Enter your login credentials and then click Log in to Salesforce.

After logging in, select utilities | REST Explorer.

Select POST.

The URL path that REST Explorer accepts is relative to the instance URL of your org. Provide only the path that is appended to the instance URL. In the relative URI input field, replace the default URI with /services/apexrest/Cases/
copy.

For the request body, insert the following JSON string representation of the object to insert.

{ "subject" : "Bigfoot Sighting!", "status" : "New", "origin" : "Phone", "priority" : "Low" }
Click Execute.
This invocation calls the method that is associated with the POST HTTP method, namely the createCase
copy method.

To view the response returned, click Show Raw Response.
The returned response looks similar to this response. The response contains the ID of the new case record. Your ID value is likely different from 50061000000t7kYAAQ
copy. Save your ID value to use in the next steps.

HTTP/1.1 200 OK Date: Wed, 07 Oct 2015 14:18:20 GMT Set-Cookie: BrowserId=F1wxIhHPQHCXp6wrvqToXA;Path=/;Domain=.salesforce.com;Expires=Sun, 06-Dec-2015 14:18:20 GMT Expires: Thu, 01 Jan 1970 00:00:00 GMT Content-Type: application/json;charset=UTF-8 Content-Encoding: gzip Transfer-Encoding: chunked "50061000000t7kYAAQ"
Retrieve Data with a Custom GET Method

By following similar steps as before, use Workbench to invoke the GET HTTP method.

In Workbench, select GET.

Enter the URI /services/apexrest/Cases/<Record ID>
copy, replacing <Record ID>
copy with the ID of the record you created in the previous step.

Click Execute. This invocation calls the method associated with the GET HTTP method, namely the getCaseById
copy method.

To view the response returned, click Show Raw Response.
The returned response looks similar to this response. The response contains the fields that the method queried for the new case record.

HTTP/1.1 200 OK Date: Wed, 07 Oct 2015 14:28:20 GMT Set-Cookie: BrowserId=j5qAnPDdRxSu8eHGqaRVLQ;Path=/;Domain=.salesforce.com;Expires=Sun, 06-Dec-2015 14:28:20 GMT Expires: Thu, 01 Jan 1970 00:00:00 GMT Content-Type: application/json;charset=UTF-8 Content-Encoding: gzip Transfer-Encoding: chunked { "attributes" : { "type" : "Case", "url" : "/services/data/v34.0/sobjects/Case/50061000000t7kYAAQ" }, "CaseNumber" : "00001026", "Subject" : "Bigfoot Sighting!", "Status" : "New", "Origin" : "Phone", "Priority" : "Low", "Id" : "50061000000t7kYAAQ" }
Update Data with a Custom PUT or PATCH Method

You can update records with the PUT or PATCH HTTP methods. The PUT method either updates the entire resource, if it exists, or creates the resource if it doesn't exist. PUT is essentially an upsert method. The PATCH method updates only the specified portions of an existing resource. In Apex, update operations update only the specified fields and don't overwrite the entire record. We'll write some Apex code to determine whether our methods update or upsert.

Update Data with the PUT Method

The upsertCase
copy method that you added to the CaseManager
copy class implements the PUT action. This method is included here for your reference. The method uses the built-in upsert
copy Apex DML method to either create or overwrite case record fields by matching the ID value. If an ID is sent in the body of the request, the case sObject is populated with it. Otherwise, the case sObject is created without an ID. The upsert
copy method is invoked with the populated case sObject, and the DML statement does the rest. Voila!

@HttpPut global static ID upsertCase(String subject, String status, String origin, String priority, String id) { Case thisCase = new Case( Id=id, Subject=subject, Status=status, Origin=origin, Priority=priority); // Match case by Id, if present. // Otherwise, create new case. upsert thisCase; // Return the case ID. return thisCase.Id; }

To invoke the PUT method:

In Workbench REST Explorer, select PUT.

For the URI, enter /services/apexrest/Cases/
copy.

The upsertCase
copy method expects the field values to be passed in the request body. Add the following for the request body, and then replace <Record ID>
copy with the ID of the case record you created earlier.

{ "id": "<Record_ID>", "status" : "Working", "subject" : "Bigfoot Sighting!", "priority" : "Medium" }

The ID field is optional. To create a case record, omit this field. In our example, you're passing this field because you want to update the case record.

Click Execute.
This request invokes the upsertCase
copy method from your REST service. The Status, Subject, and Priority fields are updated. The subject is updated, even though its value matches the old subject. Also, because the request body didn't contain a value for the Case Origin field, the origin parameter in the upsertCase
copy method is null. As a result, when the record is updated, the Origin field is cleared. To check these fields, view this record in Salesforce by navigating to https://MyDomain.my.salesforce.com/<Record ID>.

Update Data with the PATCH Method

As an alternative to the PUT method, use the PATCH method to update record fields. You can implement the PATCH method in different ways. One way is to specify parameters in the method for each field to update. For example, you can create a method to update the priority of a case with this signature: updateCasePriority(String priority)
copy. To update multiple fields, you can list all the desired fields as parameters.

Another approach that provides more flexibility is to pass the fields as JSON name/value pairs in the request body. That way the method can accept an arbitrary number of parameters, and the parameters aren't fixed in the method's signature. Another advantage of this approach is that no field is accidentally cleared because of not being included in the JSON string. The updateCaseFields
copy method that you added to the CaseManager
copy class uses this second approach. This method deserialize the JSON string from the request body into a map of name/value pairs and uses the sObject put
copy method to set the fields.

@HttpPatch global static ID updateCaseFields() { RestRequest request = RestContext.request; String caseId = request.requestURI.substring( request.requestURI.lastIndexOf('/')+1); Case thisCase = [SELECT Id FROM Case WHERE Id = :caseId]; // Deserialize the JSON string into name-value pairs Map<String, Object> params = (Map<String, Object>)JSON.deserializeUntyped(request.requestbody.tostring()); // Iterate through each parameter field and value for(String fieldName : params.keySet()) { // Set the field and value on the Case sObject thisCase.put(fieldName, params.get(fieldName)); } update thisCase; return thisCase.Id; }

To invoke the PATCH method:

In Workbench REST Explorer, click PATCH.

For the URI, enter /services/apexrest/Cases/<Record ID>
copy. Replace <Record ID>
copy with the ID of the case record created earlier. Enter the following JSON in the Request Body.

{ "status" : "Escalated", "priority" : "High" }
This JSON has two field values: status and priority. The updateCaseFields
copy method retrieves these values from the submitted JSON and are used to specify the fields to update in the object.

Click Execute.
This request invokes the updateCaseFields
copy method in your REST service. The Status and Priority fields of the case record are updated to new values. To check these fields, view this record in Salesforce by navigating to https://MyDomain.my.salesforce.com/<Record ID>.

Test Your Apex REST Class

Testing your Apex REST class is similar to testing any other Apex class—just call the class methods by passing in parameter values and then verify the results. For methods that don't take parameters or that rely on information in the REST request, create a test REST request.

In general, here's how you test Apex REST services. To simulate a REST request, create a RestRequest
copy in the test method, and then set properties on the request as follows. You can also add params that you “pass” in the request to simulate URI parameters.

// Set up a test request RestRequest request = new RestRequest(); // Set request properties request.requestUri = 'https://MyDomain.my.salesforce.com/services/apexrest/Cases/' + recordId; request.httpMethod = 'GET'; // Set other properties, such as parameters request.params.put('status', 'Working'); // more awesome code here.... // Finally, assign the request to RestContext if used RestContext.request = request;

If the method you're testing accesses request values through RestContext
copy, assign the request to RestContext
copy to populate it (RestContext.request = request;
copy).

Now, let's save the entire class in the Developer Console and run the results.

In the Developer Console, select File | New | Apex Class.

For the class name, enter CaseManagerTest
copy and then click OK.

Replace the autogenerated code with the following class definition.

@IsTest private class CaseManagerTest { @isTest static void testGetCaseById() { Id recordId = createTestRecord(); // Set up a test request RestRequest request = new RestRequest(); request.requestUri = 'https://MyDomain.my.salesforce.com/services/apexrest/Cases/' + recordId; request.httpMethod = 'GET'; RestContext.request = request; // Call the method to test Case thisCase = CaseManager.getCaseById(); // Verify results Assert.isTrue(thisCase != null); Assert.areEqual('Test record', thisCase.Subject); } @isTest static void testCreateCase() { // Call the method to test ID thisCaseId = CaseManager.createCase( 'Ferocious chipmunk', 'New', 'Phone', 'Low'); // Verify results Assert.isTrue(thisCaseId != null); Case thisCase = [SELECT Id,Subject FROM Case WHERE Id=:thisCaseId]; Assert.isTrue(thisCase != null); Assert.areEqual(thisCase.Subject, 'Ferocious chipmunk'); } @isTest static void testDeleteCase() { Id recordId = createTestRecord(); // Set up a test request RestRequest request = new RestRequest(); request.requestUri = 'https://MyDomain.my.salesforce.com/services/apexrest/Cases/' + recordId; request.httpMethod = 'DELETE'; RestContext.request = request; // Call the method to test CaseManager.deleteCase(); // Verify record is deleted List<Case> cases = [SELECT Id FROM Case WHERE Id=:recordId]; Assert.isTrue(cases.size() == 0); } @isTest static void testUpsertCase() { // 1. Insert new record ID case1Id = CaseManager.upsertCase( 'Ferocious chipmunk', 'New', 'Phone', 'Low', null); // Verify new record was created Assert.isTrue(Case1Id != null); Case case1 = [SELECT Id,Subject FROM Case WHERE Id=:case1Id]; Assert.isTrue(case1 != null); Assert.areEqual(case1.Subject, 'Ferocious chipmunk'); // 2. Update status of existing record to Working ID case2Id = CaseManager.upsertCase( 'Ferocious chipmunk', 'Working', 'Phone', 'Low', case1Id); // Verify record was updated Assert.areEqual(case1Id, case2Id); Case case2 = [SELECT Id,Status FROM Case WHERE Id=:case2Id]; Assert.isTrue(case2 != null); Assert.areEqual(case2.Status, 'Working'); } @isTest static void testUpdateCaseFields() { Id recordId = createTestRecord(); RestRequest request = new RestRequest(); request.requestUri = 'https://MyDomain.my.salesforce.com/services/apexrest/Cases/' + recordId; request.httpMethod = 'PATCH'; request.addHeader('Content-Type', 'application/json'); request.requestBody = Blob.valueOf('{"status": "Working"}'); RestContext.request = request; // Update status of existing record to Working ID thisCaseId = CaseManager.updateCaseFields(); // Verify record was updated Assert.isTrue(thisCaseId != null); Case thisCase = [SELECT Id,Status FROM Case WHERE Id=:thisCaseId]; Assert.isTrue(thisCase != null); Assert.areEqual(thisCase.Status, 'Working'); } // Helper method static Id createTestRecord() { // Create test record Case caseTest = new Case( Subject='Test record', Status='New', Origin='Phone', Priority='Medium'); insert caseTest; return caseTest.Id; } }
Press CTRL+S to save.

Run all the tests in your org by selecting Test | Run All.

The test results display in the Tests tab. After the test execution finishes, check the CaseManager row in the Overall Code Coverage pane. It's at 100% coverage.

Tell Me More ...

Learn about supported data types and namespaces in Apex REST, Salesforce APIs, and security considerations.

Supported Data Types for Apex REST

Apex REST supports these data types for parameters and return values.

Apex primitives (excluding Object and Blob).

sObjects

Lists or maps of Apex primitives or sObjects (only maps with String keys are supported).

User-defined types that contain member variables of the types listed above.

Namespaces in Apex REST Endpoints

Apex REST methods can be used in managed and unmanaged packages. When calling Apex REST methods that are contained in a managed package, you need to include the managed package namespace in the REST call URL. For example, if the class is contained in a managed package namespace called packageNamespace
copy and the Apex REST methods use a URL mapping of /MyMethod/*
copy, the URL used via REST to call these methods would be of the form https://MyDomain.my.salesforce.com/services/apexrest/packageNamespace/MyMethod/.

Custom Apex Web Services and Salesforce APIs

Instead of using custom Apex code for REST and SOAP services, external applications can integrate with Salesforce by using Salesforce's REST and SOAP APIs. These APIs let you create, update, and delete records. However, the advantage of using Apex web services is that Apex methods can encapsulate complex logic. This logic is hidden from the consuming application. Also, the Apex class operations can be faster than making individual API calls, because fewer roundtrips are performed between the client and the Salesforce servers. With an Apex web service call, there is only one request sent, and all operations within the method are performed on the server.

Security Considerations for Apex Web Services

The security context under which Apex web service methods run differs from the security context of Salesforce APIs. Unlike Salesforce APIs, Apex web service methods run with system privileges and don't respect the user's object and field permissions. However, Apex web service methods enforce sharing rules when declared with the with sharing
copy keyword.

Resources
Apex Developer Guide: Introduction to Apex REST
Apex Developer Guide: Exposing Apex Classes as REST Web Services
Apex Developer Guide: Exposing Apex Methods as SOAP Web Services
REST API Developer Guide: Send REST Requests with cURL
Apex Developer Guide: Integration and Apex Utilities
RFC7231 - Information about HTTP 1.1 (including request methods and responses)
Wikipedia: Representational state transfer
Salesforce Developers: Connect REST API Developer Guide
cURL Documentation
