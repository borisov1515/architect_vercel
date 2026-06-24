# Optimizing Solutions for Growth and Scale

**Module:** API Planning Framework for Architects  
**Source:** https://trailhead.salesforce.com/content/learn/modules/design-with-the-right-api/dwapi-4  
**Saved:** browser extraction (logged-in session)

---

Learning Objectives

After completing this unit, you'll be able to: 

Describe what growth means from the developer perspective.

Explain why designing a solution for scale is important.

Plan for Growth and Scale

The API you choose for your project plays a big role in how well your project scales. Development teams in the planning phase might only focus on how the tool should function at release and overlook the need to plan for growth and scale. For most businesses, growth means the number of monthly active users, frequency of return customers, or how many installs of a particular tool. However, growth means something different from the developer perspective. 

From the developer perspective, growth is about how well the system performs as resources are consumed. When planning for scale, you should also consider how well the system functions as the data volume increases. 

Test the Scale of Your Solution

As you continue to scale your design, it's a good idea to build in a high-quality testing process. You want to regularly stress-test the system and challenge the design to see how well the solution can scale for growth as your data grows. 

Consider the following questions to help you plan for growth and scale.  

What is the processing threshold for the resources you're using?

What success metrics should you use to define growth?

How is the system tested throughout the ALM process?

You might require more or different resources to create a scalable design. Think about how the added resources affect the developer experience and the overhead cost when you reach resource thresholds. You don't want to incur switching costs or spend even more time developing fix solutions down the road. The API choices you make at the beginning of your implementation should be evaluated for today's context as well as the future. 

API Limits and Allocations 

Lastly, you want to make sure you're working within the available resources. Since Salesforce architecture is multitenant, this means that orgs share a set of resources. Every Salesforce org is allotted a number of daily API requests. The total resources for each org need to include all calls into the org. The goal is to design a solution that operates within these allocated resources. Creating a scalable solution that is efficient means you have more API limits available for other projects.

Check Your Limits and Allocations

In the Platform API Basics module, you learn there are multiple ways to check the remaining Salesforce core API limits available. For example you navigate to the API Usage box on the System Overview page to see a system overview. From Setup, enter System Overview
copy in the Quick Find box, then select System Overview. Or use the /limits
copy resource in the Lightning Platform REST API. 

Another great way to get a view of your org's current available resources is through the command-line interface using Salesforce CLI. 

Enable DevHub and authorize Salesforce CLI access to your org by completing the Quick Start: Salesforce DX project.

See your org's current available resources by running the following command in your Terminal.
sf limits api display --target-org [alias or username]
copy

Thought Exercise

When designing solutions for your Salesforce org, consider how your new implementation affects other current existing integrations. Make sure the current workload and other org configurations won't be interrupted. Determine if the API will work within your design by considering the following questions.

How many other integrations are making API requests into your org?

How soon will your org reach its entitled API request limit each day?

What is your daily API request budget for your org?

How many API requests are needed to address your use cases and data volume?

Sum It Up

APIs are at the heart of connecting the applications we build to the world around us. Now that you have a solid planning framework to help guide you, you have the ability to do more with less code. Check out the Salesforce help article Which API Do I Use? for a breakdown on API allocations and strategies that will help you make the right API call. 

Resources 
Salesforce Developers Documentation: API Request Limits and Allocations
Salesforce Developers Documentation: APIs and Integration
Salesforce Developers Documentation: Install Salesforce CLI
