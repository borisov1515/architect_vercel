# Understanding API Specifications

**Module:** External Services  
**Source:** https://trailhead.salesforce.com/content/learn/modules/external-services/define-a-schema-for-an-external-service  
**Saved:** browser extraction (logged-in session)

---

Learning Objectives

After completing this unit, you’ll be able to:

Describe the purpose of the API spec.

Explain the elements of a supported External Services schema definition.

Name three issues that can cause your API spec to fail.

Why Do You Need a Schema Definition?

In the previous unit, you learned that an API specification is a file that contains the descriptive schema that defines what an API can do. Whether or not you’re the one who ends up creating an API spec for your External Services registration, it’s helpful to understand its purpose and how it’s used. 

Imagine you have a REST-based bank API. You need a common, standardized format to describe the structure of our bank’s REST-based API. Enter the API spec. Salesforce uses the commonly adopted OpenAPI specification for the description format. 

Your API spec contains a schema definition that describes what types of inputs and outputs you can include in the calls, or requests, that your org makes to the external web service. For example, your calls might include an ID
copy as numerical input or a name
copy as text output.

Your API spec also contains the endpoint information and authentication parameters for the REST-based API web services that you can access. (Remember that the endpoint exposes the web services resources that External Services interacts with.) For example, this API spec from a fictional bank web service includes methods for adding and deleting bank accounts: https://th-external-services.herokuapp.com/accounts/schema.

In a real-world application, following security best practices, you would include an authentication step before accessing a bank’s API.

Since your fictional bank’s API spec is human-readable, structured data, let’s take a look at it.

Here are the basic account operations of your schema.

Operations for path: /accounts/{accountName}

	

Description

GET

	

Retrieves an account

POST

	

Adds an account

PUT

	

Updates an account

DELETE

	

Deletes an account

Here’s a partial code snippet from the API spec's schema that contains information about a GET method. If you don’t know, a GET method simply retrieves resource information from a web service. This particular GET method retrieves (“gets”) information about an account using the resource path, in this case /accounts/{accountName}
copy, where {accountName}
copy is a specified account. If you look under "parameters"
copy, you can see "name":"accountName"
copy. This parameter must match the account name that you specify and is required ("required":true)
copy. It should also take the form of a string.

"paths": { "/accounts/{accountName}": { "get": { "operationId": "getAccount", "summary": "Retrieves an account", "description": "Retrieves the account with specific name", "consumes": ["text/plain"], "produces": ["application/json"], "parameters": [ { "name": "accountName", "in": "path", "required": true, "type": "string", "description": "Name of the account" } ], "responses": { "200": { "description": "The response when system finds an account with given name", "schema": { "$ref": "#/definitions/accountDetails" } }, "400": { "description": "Error response if the account name parameter is less than minimum characters", "schema": { "$ref": "#/definitions/errorModel" } }, "404": { "description": "Error response if the account is not supported by service or account is not found", "schema": { "$ref": "#/definitions/errorModel" } } } } } }

This is just one part of a much larger schema definition. But you can see that while it’s designed for consumption by External Services, it’s also human-readable. It’s also formatted in a logical way that allows External Services to process the operations so that it can surface them as invocable actions in tools like Flow Builder or Einstein Bots. 

The next steps show you how to declaratively register your API spec. But first, let’s cover the elements that make up a valid and supported schema definition, the detailed descriptions of each separate API capability contained within the API spec document.

What Makes for a Valid and Supported Schema?

So now we know what an API spec is all about. But what do we mean by a valid and supported schema? 

There are schema validation requirements that the OpenAPI specification defines, and there are specific External Services schema requirements as well. External Services can properly support your schema and call your web service when both of these requirements are met.  

A Primer on Schema Validation

Although a schema is human-readable, it must also be machine-readable. It needs to follow a logical structure so that External Services can easily consume it. An incorrectly structured schema means that the external web service can’t communicate (returns error and exception messages) and, ultimately, External Services can’t ingest it. Meeting structural, logical, and syntax sestrictions is a necessary first-pass of schema validation. The OpenAPI specification defines these general rules and takes the guesswork out of calling an external web service.

Supported External Services Schema 

In addition to general OpenAPI guidelines for schema validation, there are also schema limitations that are specific to External Services. You’ll want to review these requirements before you register your API spec with External Services. A supported schema in External Services means that both your schema is valid according to the OpenAPI specification, and it also adheres to the specific External Service requirements. For example, an API spec might fail the registration process if it exceeds the file size limitation, or exceeds the limit on total number of objects or actions.

For a list of key requirements for creating an External Services supported schema, see Salesforce Help: External Services Considerations. 

Resources
Salesforce Help: Register an External Service
Salesforce Help: External Services Considerations
External Site: Swagger Open API
Salesforce Developer: Apex Reserved Keywords
