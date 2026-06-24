# Understanding Event Monitoring for Enhanced Security

**Module:** Event Monitoring  
**Source:** https://trailhead.salesforce.com/content/learn/modules/event_monitoring/event_monitoring_intro  
**Saved:** browser extraction (logged-in session)

---

Learning Objectives

After completing this unit, you’ll be able to:

Describe the event types supported by Event Monitoring.

Define event log files.

State at least three use cases for Event Monitoring.

Shield Event Monitoring is available for free in Developer Edition orgs. All other editions require you to purchase a license.

What Is Event Monitoring?

Everyone knows that being a detective is one of the coolest jobs you can have. Well, hold on to your magnifying glass because your job as a Salesforce admin is about to get a whole lot cooler. With Event Monitoring, you can be the investigator your organization always needed.

Event Monitoring is one of many tools that Salesforce provides to help keep your data secure. It lets you see the granular details of user activity in your organization. We refer to these user activities as events. You can view information about individual events or track trends in events to swiftly identify abnormal behavior and safeguard your company’s data.

So, what are some of the events that you can track? Event Monitoring provides tracking for many types of events, including:

Logins

Logouts

URI (web clicks in Salesforce Classic)

Lightning (web clicks, performance, and errors in Lightning Experience and the Salesforee mobile app)

Visualforce page loads

Application programming interface (API) calls

Apex executions

Report exports

There are at least 50 event types that can be consumed; check out the Report Event Type document in this unit’s Resources section for the full list.

All of these events are stored in event log files. An event log file is generated when an event occurs in your organization and is available to view and download after 24 hours for all customers and after every hour for Event Monitoring customers. The event types you can access and how long the files remain available depends on your Salesforce edition.

Developer Edition organizations have free access to all log types with 1-day data retention.

Enterprise, Unlimited, and Performance Edition organizations have free access to the Apex Unexpected Exception, CORS Violation Record, CSP Violation, Hostname Redirects, Login, Logout and API Total Usage event log files with 1-day data retention. For an extra cost, you can access some log file types with up to 1 year data retention.

So, how can you use event log files to become an all-knowing Salesforce super-sleuth? Let’s take login activity as an example. We talk about accessing, downloading, and visualizing event log files later on. For now, assume that we did these steps and produced this graph of login activity.

You can see that an unusually high number of logins to the organization occurred between May 4 and May 5. But how do you figure out exactly what happened during that time period? Luckily, Event Monitoring provides several ways for you to dig into this data. In this case, you might want to break down the number of logins by user.

Adam Admin logged in 103 times! Something is definitely suspicious. You can continue to break this data down to see things like how many distinct IP addresses a user logged in from. This information helps you pinpoint whether an outside party compromised a user’s account or whether a user is up to no good.

You’re probably beginning to see the power of Event Monitoring, but let’s consider some other uses.

Monitor data loss. Imagine that a sales rep leaves your company and joins a major competitor. Later, you find out that your organization is losing deal after deal to this other company. You suspect that your former employee downloaded a report containing leads and shared it with the competition. If you’d been using Event Monitoring, you could have caught this bad behavior before it cost your company sales.

Increase adoption. Event Monitoring isn’t just for catching your users’ bad behavior. It can also alert you to parts of your organization that aren’t performing well. For example, you just rolled out a new Visualforce page in your organization that combines accounts and contacts and allows end users to add custom fields. Without any metrics, it’s difficult to tell how users are interacting with this page—if at all. Event Monitoring helps you figure out which parts of your organization need increased adoption efforts and identify areas that need redevelopment.

Optimize performance. Sometimes, it’s hard to determine the cause of slow page performance in your organization. Imagine that your company has an office in San Francisco and one in London. The users in London tell you that their reports are running slowly or even timing out. You can use Event Monitoring to determine whether the cause is related to a network issue in London or with the way your app is configured.

These cases are just a few ways that you can use Event Monitoring to keep your organization secure and running smoothly. Check out all the event types to discover what else you can do.

Resources
Salesforce Developer Documentation: Report Event Type
Salesforce Developer Documentation: EventLogFile
Salesforce Help: Event Log File Browser
