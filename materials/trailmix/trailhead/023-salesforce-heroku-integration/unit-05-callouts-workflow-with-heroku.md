# Apex to Heroku Integration Tips for Salesforce

**Module:** Salesforce & Heroku Integration  
**Source:** https://trailhead.salesforce.com/content/learn/modules/salesforce_heroku_integration/callouts_workflow_with_heroku  
**Saved:** browser extraction (logged-in session)

---

Learning Objectives

After completing this unit, you'll be able to:

Send Apex callouts and outbound messages to Heroku.

Discuss the use cases for Apex callouts and outbound messages.

Callouts to Heroku Apps

Sometimes events on Salesforce need to be handled by an external system due to the scale or type of process being executed. For instance, a user in Salesforce uploads an image that needs to be resized for future use. Heroku can receive an event from Salesforce and perform some process in response. Optionally, the output of the process could be stored back in Salesforce using the REST APIs or Heroku Connect.

There are several methods to call a Heroku app based on an event in Salesforce: Apex HTTP callouts, outbound messages, or HTTP actions in Flow. An Apex HTTP callout programmatically makes a REST call to a Heroku app. An outbound message is an action that declaratively makes a SOAP call. Either way, the Heroku app receives a request with the event details payload and then performs the action.

Visit the Swagger / OpenAPI + Salesforce = LIKE and Simplified API Integrations with External Services blog posts for information on HTTP actions in Flow and external services.

Callouts with Apex Triggers

You can define Apex triggers on Salesforce objects to handle any of these events:

insert

update

delete

merge

upsert

undelete

The trigger can use an Apex callout to make a REST JSON call to an endpoint on a Heroku app. For instance, here is an Apex trigger that calls a Heroku app:

trigger NewContactWebhookTrigger on Contact (after insert) { String url = 'https://foo.herokuapp.com/new_contact'; String content = Webhook.jsonContent(Trigger.new, Trigger.old); Webhook.callout(url, content); }

The referenced Webhook Apex class is:

public class Webhook { public static String jsonContent(List<Object> triggerNew, List<Object> triggerOld) { String newObjects = '[]'; if (triggerNew != null) { newObjects = JSON.serialize(triggerNew); } String oldObjects = '[]'; if (triggerOld != null) { oldObjects = JSON.serialize(triggerOld); } String userId = JSON.serialize(UserInfo.getUserId()); String content = '{"new": ' + newObjects + ', "old": ' + oldObjects + ', "userId": ' + userId + '}'; return content; } @future(callout=true) public static void callout(String url, String content) { Http h = new Http(); HttpRequest req = new HttpRequest(); req.setEndpoint(url); req.setMethod('POST'); req.setHeader('Content-Type', 'application/json'); req.setBody(content); h.send(req); } }

The jsonContent method takes the trigger data and serializes it into JSON. The callout method makes the HTTP post to Heroku with the JSON payload.

As with outbound messages, you can build the Heroku app with any open-source web or REST technology. With JavaScript, Node.js, and Express, the endpoint could be defined as:

app.post("/new_contact", function(req, res) { // do something with req.body res.status(201).end(); });

In the request handler, the req.body is the deserialized JSON data sent from the Apex trigger.

With Apex triggers, you can use some form of pre-shared key to authenticate requests, avoiding the potential for malicious requests. You can also have the payload include a session ID to let the Heroku app make REST API requests back to Salesforce to fetch or update data.

To learn more about Apex callouts, see the Invoking Callouts Using Apex Salesforce documentation. Visit the Make Apex and Workflow Callouts to your API Heroku documentation to learn more about Apex integration with an external service.

Callouts with Outbound Messages

With Outbound Message actions, you declaratively define a callout to an external system and a record-triggered flow to send the callout.

To call a Heroku app when the flow executes, first create an Outbound Message action. Specify a Heroku app endpoint as the endpoint URL.

If you select Send Session ID
copy, the Heroku app can use that token to make REST API calls on the user's behalf. If you don't send the session ID. there's no way to check that the request was valid or protect against malicious calls to your Heroku app's API endpoint.

On the Heroku side, you can implement the event handler with any open-source web or REST technology. But because the message is in SOAP format, you need to be able to parse the XML. For instance, with JavaScript, Node.js, Express, and the express-xml-bodyparser library, here is an endpoint that handles an outbound message and parses the SOAP message.

app.post("/new_contact", function(req, res) { var notification = req.body["soapenv:envelope"]["soapenv:body"][0]["notifications"][0]; var sessionId = notification["sessionid"][0]; var data = {}; if (notification["notification"] !== undefined) { var sobject = notification["notification"][0]["sobject"][0]; Object.keys(sobject).forEach(function(key) { if (key.indexOf("sf:") == 0) { var newKey = key.substr(3); data[newKey] = sobject[key][0]; } }); // do something #awesome with the data and sessionId } res.status(201).end(); });

In this example, each time a contact is created, the Heroku app receives the contact details and can do whatever it needs to with the data.

After you create the Outbound Message action, create the flow that calls it. The flow can be triggered by any Salesforce object, such as Contact or Account, when one of the following occurs:

A record is created

A record is updated

A record is created or updated

A record is deleted

If you trigger the flow when a record is updated, you can specify whether the flow should trigger every time the record is updated and meets the condition requirements, or if it should trigger only when the record is updated to meet the condition requirements.

In record-triggered flows, you can set entry conditions that limit which records trigger the flow. Use this feature to specify criteria for which records send the callout.

After you configure the flow's start element, create an Action element. In the Action field, enter the Outbound Message action you created. Then give the element a Label, click Done, and save your flow. When the flow runs this element, it sends the callout defined in the Outbound Message action.

Flows can also wait for a response from Heroku. For more information, see Flow Element: Pause in Salesforce Help.

Resources
SOAP API Developer Guide: Setting Up Outbound Messaging
Salesforce Help: Outbound Message Actions
Salesforce Help: Flow Elements: Wait
Apex Developer Guide: Invoking HTTP Callouts
Trailhead: Introduction to Node.js on Heroku
JAMES WARD: Quick Start to Node.js on Heroku
