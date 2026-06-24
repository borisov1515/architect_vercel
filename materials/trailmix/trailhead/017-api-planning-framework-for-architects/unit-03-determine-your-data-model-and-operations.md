# Data Modeling & API Operations Guide

**Module:** API Planning Framework for Architects  
**Source:** https://trailhead.salesforce.com/content/learn/modules/design-with-the-right-api/dwapi-3  
**Saved:** browser extraction (logged-in session)

---

Learning Objectives

After completing this unit, you’ll be able to: 

Explain the importance of object relationships in data modeling.

Explain what operations are and how they’re important to your API.

Intro

Now that you’ve learned how to incorporate the different types of user experiences into planning your project design, let’s start mapping your data model structure. In this unit, you also learn how relationships play a key role in database operations. 

Identify Your Objects and Fields

Before you begin to explore the data model structure, you must identify the objects and the data types your project needs. When you build an object and create fields in Salesforce, you’re defining the metadata (the data about data). This metadata tells the system about how data is stored, processed, and related to other metadata. Metadata in your org makes up only part of the data modeling structure for your project. 

Start data modeling by writing down what objects, fields, and data types you need for your project. If you know some of the objects referenced in your design are already in your org, go to Object Manager from setup to get a complete overview of objects and their fields. Or use one of the APIs to make an endpoint call. 

Consider the following questions to determine what you’ll need for your project.  

Are any objects and fields from non-Salesforce systems included in your solution?

What objects and field types will you need for your data?

What are the key identifiers for each of the objects?

Now that you’ve identified the objects and fields, it’s time to define their relationship.

Why Relationships Matter

The metadata about objects and fields plays a vital role in determining how data flows through your project. When you create certain fields in Salesforce, you’ll build the relationships between the objects automatically. These fields are called master-detail, indirect lookup, external lookup, and lookup. They create the one to one (1:1), one-to-many (1:N), and many-to-many (N:N) relationships in Salesforce. 

The relationships between your objects determine the data structure and how data is processed. Consider the following questions to help determine the relationship between your objects. 

How will records across your objects be created?

What are the relationships between the objects already in the system?

Are there dependencies between the objects?

Define Your Data Model

Data modeling determines the overall structure and relationships between tables and systems. The data modeling map is to help you understand what’s possible for your solution. Your data modeling structure shows what’s happening with the data at each level in the database and helps you easily identify your data load. Knowing these factors helps you determine which API resource is better for your project as you scale the design. 

Consider these questions when defining your data model structure.

How will the data be maintained as the project scales?

What type of reporting and analytics will you need?

How will this data be collected and processed across the system?

Begin Data Modeling 

Take a moment to draw your data model. At this stage, it doesn’t matter if you’re using a fancy mapping tool or a piece of paper. The goal is to map the architecture and define how data flows throughout your solution. As you map your data model and begin to identify the operations you want to execute, consider asking, “Is there an API for that?” 

You can get a real-time visual on your objects and their relationships in Salesforce by checking out schema builder. In the Data Modeling module, you learn that the schema builder tool generates a visualization that shows the relationships between objects and fields. You access Schema Builder from setup by typing in Schema Builder
copy in the Quick Find box, then selecting Schema Builder. 

Now that you’ve got your data model structure, you need to identify the operations your project will execute. 

Identify the Operations

Salesforce APIs are well-designed and reusable resources with built-in functionality right out of the box. Meaning, their functionality makes it possible to execute different operations on the objects in your project design. Think of operations as transactions that can modify data in your objects. The API you choose determines how you interact with those objects. For example, records can be created, inserted, updated, or even deleted. Both SOAP API and REST API support these common operations however the implementation of these APIs are different from one another. SOAP API supports data in XML, whereas REST API supports data in both XML and JSON. 

The Right API for the Operation

Before you select an API to perform an operation, you first need to determine what you’re trying to do with your data and how the API operates within your system. Consider the following questions to help you determine what you’re doing with your data. 

What is the source of truth for data structures?

What volume of data are you working with?

What direction is the data flowing as the end user consumes your solution?

What data is being written to the database and at what time?

Now that you’ve determined what you’re wanting to do with your data, consider these next questions to help you determine what type of operation you’re needing from an API. 

How many records will the operation execute on?

Should the operation run in a synchronous or an asynchronous mode?

Should operations execute individually, in a batch, or in a bulk workload?

What happens when the transactions the operation executes fails?

How does the execution and performance of these operations impact the end user experience?

At this stage, you’re only gathering information on which API resource can perform the operation(s) you’re looking for. Identifying the operation and the user experience you’re designing for helps narrow down the API options. 

You've started mapping your data modeling architecture and thinking about the operations your project needs. In the next unit, we focus on designing your solution for growth and scale.  

Resources 
Salesforce Help: Considerations for Object Relationships
Salesforce Help: Object Relationships Overview
Salesforce Help: Design Your Own Data Model with Schema Builder
Salesforce Developers Documentation: About REST API
Salesforce Developers Documentation: Core Calls
Salesforce Developers Documentation: APIs and Integration
