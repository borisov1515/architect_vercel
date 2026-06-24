# Application Network & API Connectivity Guide

**Module:** API Lifecycle Management with Anypoint Platform  
**Source:** https://trailhead.salesforce.com/content/learn/modules/mulesoft-basics/app-network  
**Saved:** browser extraction (logged-in session)

---

Learning Objectives

After completing this unit, you’ll be able to:

Explain the challenges with integration.

Explain what an application network is.

Explain how API-led connectivity is built into an application network.

Identify the best practices of implementing API-led connectivity with a multi-layered API architecture.

Why Is Integration So Challenging?

The Fourth Industrial Revolution is upon us. Connectivity across people, applications, data, and the Internet of Things (IoT) is the cornerstone. As connected consumers, we are bombarded daily with new technologies that change the way we live.

As such, we’ve grown to expect powerful systems and functions. We expect them to work together seamlessly. And we expect businesses to deliver these functionalities faster than ever.

For our organizations to lead in the new digital economy, we must become Integration Trailblazers. Integration Trailblazers are often found in the middle of an organization. They're strong supporters of API-led connectivity and know that APIs can change internal business processes and customer experiences. Often, Integration Trailblazers build their own new business processes and customer experiences with the help of citizen integration tools.

This is especially true now, given the way businesses are presented with a huge number of tools to meet their customer's expectations. Let’s look at marketing as an example. Here are some of the companies that specialize in search engine optimization (SEO).

Keep in mind that these companies are hyperspecialized. They offer services that focus solely on one domain: SEO. This is actually three levels down from marketing technology‌. First there's marketing technology, then there's content and experience, and finally you get to SEO. If we look at the top companies, we find that there are over 8,000 companies that focus on marketing technologies as of 2020. 2020.

That’s a lot of technology just for marketing! There are thousands more of these hyperspecialized offerings in Sales, Service, IoT, and so on. All these choices can create pain for established companies that have to rethink how they offer their services to customers. Here’s why.

Companies want to plug new technologies into their businesses as quickly as possible.

To get a 360-degree view of their customers and improve their experiences, new technologies must be easily integrated with existing systems.

But, to integrate quickly, developers often set up point-to-point connections. Each system is connected to every other system, using a lot of custom code.

Without an internal champion for API-led connectivity, little thought is given to the overall architecture of these integrations. Soon the next technology is brought in, more point-to-point integrations are built, and more complexity is added.

Add Unnecessary Complexity, Lose Agility

For many companies, this pattern can go on for years, maybe even decades, until there's a giant tangled mess at the core of the business. Point-to-point connections involve a lot of custom code and create tightly coupled systems. Tightly coupled systems come with dependencies, and minor changes to the integrations require complete rewrites of code. 

Over time, the system becomes harder and harder to maintain and improve. As a result, the business loses the agility it needs to respond to sudden changes in their industry and the world—everything from disruptive startups to global pandemics—and constantly changing customer expectations.

By breaking up the tangled mess of integrations, businesses can once again be agile. They can incorporate new hyperspecialized technologies and quickly make changes to existing business processes and customer experiences. This is where MuleSoft comes in.

API-Led Connectivity to the Rescue

API-led connectivity is a methodical way of connecting applications, data, and devices through APIs. When the entire organization embraces a culture of API-led connectivity, developers, citizen integrators, and system architects are empowered to deliver applications and projects that avoid tightly coupled point-to-point integrations, in favor of:

Clear contracts between systems

Reusability

Discoverability

Visibility and security

Availability and resiliency

They are building the foundation of an application network —a seamless framework of applications, data, and devices. Businesses with application networks rely on a plug-and-play repositories of internally and externally-provided assets that they can use in an agile way.

There are a lot of terms to keep track of! Here’s a handy table to help you keep some major concepts straight and top of mind.

API-led Connectivity

	

A methodical way to connect applications, data, and devices through reusable and purposeful APIs; the opposite of point-to-point integration.

Application Network

	

A network of applications, data, and devices connected by reusable APIs, each built with the principles of API-led connectivity.

Anypoint Platform

	

MuleSoft's platform that provides many tools to design, build, deploy, and operate an application network.

Integration Trailblazer

	

A person within the ranks of the company who champions the idea of API-led connectivity as an opportunity to revolutionize how business is done (and lead in the new, digital economy).

Citizen Integrators

	

Typically a line-of-business manager, Salesforce admin, or other non-technical user. Using citizen integration tools, like MuleSoft for Flow: Integration, they build secure, reliable connections to common third-party systems with clicks instead of code.

So, what does this all really mean? 

As companies start to rethink their own IT regarding API-led application networks, MuleSoft recommends building and organizing APIs into three broad categories.

System APIs

Process APIs

Experience APIs

Think of these three layers of APIs as an example architecture to implement API-led connectivity, where each layer serves a specific purpose.

System APIs handle the minutiae of connecting to systems (think databases) such that users are insulated from any changes. 

Process APIs shape data across System APIs, with the intent of modeling business needs and processes, to break down technology silos and make data more consumable. 

Experience APIs reconfigure this data so that it is most easily consumed by its intended audience through apps and devices. APIs at this level are created with reusability in mind, without a dependence on the source systems from which that data originates.

MuleSoft Anypoint Platform provides a suite of tools to create and manage these APIs that are designed to unlock data across systems. It offers tools like MuleSoft Anypoint Code Builder and MuleSoft for Flow: Integration, which integrate data across multiple systems for a unified experience.. Rather than being tightly coupled, these APIs are loosely coupled components that can be reused to connect different systems. Ford now outsources 99% of the parts that go into its cars and trucks. Think about whether it makes more sense to outsource certain internal capabilities to third-party offerings through the API economy. 

Resources
MuleSoft: Sign up for Anypoint Platform (form, free signup)
External Site: chiefmartec.com: Marketing Technology Landscape Supergraphic (2020)
Trailblazer Community: MuleSoft for Flow: Integration
