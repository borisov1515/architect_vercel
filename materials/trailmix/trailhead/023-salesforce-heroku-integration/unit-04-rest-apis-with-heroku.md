# Integrate Salesforce REST APIs with Heroku Apps

**Module:** Salesforce & Heroku Integration  
**Source:** https://trailhead.salesforce.com/content/learn/modules/salesforce_heroku_integration/rest_apis_with_heroku  
**Saved:** browser extraction (logged-in session)

---

Learning Objectives

After completing this unit, you'll be able to:

List use cases for using Salesforce REST APIs.

Describe different types of authentication.

Explain how to use the Salesforce REST APIs with apps on Heroku.

Salesforce REST APIs and Heroku

The Salesforce REST APIs provide an easy way to integrate with Salesforce through simple HTTP + JSON requests. There are REST APIs to access almost everything on Salesforce, so your custom app can do pretty much anything with the data, processes, and metadata in Salesforce. The REST APIs use OAuth for authentication, which is the standard way of handling REST authentication.

While the REST APIs can be used directly, there are numerous wrapper libraries around the APIs making them easy to use in Node.js, Python, Ruby, Java, and so on. The wrapper libraries handle low-level tasks such as authentication and request and response handling. So instead of manually constructing HTTP requests like (with Node.js as an example):

const query = 'SELECT name Account'; const url = 'https://MyDomainName.my.salesforce.com/services/data/v59.0/query/?q=' + encodeURIComponent(query); request.get(url, { 'auth': { 'bearer': 'bearerToken' } });

You can use the open-source JSForce library for Node.js and simply do:

conn.query('SELECT name FROM Account', callback);

Ultimately, the jsforce
copy library is doing the same thing under the covers, but the library makes the API easier to use.

You can build application-to-application integrations and custom user interfaces on top of the Salesforce REST APIs. The biggest difference is how authentication is handled. With an app-to-app integration, a single integration user is known by the app, and all calls to the REST APIs are done as that user. With a custom user interface, the user doesn't directly authenticate with the custom app. Instead, the user walks through the OAuth process to authorize the custom app to make API calls on its behalf. Each request to the REST APIs is done on behalf of the named user that is using the custom user interface.

One use case for an app-to-app integration is to transform, collate, and then replicate or proxy the data for another system. For instance, a customer-facing order management application running on Heroku needs to get customer information from Salesforce. This setup can use a single integration user to fetch all the necessary information from Salesforce.

However, if the order management application is for the back-office where users log in via Salesforce, the application is a custom user interface that uses OAuth to allow the order management application to make API requests on behalf of the named user. In this case, knowing which named user is making each REST call is important for security and auditing.

With Heroku, it's easy to deploy either type of application and leverage OAuth and the Salesforce REST APIs.

You can dive right into the Salesforce REST API documentation to learn the low-level APIs at your convenience.

REST API Authentication with OAuth

Authentication is a key aspect of using REST APIs, because each request to the APIs must include an authentication token or key. Whether using app-to-app integration or a custom user interface, your application needs a connected app in Salesforce to allow Salesforce to identify which application is making the requests and enable org admins to manage access to the APIs.

Single User

With an app-to-app integration, the application needs to know a single integration user’s credentials. Then a REST API can be called to log in with the credentials, which returns the authentication token.

Named Users

When building a custom user interface, the application never receives actual credentials. Instead, the OAuth process provides the application a code to obtain an authorization token. Because the user manually authorizes the application's access to Salesforce, the flow follows these steps.

User tries to visit a page that requires authentication.

The application on Heroku redirects the user to the Salesforce OAuth page.

If the application has not been previously authorized, the user is prompted.

When authorized, Salesforce redirects the user back to the application with a code.

The application uses the code to retrieve an access token and refresh token.

The application uses the access token to make REST API calls to Salesforce.

Typically, the access and refresh tokens are encrypted and stored in some form of session state or database so that the user doesn’t have to continue going through the authorization flow with each request.

Remember, these tokens are sensitive and must be handled with extreme security diligence!

Resources
Salesforce REST API Documentation
OAuth Authorization Flows
