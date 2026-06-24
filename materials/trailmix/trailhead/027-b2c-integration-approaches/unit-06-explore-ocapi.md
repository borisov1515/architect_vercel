# Learn Open Commerce API Basics

**Module:** Salesforce B2C Commerce Third-Party Integration Strategies  
**Source:** https://trailhead.salesforce.com/content/learn/modules/b2c-integration-approaches/b2c-explore-ocapi  
**Saved:** browser extraction (logged-in session)

---

Learning Objectives

After completing this unit, you’ll be able to:

Explain the functions of the OCAPI API types.

Explain how HTTP methods work.

List three functions of the client ID.

Describe the OCAPI URL schema.

Explain the function of the resource state.

What’s OCAPI?

OCAPI enables developers to work with all the resources (such as baskets, customer data, and products) that they used with the Commerce APIs, but via HTTP requests and responses. Each HTTP resource is addressed by its unique URL. Data is transported using request or header parameters, or within the request body as a JSON document with a defined structure.

OCAPI is a representational state transfer (REST) application programming interface (API) where the client initiates the transfer of representations of the server state.

OCAPI includes three types of RESTful APIs.

API type

	

Application

Shop API

	

Allows a client to interact with the system as a shop customer, an agent shopping on behalf of a customer, or a mobile app

Data API

	

Gives create/read/update/delete access to system resources such as with enterprise relationship management (ERP) or middleware

Meta API

	

Used to retrieve a formal description of the Open Commerce API, including custom attributes

Follow these steps to get started.

Learn about HTTP methods.

Get a client ID.

Review schemas.

Learn about resource states.

Configure OCAPI settings.

Use the API Explorer (credentials required) to browse the API and run test requests. Use the Salesforce documentation to understand resource details.

HTTP Methods

OCAPI accesses resources with HTTP requests and HTTP responses. Each resource is addressed by a unique URL, and includes the API version. Data is transported using request or header parameters, or within the request body as a JSON document with a defined structure. RESTful Web APIs use HTTP methods, as defined by RFC 2616. OCAPI supports these.

Method

	

Description

	

Method type

GET

	

Retrieves resources on the server. 

	

Safe: It doesn’t change the state of the server or have side effects.

DELETE

	

Removes one or more resources on the server.

	

Idempotent: Repeating a request results in the same server state as making the request just once. 

PUT

	

Creates, updates, or replaces a resource. This is for development and sandbox instances only. 

	

Idempotent

PATCH

	

Allows partial resource modification by sending a delta document. 

	

Not safe or idempotent

POST

	

Creates a new resource, overrides an HTTP method, or executes special actions that are hard to map to a RESTful request, such as a password reset.

	

Not safe or idempotent

HEAD

	

Similar to a GET, but returns headers only, and not content (body). The headers are identical to those in a GET. 

	

Safe

OPTIONS

	

Lists the supported HTTP methods for the specified URL in the Allow header. It’s not cache-able and returns no content.

	

Safe

The PUT method lets you create a resource with the identifier specified in the URL. Use POST when the identifier is provided by the server.

Take a look at OCAPI HTTP Methods for method usage details.

Override HTTP Methods

Some web frameworks, such as AJAX frameworks, support only GET and POST requests. OCAPI works around this by supporting POST requests that override the HTTP method with the DELETE, HEAD, OPTIONS, PUT, and PATCH methods. Just specify the explicit request/form parameter method with the value of the overriding method in upper case. Here’s an example.

REQUEST: POST /dw/shop/v21_10/products/123?method=DELETE HTTP/1.1 Host: example.com Accept: application/json RESPONSE: HTTP/1.1 204 NO CONTENT

You can also override a method by specifying the Agentforce Commerce for B2C HTTP header x-dw-http-method-override
copy with the value of the overriding method in upper case.

PATCH, POST, PUT with Empty Request Body

Some PATCH, POST, and PUT OCAPIs don’t require a request body. But making these calls with empty request bodies can cause problems such as HTTP 500 responses. To prevent this, provide the Content-Length request header with the value 0, as shown in this example.

REQUEST: POST /dw/shop/v21_10/sessions HTTP/1.1 Host: example.com Content-Length: 0

Take a look at the status code and faults you might see in HTTP responses in Salesforce Help.

Client ID

OCAPI requires that all client applications use a client ID. It must be appended to the URLs used to interact with OCAPI. You can’t use the same client ID for OCAPI calls and Salesforce Commerce API (SCAPI) calls. An API Client ID that’s meant for OCAPI cannot be assigned the Salesforce Commerce API
copy role.

Administrators use Account Manager to create API clients. To access Account Manager, you must have a Agentforce Commerce for B2C implementation. Here’s how to add an API client.

Open Account Manager.

Click API Client.

Click Add API Client.

Enter the client’s display name.

Enter the password twice.

Locate the organization where you want to add a client, select it, and click Add.

Click Save.

Select API Client in the left navigation menu.

Verify that the new client ID is enabled.

URL Schema

OCAPI uses a specialized schema for its URLs, where each URL consists of a base URL and an extended URL. The base URL is the same for all API requests, while the extended URL changes depending on the resource and the operation.

Base URL

The base URL structure depends on whether you are using a production or a non-production instance (staging, development, or sandbox).

Here’s the difference.

Instance 

	

Structure

Production

	https://public_domain[/s/site_id]/dw/api_type/
copy

Non-production

	https://sub_domain.demandware.net/s/site_id/dw/api_type/
copy

Here’s what the parameters mean.

Parameter

	

Description

api_type

	

shop, data, or meta

public_domain

	

The DNS name mapped to the Agentforce Commerce for B2C site, for example, www.example.com

sub_domain

	

A valid subdomain for example, https://sub_domain.demandware.net/s/site_id/dw/api_type/

site_id

	

The ID of the actual site to be used

Demandware.net

Do not use production - or development- hostnames to access OCAPI or the storefront. For example, do not use production-xxx.demandware.net or development-xxx.demandware.net. Instead, use a vanity hostname such as brand.com or www.brand.com. As of August 2022, development and production instances will automatically reject these calls.

For example, if your calls to URLs look like this: 

https://production-realm-customer.demandware.net/s/Sites-SiteName-Site/dw/shop/v20_10/product_search.

They should now look like this:

https://www.example.com/s/Sites-SiteName-Site/dw/shop/v20_10/product_search

Customers can still access Business Manager at production-realm-customer.demandware.net.

Extended URL

While the base URL provides the main OCAPI access point, you can extend it to access specific resources. Use these patterns in this order to extend the base.

Pattern

	

Addresses

base_url/version_id/resource_type
copy	

Multiple resources of a resource type

base_url/version_id/resource_type/identifier
copy	

A single resource using an identifier

base_url/version_id/resource_type/action
copy	

Resource information by specifying an action

base_url/version_id/resource_type/identifier/relationship_type
copy	

Multiple instances of dependent resources

base_url/version_id/resource_type/identifier/relationship_type/relationship_type_identifier
copy	

Information from a dependent resource by specifying an identifier

base_url/version_id/resource_type/identifier/relationship_type/action
copy	

Information from a dependent resource by specifying an action

Use only ASCII characters in the URLs. Escape reserved ASCII characters with the % notation.

Here are the parameters.

version_id: API version

resource_type: Set of data properties, relationship types, and actions

identifier: Specific resource instances

action: Operation on specific resource and relationship types

relationship_type: One-to-many relationships between resources

relationship_type_identifier: A resource type that depends on another resource type

Resource State

A resource state represents the server-side state of a specific resource such as a basket
copy or a customer
copy. It’s a string token that’s used in all the resource property information.

OCAPI exposes resource state information via the _resource_state
copy property in the response body. The response contains either a single resource state or multiple resource states when calling a collection or search resources. With body-less responses (for example, HEAD) the resource state is exposed via the x-dw-resource-state
copy response header. When a resource state is part of a client's request, OCAPI verifies it by comparing its value with the server resource state.

You can pass a resource state to any state changing method (DELETE, PATCH, POST, PUT). If no resource state is passed, the resource is overwritten, updated, or deleted without further notice based on the default HTTP method behavior. For more details on resource states, see Salesforce Help.

OCAPI Settings

You configure OCAPI settings in Business Manager, via an embedded JSON file that conforms to a certain format. Settings include client details and resource-specific permission and settings. See Salesforce Help for format details.

You can define settings and permissions for a single site or for all sites. You can override global settings for the client ID per site. Most Data API resources are organization-specific, so they support only global permissions. Settings are cached for up to three minutes until they become effective.

Here’s how to edit OCAPI settings in Business Manager.

Open Business Manager.

Select Administration > Site Development > Open Commerce API Settings.

Select the API type for the configuration: Shop or Data

Select the context for the configuration: Global (or site-specific)

In the text field, edit the JSON document.

Click Save.

Let’s Wrap It Up

In this unit, you learned how OCAPI, a RESTful API, lets you customize a Agentforce Commerce for B2C storefront via HTTP requests. All you have to do now is take the quiz and earn an awesome badge.

Resources
Salesforce Help: Add an API Client
Salesforce Help: OCAPI URL Syntax
Salesforce Help: OCAPI Resource States
Salesforce Help: OCAPI Settings
Salesforce Help: OCAPI Caching
External Link: RFC 2616 Hypertext Transfer Protocol - HTTP/1.1
