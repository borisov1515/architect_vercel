# API Planning Framework for Agile Development

**Module:** API Planning Framework for Architects  
**Source:** https://trailhead.salesforce.com/content/learn/modules/design-with-the-right-api/dwapi-1  
**Saved:** browser extraction (logged-in session)

---

Learning Objectives

After completing this unit, you’ll be able to: 

Explain the benefits of using the API planning framework.

Identify the five elements that make up the API planning framework.

Before Getting Started

Before you complete any steps shown in this module, make sure you complete the following badges:

Platform API Basics

API Basics

In this module, you build upon the knowledge of Salesforce Application Programming Interfaces (APIs) and the Application Lifecycle Management (ALM) process by learning how to structure your planning with the API planning framework in mind.

A World of APIs

For over a decade, APIs have changed how engineers design and develop software across every industry. Development teams create and deliver solutions faster by using any open APIs available. Salesforce APIs are no different. For example, in the Platform API Basics module you learn how to use REST API, SOAP API, Bulk API, and Pub/Sub API to manipulate data. REST API alone has over 40 top-level resources available, and each one represents its own set of Salesforce capabilities. 

Before you opt to use a Salesforce API or start development, you need a good software design plan. In this module, you learn how to use the API planning framework to help you design a scalable solution and choose the right API from the start.

Give Your Planning Structure

Building performant, scalable, and secure solutions requires careful planning and consideration. During the planning phase of the ALM process, you create a development plan for your project. You might start by identifying the technical tools that would interact with your project to include workflows, integration systems, or APIs used. Before you start exploring these tools, it’s important to give your planning some structure.

You can optimize Salesforce APIs for different use cases and workflows of various levels of complexities. So, how do you decide which one to use and at what point in your project? To help show you how to apply the API planning framework, we use Salesforce CRM APIs in these examples:

API NAME

	

PROTOCOL

	

DATA FORMAT

	

COMMUNICATION

REST API

	

REST

	

JSON, XML

	

Synchronous

SOAP API

	

SOAP (WSDL)

	

XML

	

Synchronous

Chatter REST API

	

REST

	

JSON, XML

	

Synchronous (photos are processed asynchronously)

User Interface API

	

REST

	

JSON

	

Synchronous

Analytics REST API

	

REST

	

JSON, XML

	

Synchronous

Bulk API

	

REST

	

CSV, JSON, XML

	

Asynchronous

Bulk API 2.0 (use instead of Bulk API for a streamlined workflow, simplified limits, and to align with future innovation)

	

REST

	

CSV

	

Asynchronous

Metadata API

	

SOAP (WSDL)

	

XML

	

Asynchronous

Pub/Sub API (which includes Platform Events and Change Data Capture Events)

	

gRPC and protocol buffers

	

Binary

	

Asynchronous (stream of data)

Apex REST API

	

REST

	

JSON, XML, Custom

	

Synchronous

Apex SOAP API

	

SOAP (WSDL)

	

XML

	

Synchronous

Tooling API

	

REST or SOAP (WSDL)

	

JSON, XML, Custom

	

Synchronous

Get the most out of the APIs capabilities and keep your resource budget under control by planning with the right lens. 

Benefits of Using the Right API

With so many APIs to choose from, selecting a well-suited API for your project is challenging, but necessary. Using an API that’s not ideal for your software design can result in writing more code than needed, or worse, burn through more resources than necessary. When this happens, you can’t get the most out of your tools, and it results in end users having a negative experience. So you need to make sure you select an API that’s flexible enough to accommodate your design as it changes and scales. There are many variables to consider and think about as your project grows.

Bring Structure to the Planning Phase

In the ALM planning phase, you gather requirements and define the scope of the project. You map the architecture design, develop the integration strategy, and identify technical tools needed such as APIs. You do these activities with the development and deployment phase in mind. To better enhance your planning and help you navigate through the API landscape, you need an API planning framework to help. 

API Planning Framework

There are five elements that make up the API planning framework. This framework helps you determine the right API tool to use at the right time, which positions you to design a more scalable solution.

User experience: What is the end user experience? What tools does a developer need?

Objects and records: What data are you working with?

Operations: What are you trying to do with the data?

Growth and scale: How does your integration scale with the growth of your dataset?

API limits and allocations: How many API resources are your resources using?

In the coming units, we discuss each of these in greater detail. First up, let’s talk about the user experience. 

Resources 
Salesforce Developers Documentation: APIs and Integration
