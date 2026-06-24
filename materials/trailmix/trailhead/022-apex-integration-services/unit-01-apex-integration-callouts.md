# Improve Apex HTTP & SOAP Integration Skills

**Module:** Apex Integration Services  
**Source:** https://trailhead.salesforce.com/content/learn/modules/apex_integration_services/apex_integration_callouts  
**Saved:** browser extraction (logged-in session)

---

Learning Objectives

After completing this module, you will be able to:

Describe the differences between web service and HTTP callouts.

Authorize an external site with remote site settings.

Make Callouts to External Services from Apex

An Apex callout enables you to tightly integrate your Apex code with an external service. The callout makes a call to an external web service or sends an HTTP request from Apex code, and then receives the response.

Apex callouts come in two flavors.

Web service callouts to SOAP web services use XML, and typically require a WSDL document for code generation.

HTTP callouts to services typically use REST with JSON.

These two types of callouts are similar in terms of sending a request to a service and receiving a response. But while WSDL-based callouts apply to SOAP Web services, HTTP callouts can be used with any HTTP service, either SOAP or REST.

So you are probably asking yourself right now, “Which one should I use?” Whenever possible, use an HTTP service. These services are typically easier to interact with, require much less code, and utilize easily readable JSON. All the “cool kids” have been switching to REST services over the last couple of years, but that's not to say that SOAP Web services are bad. They've been around forever (in Internet years) and are commonly used for enterprise applications. They are not going away anytime soon. You'll probably use SOAP mostly when integrating with legacy applications or for transactions that require a formal exchange format or stateful operations. In this module we'll touch on SOAP, but will spend most of our time on REST.

Follow Along with Trail Together

Want to follow along with an expert as you work through this step? Take a look at this video, part of the Trail Together series on Trailhead Live. You can find a link to the full session in the Resources section. 

Authorize Endpoint Addresses

We love security at Salesforce! So, any time you make a callout to an external site we want to make sure that it is authorized. We can't have code calling out willy-nilly to any endpoint without prior approval. Before you start working with callouts, update the list of approved sites for your org on the Remote Site Settings page.

We'll be using the following endpoints in this module, so go ahead and add them now. If you forget to add an endpoint, trust me, you'll get a reminder when you try to run your code. We'll be making calls to the following sites.

https://th-apex-http-callout.herokuapp.com

https://th-apex-soap-service.herokuapp.com

Authorize both of these endpoint URLs by following these steps.

From Setup, enter Remote Site Settings
copy in the Quick Find box, then click Remote Site Settings.

Click New Remote Site.

For the remote site name, enter animals_http
copy.

For the remote site URL, enter https://th-apex-http-callout.herokuapp.com
copy.
This URL authorizes all subfolders for the endpoint, like https://th-apex-http-callout.herokuapp.com/path1 and https://th-apex-http-callout.herokuapp.com/path2.

For the description, enter Trailhead animal service: HTTP
copy.

Click Save & New.

For the second remote site name, enter animals_soap
copy.

For the remote site URL, enter https://th-apex-soap-service.herokuapp.com
copy.

For the description, enter Trailhead animal service: SOAP
copy.

Click Save.

Resources
AWS: What is the Difference Between SOAP and REST?
