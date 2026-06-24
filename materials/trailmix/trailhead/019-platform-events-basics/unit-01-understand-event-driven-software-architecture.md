# Event-Driven Architecture Explained

**Module:** Platform Events Basics  
**Source:** https://trailhead.salesforce.com/content/learn/modules/platform_events_basics/platform_events_architecture  
**Saved:** browser extraction (logged-in session)

---

Learning Objectives

After completing this unit, you’ll be able to:

List the components of event-based software architecture.

Explain the benefits of an event-driven software architecture.

Describe use cases for the Platform Events feature.

Describe the characteristics of a platform event.

Before You Start This Module

We know you're eager to get started! But before you settle in to work through this module, you should be familiar with some concepts to be able to complete this module. 

This module shows you how you can publish platform events using Apex, REST API, flows, and processes. Also, this module shows you how to subscribe to platform events using Apex triggers, in addition to other methods. To be able to understand this module, you should be familiar with at least one of these technologies. To be able to perform the hands-on challenge in this module, you should have knowledge of Apex triggers. Here is a list of a trail and modules you can take to learn Apex.

If you don't have prior knowledge of an object-oriented programming language, take this trail: Build Apex Coding Skills trail

If you're familiar with an object-oriented programming language, check out these modules: Apex Basics & Database, Apex Triggers, and Apex Testing.

Also, familiarity with the concepts of Pub/Sub API is helpful for this module although not required. To learn about Pub/Sub API, check out the Pub/Sub API Documentation.

Understand Event-Driven Software Architecture

Has your order system shipped a package? Do your printer cartridges need replacing? Whatever you want to be notified about, the Salesforce enterprise messaging platform provides the delivery of secure and scalable custom notifications within Salesforce and from external sources. With platform events, you can monitor your systems and communicate changes to other systems.

The paradigm of event-based communication revolves around a publisher-subscriber model—a sender broadcasts a message that one or more receivers capture. It’s like radio transmission—a transmitter tower broadcasts a radio signal, and receivers get the signal if they’re tuned to the right frequency.

Much like radio transmission, event-based communication flows from the sender to the receiver. Events get sent asynchronously whether or not receivers are listening, and receivers don’t acknowledge it when they receive an event. Event-based communication takes place in real-time—or, more accurately, in near-real time. Radio waves travel at the speed of light, but event-based software and hardware systems typically have some latencies. 

In the Platform API Basics Trailhead module, we use the analogy of radar on a pirate’s ship to represent event detection. This analogy works well for the streaming of change data capture events, which are based on changes in Salesforce records. That communication model requires only a subscriber. But with platform events, there are two parties to the communication: a sender and a receiver. They are two of the components of an event-driven architecture.

Components of Event-Driven Systems

Before we go any further, let’s define some terms.

Event

A change in state that is meaningful in a business process. For example, placement of a purchase order is a meaningful event, because the order fulfillment center expects to receive a notification before processing an order.

Event message

A message that contains data about the event. Also known as an event notification. For example, an event message can be a notification about an order placement containing information about the order.

Event producer

The publisher of an event message. For example, an order placement app.

Event channel

A stream of events on which an event producer sends event messages and event consumers read those messages. For platform events, the channel is for one platform event or a custom channel that groups event messages for multiple platform events.

Event consumer

A subscriber to a channel that receives messages from the channel. For example, an order fulfillment app that is notified of new orders.

Event bus

A multitenant, multicloud event storage and delivery service based on a publish-subscribe model. The event bus enables the retrieval of stored event messages at any time during the retention window. The event bus is based on a time-ordered event log, which ensures that event messages are stored and delivered in the order that they’re received by Salesforce.

The following diagram illustrates an event-based software architecture.

Unlike request-response communication models, software architecture built on an event-driven model decouples event producers from event consumers, thereby simplifying the communication model in connected systems. No requests need to be made to a server to obtain information about a certain state. Instead, a system subscribes to an event channel and is notified whenever new states occur. Any number of consumers can receive and react to the same events. When an event occurs, systems obtain this information and can react to it in near-real time. Systems that send events and others that receive the events don’t have dependencies on each other, except for the semantics of the message content.

The Salesforce enterprise messaging platform offers the benefits of event-driven software architecture. Platform events are the event messages that your apps send and receive. They simplify the process of communicating changes and responding to them without requiring you to write complex logic. Publishers and subscribers communicate with each other through platform events. One or more subscribers can listen to the same event and carry out actions.

Say a news agency called Cloud News sends events to subscribed clients with the latest breaking news about traffic and road conditions in a mountain retreat destination. The contents of those events are not just the news items themselves but also related details such as whether a piece of news is urgent, and the location of the incident. Subscribers can receive these events and determine what actions to take based on the urgency of the news.

All this sounds good, but what are some real-world cases when you can use platform events? Of course, the use of platform events isn’t restricted to a news agency. Following are a few useful applications.

Examples of When to Use Platform Events

Let’s take a look at a few business scenarios that use platform events. In these scenarios, Salesforce and external systems communicate through platform event messages. In the first scenario, an app in Salesforce notifies external order fulfillment apps of a product shipment order. In the second scenario, an external product app notifies Salesforce of merchandise returns. The last scenario shows how event messages are used within Salesforce by using triggers.

Platform to External App: Order Fulfillment in a Vendor App

When an opportunity closes as won in Salesforce, your company has won a deal with a customer. Let’s say you use vendors to ship products associated with an opportunity. Each vendor has an external app that processes shipment orders for specific products. The external app listens to platform events. When an opportunity closes, a trigger, which is part of a product order app in Salesforce, fires and publishes a platform event message. Each vendor app is notified of the event. The vendor responsible for shipping the specific product creates the shipment.

External App to Platform App: Process Merchandise Returns in Salesforce

Let’s say someone wants to return purchased merchandise to a vendor. An external system sends merchandise return requests to Salesforce for processing. The external system publishes a platform event to alert Salesforce to the merchandise return. An event listener (a trigger) in Salesforce receives the event and performs some actions. For example, the trigger might alert the sales representative to the return, and send a confirmation email to the customer.

Platform to Platform: Reassign Lead Records

When a lead is assigned in Salesforce, a lead trigger fires and checks open opportunities and cases related to the lead owner. Based on the related records, the trigger publishes an event that is received by a Salesforce app. Based on the event information, the app reassigns the lead and creates a Chatter post.

In this scenario, you can perform the same actions using Flow Builder. But by using platform events, you benefit from an event-based programming model and a standard way of programming across your apps.

Platform Event Characteristics

Now that you have an idea of when to use platform events, let’s dive deeper into their components and characteristics.

You define the custom data that platform events contain. Just like custom objects, you define platform events in Salesforce. You create a platform event definition by giving it a name and adding custom fields. Here is a sample definition of custom fields for a news event for the Cloud News agency.

Field Label/Name

	

Field API Name

	

Field Type

Location

	

Location__c

	

Text

Length: 100

Urgent

	

Urgent__c

	

Checkbox

News Content

	

News_Content__c

	

Text Area (Long)

Platform Events and Salesforce Objects

A platform event is a special kind of Salesforce entity, similar in many ways to a Salesforce object. An event message is an instance of a platform event, similar to how a record is an instance of a Salesforce object. Unlike with records, you can’t update or delete event messages or view them in the Salesforce user interface.

You can set read and create permissions for platform events. You grant permissions to users in profiles or in permission sets.

Using Platform Events in Native and External Apps

Platform events enable the flow of event messages within Salesforce and to or from external apps. Apps on the Salesforce Platform use an Apex method to publish events and an Apex trigger or the Emp API Lightning component to consume events. As an alternative to code, you can publish events with the Flow Builder declarative tool. External apps publish events using the Pub/Sub API or the data APIs, and consume events using Pub/Sub API. As you can see, there is a lot of flexibility in how you choose to use Platform Events!

Use platform events in these cases:

To send and receive custom event data with a predefined schema

To publish or subscribe to events in Apex

For the flexibility of publishing and processing events on and off the Salesforce Platform

Another type of streaming event is a change data capture event. This event contains changes of Salesforce records for create, update, delete, and undelete operations.  For more information, see the Change Data Capture Basics Trailhead module.

In the next unit, we go over defining a platform event and publishing events.

Resources

Salesforce: Platform Events Developer Guide

Trailhead: Platform API Basics

Trailhead: Change Data Capture Basics

Salesforce: Pub/Sub API Documentation

Salesforce: Apex Developer Guide

Salesforce: Component Reference: Emp API Lightning Web Component
