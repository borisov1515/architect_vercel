# Integrating Systems & Building an Application Network

**Module:** API Lifecycle Management with Anypoint Platform  
**Source:** https://trailhead.salesforce.com/content/learn/modules/mulesoft-basics/integrate-systems  
**Saved:** browser extraction (logged-in session)

---

Learning Objectives

After completing this unit, you’ll be able to:

Explain how Salesforce and MuleSoft work together.

Describe valid business use cases for Salesforce and MuleSoft.

Explain why designing with an API-led connectivity approach is a best practice.

Now that you know the benefits of API-led connectivity, let's see it in action.

The Cloud Kicks Success Story

Congratulations! You are the founder and CEO of an exciting company, Cloud Kicks. Cloud Kicks makes stylish and comfortable custom sneakers, designed and personalized for your customers. Your company’s custom sneakers are a hit with celebrities, professional athletes, and people who attend a certain popular tech conference in San Francisco.

Cloud Kicks sells to consumers and businesses alike, and is expanding its base of operations. With that expansion comes some IT challenges. Let's begin by looking at some of the systems that Cloud Kicks uses to run the business:

System

	

Business Value

Sales Cloud

	

B2B and B2C sales management

SAP Commerce

	

Order management

Service Cloud

	

Customer support management

Experience Cloud

	

Customer experience management

Gmail

	

Email automation

Using these systems without any serious integration was fine when Cloud Kicks was really small. Syncing data between systems could be done manually. Pulling together reports was as simple as calling across the office or emailing spreadsheets back and forth.

But as Cloud Kicks expands, all of that needs to change. Mary Evans, the company's business process architect (and new Integration Trailblazer), knows that the current processes aren't scalable. The company needs to fix this. Before we dig into the requirements, let's meet Mary and the other key players associated with Cloud Kicks:

Mary Evans, Business Process Architect for Cloud Kicks. She makes sure that the team follows Agile methodologies to complete projects on time. An enthusiastic lifelong learner, Mary loves using Trailhead to figure out how the Sales Cloud, Service Cloud, and Experience Cloud work. Her current focus is to unify order fulfillment and customer order history to process and fulfill customer orders, which currently live in separate systems.

Jamal Cooks, IT Systems Architect, has worked with many major systems and databases throughout his 20 year career: Siebel, Oracle, Dynamics, SAP, and of course, Salesforce. While he can code with the best of them, Jamal is truly passionate about architecting solutions for the entire IT department. There's something about getting lots of systems to work together harmoniously that gets him up every morning. Excited to build something from the ground up, Jamal joined Cloud Kicks shortly after its founding. He is known as the number one technology guru around the office. His current focus is unlocking customer order information from source systems to support business requirements as Cloud Kicks scales.

Vijay Lahiri, Developer. At 26 years of age, Vijay is already quite skilled in JavaScript, HTML, Python, Ruby, and AWS. He is a one-man show for Cloud Kicks coding needs. He was hired shortly after Jamal, the IT systems architect. The two work very well together, laying the foundation for the company's lean and mean IT department. Currently, his focus is on mobile and web application development, including integration needs for mobile and web apps.

To make the processes scalable, Cloud Kicks has come up with a connected customer initiative. The latest customer data should be available and reportable by any Salesforce user in real time, including:

Current orders

Past orders

Surrent customer issues (cases)

Past customer issues (cases)

Customers should also be able to access this information for themselves as well whenever they log in to the Experience Cloud site.

How Can Cloud Kicks Meet This Demand for Connected Data?

To meet the demand for connected data, Cloud Kicks has a few options. Let’s compare what happens if the team tries building tightly coupled integrations with custom code versus if they build an application network.

Tightly Coupled Integrations

Tempted to finish the project as quickly as possible, the Cloud Kicks team decides to create some tightly coupled integrations with custom code to get everything up and running. Since every system needs access to all of the data, everything has to be connected to everything else.

There are few enough systems that the number of connections required doesn't present a problem. Furthermore, there are some coding ninjas on the team who can make short work of it. The leadership team is pleased that it's up and running so quickly. So Jamal, Mary, and Vijay swiftly complete their work and everyone is happy...for a few weeks.

TWith easy access to customer data, the marketing team increases leads in the sales pipeline. Cloud Kicks opens a few brick-and-mortar locations and deploys a street team to do demos. Management wants to reinvest some of that increased revenue into new marketing technologies as well. The company now needs to integrate the point-of-sale (POS) system from the storefronts, the street team event management app, and the new marketing software into the existing application network.

Ass the change requests pile up, Jamal the Systems Architect and Vijay the developer start falling behind on their tasks. In the past, Jamal would create some new fields, and Vijay could quickly change the web form or mobile app to capture new information. Now it's not so simple. Each new database entity requires the custom integration code to be rewritten, tested, and deployed. Instead of hours, minor changes now take days, sometimes weeks.

TWith the technical debt mounting, Vijay and Mary are concerned about the business with no real solution in sight.

Yikes!! This isn't working out too well. Let's hop in the time machine, head back, and make a different choice...

APP-led Connectivity

Before they get their systems up and running, the Cloud Kicks team splits up to do some research on the latest and greatest integration best practices. When they reconvene, Mary, our resident Integration Trailblazer, tells everyone about MuleSoft and something called API-led connectivity. Though it requires more thoughtful design up front, Mary explains, this approach scales with the business. Rather than connect each system individually, the API-led connectivity approach will build and organize integrations into three tiers of APIs, creating an application network.

The three tiers of APIs align with the respective responsibilities of Jamal, Mary, and Vijay. 

Sales and service data from Salesforce, SAP, and the Gmail app each have their own System API, which Jamal builds and maintains.

Those System APIs aggregate into two Process APIs called the Customer Orders API and the Order Fulfillment API, which Mary is responsible for.

Three Experience APIs, one for mobile, one for web, and one for customer service take customer order and order fulfillment data and deliver them to the right end systems. These are owned by Vijay.

The team designs the application network, constructs their APIs, and everyone is happy.

With easy access to customer data, the marketing team increases leads in the sales pipeline. Cloud Kicks opens a few brick-and-mortar locations and deploys a street team to do demos. Management wants to reinvest some of that increased revenue into new marketing technologies as well. The company now needs to integrate the point-of-sale (POS) system from the storefronts, the street team event management app, and the new marketing software into the existing system.

Ass the change requests come in, Jamal, Mary, and Vijay can easily isolate the work to small parts of the application network and divide up responsibilities. Because all of the infrastructure is already in place, Jamal builds new database entities without directly impacting the Process APIs. Vijay can also update or build new user interfaces without touching the Process APIs. And our Trailblazer Mary can even use MuleSoft for Flow: Integration as a citizen integrator to build some new integrations with clicks, while the team is busy.

Before adding your idea for an integration to your IT department’s developer backlog of IT projects, try building it with clicks instead of code with MuleSoft for Flow: Integration 

The POS system is tied to the web API. The new street team app is tied to the Mobile API. And the new marketing software, which comes with its own API, is connected to the Customer Orders API through Mary's innovative work with MuleSoft for Flow: Integration. Instead of major rework across the entire network each time, now they have a systematic way to reuse prior work and be more productive. Cloud Kicks can keep improving its business processes and customer experiences without having to own all the technology. Cloud Kicks can outsource important parts of its final solution to third parties who specialize in marketing. This would be impossible for Cloud Kicks to build on its own (especially in a reasonable amount of time).

Jamal, Mary, and Vijay are relieved that they took the time to thoughtfully formulate a plan. They have a system that grows with the business, and Cloud Kicks has the technology to power their exponential growth.

Let's Compare

Ruilding an application network with MuleSoft using an API-led connectivity approach was a much better choice for Cloud Kicks. Her’s a side-by-side comparison of these two scenarios:

Scenario 1: Tightly Coupled Integration

	

Scenario 2: API-Led Connectivity

Design for short-term needs

	

Design for future flexibility

Point-to-point integrations

	

3-layered API architecture

Scale by repetitive effort

	

Scale by reuse

Spaghetti code

	

Application network

Dive Deeper with MuleSoft Anypoint Platform

Now that you know what API-led connectivity can do to help you stay agile while you scale your systems, try out Anypoint Platform. Follow the learning path laid out in Getting Started with API Management on Anypoint Platform.
